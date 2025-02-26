import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bills } from './entities/bill.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { BillDetails } from './entities/bill-detail.entity';
import { CommonException } from 'src/common/exception';

import { Variants } from '../variants/entities/variants.entity';
import { BaseService } from 'src/common/base.service';
import { Accounts } from '../auth/entities/account.entity';
import { VouchersService } from '../vouchers/vouchers.service';
import { ProductsService } from '../products/products.service';
import { PaymentsService } from '../payments/payments.service';
import { CartsService } from '../carts/carts.service';

@Injectable()
export class BillsService extends BaseService<Bills> {
  constructor(
    @InjectRepository(Bills)
    private readonly billsRepository: Repository<Bills>,
    @InjectRepository(BillDetails)
    private readonly billDetailsRepository: Repository<BillDetails>,
    @InjectRepository(Variants)
    private readonly variantsRepository: Repository<Variants>,
    @InjectRepository(Accounts)
    private readonly accountsRepository: Repository<Accounts>,

    
    // @Inject(forwardRef(() =>ProductsService))
    private  productService: ProductsService,
    private readonly voucherService: VouchersService,
    private readonly paymentService: PaymentsService,
    private readonly cartService: CartsService,
    
    private readonly dataSource: DataSource
  ){
    super(billsRepository)
  }


  async create(createBillDto: CreateBillDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let feeShip = 0;
      if (createBillDto.shippingMethod === "Chuyển phát thường") {
        feeShip = 15000;
      } else if (createBillDto.shippingMethod === "Chuyển phát nhanh") {
        feeShip = 50000;
      } else if (createBillDto.shippingMethod === "Chuyển phát hoả tốc") {
        feeShip = 130000;
      }

      // check accounts
      const account = await this.accountsRepository.createQueryBuilder('accounts')
        .where('accounts.id = :accountId', { accountId: createBillDto.accountId })
        .andWhere('accounts.deletedAt IS NULL')
        .andWhere('accounts.isActive = :isActive', { isActive: true })
        .getOne();
      if (!account) {
        throw new BadRequestException('Account not found or is locked');
      }

      // check payment
      const payment = await this.paymentService.findOne(createBillDto.paymentMethod);
      if (!payment) {
        throw new BadRequestException('Payment method not found');
      }

      // check existing product
      const products = await Promise.all(
        createBillDto.products.map(async (product) => {
          const existingProduct = await this.productService.checkExistingProductAttribute(product.productVariantId);

          // check stock
          if (product.quantity > existingProduct.stock) {
            throw new BadRequestException(`Not enough stock for product`);
          }
          return existingProduct;
        })
      );

      // check voucher
      let voucher = null;
      if (createBillDto.voucher) {
        voucher = await this.voucherService.useVouchers(createBillDto.voucher, createBillDto.accountId);
      }

      // calculate total price and discount
      let totalPriceOriginal = 0;
      let totalPrice = 0;
      let discount = 0;
      let totalDiscountProduct = 0;
      for (const product of products) {
        const productData = createBillDto.products.find(p => p.productVariantId === product.id);
        const productDiscount = product.products.discounts[0]?.id;
        totalPriceOriginal += product.price * productData.quantity;
        if (productDiscount) {
          discount = product.products.discounts[0].value;
          totalPrice += product.price * productData.quantity * (1 - discount / 100);
          totalDiscountProduct += product.price * productData.quantity * discount / 100;
        } else {
          totalPrice += product.price * productData.quantity;
        }

        // Update stock in transaction
        product.stock -= productData.quantity;
        await queryRunner.manager.save(product);
      }
      const voucherValue = voucher ? voucher.value : 0;
      const finalTotalPrice = totalPrice - voucherValue;

      // create new bill
      const newBill = this.billsRepository.create({
        status: 'pending',
        total: totalPriceOriginal + feeShip,
        totalDiscount: totalDiscountProduct + (voucherValue ? voucherValue : 0),
        totalPayment: finalTotalPrice + feeShip > 0 ? finalTotalPrice + feeShip : 0,
        vouchers: voucher ? voucher : null,
        fullName: createBillDto.fullName,
        deliverAddress: createBillDto.deliverAddress,
        deliverPhone: createBillDto.deliverPhone,
        shippingMethod: createBillDto.shippingMethod,
        note: createBillDto.note,
        accounts: account,
        payments: payment,
      });
      await queryRunner.manager.save(newBill);

      // create new bill details
      for (let product of products) {
        const newBillDetail = this.billDetailsRepository.create({
          quantity: createBillDto.products.find(item => item.productVariantId === product.id).quantity,
          price: product.price,
          discount: product.price * (discount) / 100,
          bills: newBill,
          variants: product
        });
        await queryRunner.manager.save(newBillDetail);

        // update cart
        let findProductAttribute = createBillDto.products.find(item => item.productVariantId === product.id);
        const cart = await this.cartService.getProductByAccountIdAndProductAttributeId(createBillDto.accountId, findProductAttribute.productVariantId);
        if (cart) {
          await queryRunner.manager.remove(cart);
        }
      }

      await queryRunner.commitTransaction();
      return newBill;

    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      CommonException.handle(error);
    } finally {
      await queryRunner.release();
    }
  }

  async getBillByAccount(
    accountId: string,
    search: string,
    page : number = 1,
    limit : number = 10,
    sortBy : string = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    filters: Record<string, any> = {} // Nhận filters từ controller

    ): Promise<{ message: string; total: number;  currentPage: number; totalPage: number; limit : number; data: Bills[]}>
    {

      try {
        const bills =  this.billsRepository.createQueryBuilder('bills')
        .where('bills.accountsId = :accountsId', {accountsId: accountId })
        .andWhere('bills.deletedAt IS NULL');

         if (search) {
            bills.andWhere('bills.fullName LIKE :search', { search: `%${search}%` });
          }

        // Filter conditions
          Object.keys(filters).forEach((key) => {
            if (filters[key] !== undefined && filters[key] !== null) {
              let value = filters[key];
              
              // Chuyển đổi giá trị 'true' hoặc 'false' thành boolean
              if (value === 'true') value = true;
              if (value === 'false') value = false;

              bills.andWhere(`bills.${key} = :${key}`, { [key]: value });
            }
          });
        

        // count total
      const total = await bills.getCount();

      // pagination page
      const data = await bills
        .skip((page - 1) * limit) // Bỏ qua các bản ghi đã được hiển thị
        .take(limit) // Giới hạn số bản ghi trả về
        .orderBy(`bills.${sortBy}`, sortOrder) // Sắp xếp theo trường chỉ định
        .getMany(); // Lấy danh sách bản ghi


      const totalPage = Math.ceil(total / limit);

        

        return {
          message: 'Get bill by account successfully',
          total,
          currentPage: page,
          totalPage,
          limit,
          data: data
        }
      } catch (error) {
        CommonException.handle(error)
      }
  }

  async findOne(id: string): Promise<Bills> {
      try {
        const bill = await this.billsRepository.createQueryBuilder('bills')
        .where('bills.id = :id', { id })
        .andWhere('bills.deletedAt IS NULL')
        .leftJoinAndSelect('bills.payments', 'payments')
        .leftJoinAndSelect('bills.vouchers', 'vouchers')
        .leftJoinAndSelect('bills.account', 'account')
        .leftJoinAndSelect('bills.billDetails', 'billDetails')
        .leftJoinAndSelect('billDetails.productAttributes', 'productAttributes')
        .leftJoinAndSelect('productAttributes.products', 'products')
        .leftJoinAndSelect('productAttributes.attributes', 'attributes')
        .leftJoinAndSelect('products.discounts', 'discounts')
        .getOne();
        if(!bill){
          throw new BadRequestException('Bill not found')
        }
        return bill;
        
      } catch (error) {
        CommonException.handle(error)
      }
  }

  async findAll(
      search: string,
      page : number = 1,
      limit : number = 10,
      sortBy : string = 'createdAt',
      sortOrder: 'ASC' | 'DESC' = 'ASC',
      filters: Record<string, any> = {} // Nhận filters từ controller
    ): Promise<{ total: number;  currentPage: number; totalPage: number; limit : number; data: Bills[]}>
    { 
    try {
        const queryBuilder = this.billsRepository.createQueryBuilder('bills')
    
          .where('bills.deletedAt IS NULL')

          if (search) {
            queryBuilder.andWhere('bills.fullName LIKE :search or bills.deliverPhone LIKE :search', { search: `%${search}%` });
          }

           // Filter conditions
            Object.keys(filters).forEach((key) => {
              if (filters[key] !== undefined && filters[key] !== null) {
                let value = filters[key];
                
                // Chuyển đổi giá trị 'true' hoặc 'false' thành boolean
                if (value === 'true') value = true;
                if (value === 'false') value = false;

                queryBuilder.andWhere(`bills.${key} = :${key}`, { [key]: value });
              }
            });

          // count total
          const total = await queryBuilder.getCount();

         // pagination page
          const data = await queryBuilder
            .skip((page - 1) * limit) // Bỏ qua các bản ghi đã được hiển thị
            .take(limit) // Giới hạn số bản ghi trả về
            .orderBy(`bills.${sortBy}`, sortOrder) // Sắp xếp theo trường chỉ định
            .getMany(); // Lấy danh sách bản ghi


      const totalPage = Math.ceil(total / limit);

      return {
        total,
        totalPage,
        currentPage: +page,
        limit: +limit,
        data
      }
    } catch (error) {
      CommonException.handle(error)
    }
  }

  async updateStatus(billId: string, status: string): Promise<{ message: string }> {
  const queryRunner = this.dataSource.createQueryRunner();
  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const bill = await this.billsRepository.createQueryBuilder('bills')
      .leftJoinAndSelect('bills.billDetails', 'billDetails')
      .leftJoinAndSelect('billDetails.variants', 'variants')
      .where('bills.id = :id', { id: billId })
      .andWhere('bills.deletedAt IS NULL')
      .getOne();

    if (!bill) {
      throw new BadRequestException('Bill not found');
    }

    // Không cho phép cập nhật nếu đã thanh toán, hủy hoặc thất bại
    if (['success', 'cancelled', 'failed'].includes(bill.status)) {
      throw new BadRequestException(`Hoá đơn đã được ${bill.status}`);
    }

    // Kiểm tra trạng thái hợp lệ
    if (bill.status === 'pending' && status === 'delivery') {
      bill.status = status;
    } 
    else if (bill.status === 'delivery' && status === 'success' ) {
      bill.status = status;
    } 
    else if (bill.status === 'delivery' && status === 'failed' ) {
      bill.status = status;
      await this.restoreStock(bill, queryRunner); // Khôi phục số lượng hàng tồn nếu hủy
    } 
    else if ((bill.status === 'pending' || bill.status === 'delivery') && status === 'cancelled') {
      bill.status = status;
      await this.restoreStock(bill, queryRunner); // Khôi phục số lượng hàng tồn nếu hủy
    } else {
      throw new BadRequestException('Chuyển đổi trạng thái không hợp lệ');
    }

    bill.updatedAt = new Date();
    await queryRunner.manager.save(bill);
    await queryRunner.commitTransaction();

    return { message: 'Cập nhật trạng thái đơn hàng thành công.' };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    CommonException.handle(error);
  } finally {
    await queryRunner.release();
  }
}


  async checkBillPendingByProduct(productAttributeId: string): Promise<boolean> {
    try {
      const bill = await this.billsRepository.createQueryBuilder('bills')
       .where('bills.status = :status or bills.status = :status2', { status: 'pending', status2: 'delivery' })
       .andWhere('bills.deletedAt IS NULL')
       .innerJoinAndSelect('bills.billDetails', 'billDetails')
       .innerJoinAndSelect('billDetails.variants', 'variants')
       .where('variants.id = :id', { id: productAttributeId })
       .getMany();
      if(bill.length > 0) {
        return true;
      }else {
        return false;
      }
    } catch (error) {
      CommonException.handle(error)
    }
  }

 

  private async restoreStock(bill: Bills, queryRunner: QueryRunner) {
    for (let detail of bill.billDetails) {
      const productAttribute = await this.productService.checkExistingProductAttributeNotQuantity(detail.variants.id);
      if (productAttribute) {
        productAttribute.stock += detail.quantity;
        await queryRunner.manager.save(productAttribute);
      }
    }
  }

  
}
