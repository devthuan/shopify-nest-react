import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CommonException } from 'src/common/exception';
import { NotFoundError } from 'rxjs';
import { Products } from '../products/entities/product.entity';
import { Accounts } from '../auth/entities/account.entity';
import { Variants } from '../variants/entities/variants.entity';

@Injectable()
export class CartsService  {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,

    
    @InjectRepository(Accounts)
    private readonly AccountsRepository: Repository<Accounts>,
    
    @InjectRepository(Variants)
    private readonly variantsRepository: Repository<Variants>,


    private readonly dataSource : DataSource
  ){
  }


  async createCart(createCartDto: CreateCartDto): Promise<{message: string}> {
    try {

      const checkAccount = await this.AccountsRepository.createQueryBuilder('accounts')
        .where('accounts.id = :id', {id: createCartDto.accountsId})
        .andWhere('accounts.deletedAt is null')
        .andWhere('accounts.isActive = :isActive', {isActive: true})
        .getOne();
      if (!checkAccount){
        throw new NotFoundException('tài khoản không tồn tại')
      }     
      const variants = await this.variantsRepository.createQueryBuilder('variants')
        .where('variants.id = :id', {id: createCartDto.variantId})
        .andWhere('variants.deletedAt is null')
        .getOne();
      if(!variants){
       throw new NotFoundException('Sản phẩm không tồn tại')
      }

      // check quantity attribute
      if(variants.stock < createCartDto.quantity){
        throw new NotFoundException('Quantity attribute not enough')
      }

      const checkCart = await this.cartRepository.createQueryBuilder('cart')
        .where('cart.deletedAt is null')
        .andWhere('cart.accountsId = :accountsId', {accountsId: checkAccount.id})
        .andWhere('cart.variants = :variants', {variants: variants.id})
        .getOne();
        
      if(checkCart){
        checkCart.quantity += createCartDto.quantity;
        await this.cartRepository.save(checkCart);
        return {
          message: 'Cart updated successfully'
        };
      } 


      const newCart =  this.cartRepository.create({
        accounts: checkAccount,
        quantity: createCartDto.quantity,
        variants: variants
      })

      await this.cartRepository.save(newCart);

      
      return {
        message: 'Cart created successfully'
      };
      
    } catch (error) {
      CommonException.handle(error);
    }
  }

  async increaseQuantity(idCart: string, accountsId: string): Promise<{message: string}> {
    try {

      const checkAccount = await this.AccountsRepository.createQueryBuilder('accounts')
        .where('accounts.id = :id', {id: accountsId})
        .andWhere('accounts.deletedAt is null')
        .andWhere('accounts.isActive = :isActive', {isActive: true})
        .getOne();
      if (!checkAccount){
        throw new NotFoundException('tài khoản không tồn tại')
      }   
      
      const checkCart = await this.cartRepository.createQueryBuilder('cart')
        .leftJoinAndSelect('cart.variants', 'variants')
        .where('cart.deletedAt is null')
        .andWhere('cart.id = :id', {id: idCart})
        .getOne();
        
      if(!checkCart){
        throw new NotFoundException('Giỏ hàng không tồn tại')
      }

      const checkVariant = await this.variantsRepository.createQueryBuilder('variants')
        .where('variants.id = :id', {id: checkCart.variants ? checkCart.variants.id : null})
        .andWhere('variants.deletedAt is null')
        .getOne();
        
      if(!checkVariant){
       throw new NotFoundException('Sản phẩm không tồn tại')
      }

      // check quantity attribute
     if(checkVariant.stock < 1){
        throw new NotFoundException('Số lượng không đủ')
      }

      checkCart.quantity += 1;
      await this.cartRepository.save(checkCart);
  
      return {
        message: 'Cập nhật số lượng giỏ hàng thành công'
      };
      
    } catch (error) {
      CommonException.handle(error);
    }
  }

  async decreaseQuantity(idCart: string, accountsId: string): Promise<{message: string}> {
    try {

      const checkAccount = await this.AccountsRepository.createQueryBuilder('accounts')
        .where('accounts.id = :id', {id: accountsId})
        .andWhere('accounts.deletedAt is null')
        .andWhere('accounts.isActive = :isActive', {isActive: true})
        .getOne();
      if (!checkAccount){
        throw new NotFoundException('tài khoản không tồn tại')
      }   
      
      const checkCart = await this.cartRepository.createQueryBuilder('cart')
        .leftJoinAndSelect('cart.variants', 'variants')
        .where('cart.deletedAt is null')
        .andWhere('cart.id = :id', {id: idCart})
        .getOne();
        
      if(!checkCart){
        throw new NotFoundException('Giỏ hàng không tồn tại') 
      }

      const checkVariant = await this.variantsRepository.createQueryBuilder('variants')
        .where('variants.id = :id', {id: checkCart.variants.id})
        .andWhere('variants.deletedAt is null')
        .getOne();

      if(!checkVariant){
       throw new NotFoundException('Sản phẩm không tồn tại')
      }

      // check quantity attribute
     if(checkCart.quantity - 1 <= 0){
        throw new NotFoundException('Quantity attribute not enough')
      }

      checkCart.quantity -= 1;
      await this.cartRepository.save(checkCart);
  
      return {
        message: 'Cập nhật số lượng giỏ hàng thành công'
      };
      
    } catch (error) {
      CommonException.handle(error);
    }
  }

  
  async updateQuantity(idCart: string, updateCartDto: UpdateCartDto): Promise<{message: string}> {
    try {

      const checkAccount = await this.AccountsRepository.createQueryBuilder('accounts')
        .where('accounts.id = :id', {id: updateCartDto.accountsId})
        .andWhere('accounts.deletedAt is null')
        .andWhere('accounts.isActive = :isActive', {isActive: true})
        .getOne();
      if (!checkAccount){
        throw new NotFoundException('tài khoản không tồn tại')
      }   
      
      const checkCart = await this.cartRepository.createQueryBuilder('cart')
        .leftJoinAndSelect('cart.variants', 'variants')
        .where('cart.deletedAt is null')
        .andWhere('cart.id = :id', {id: idCart})
        .getOne();
        
      if(!checkCart){
        throw new NotFoundException('Giỏ hàng không tồn tại') 
      }

      const checkProductAttribute = await this.variantsRepository.createQueryBuilder('variants')
        .where('variants.id = :id', {id: checkCart.variants.id})
        .andWhere('variants.deletedAt is null')
        .getOne();

      if(!checkProductAttribute){
       throw new NotFoundException('Sản phẩm không tồn tại')
      }

      // check quantity attribute
     if(checkProductAttribute.stock < updateCartDto.quantity){
        throw new NotFoundException('Số lượng không đủ')
      }

      checkCart.quantity = updateCartDto.quantity;
      await this.cartRepository.save(checkCart);
  
      return {
        message: 'Cập nhật số lượng giỏ hàng thành công'
      };
      
    } catch (error) {
      CommonException.handle(error);
    }
  }


  async findAll(
    search: string,
    page: number,
    limit: number,
    sortBy : string = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    accountId: string,
    filters: Record<string, any> = {} // Nhận filters từ controller
  ): Promise<{ message: string; total: number;  currentPage: number; totalPage: number; limit : number; data: any[]}> {
    try {
      const queryBuilder = this.cartRepository.createQueryBuilder('cart')
       .where('cart.deletedAt is null')
       .andWhere('cart.accounts.id = :accountId', {accountId: accountId})
       .leftJoinAndSelect('cart.variants', 'variants')
       .leftJoinAndSelect('variants.products', 'products')
       .leftJoinAndSelect('products.category', 'category')
       .leftJoinAndSelect('variants.variantAttributeValues', 'variantAttributeValues')
       .leftJoinAndSelect('variantAttributeValues.attributeValues', 'attributeValues')
       .leftJoinAndSelect('attributeValues.attributes', 'attributes')
       .leftJoinAndSelect('products.images', 'images')
      //  .leftJoinAndSelect('products.productDiscount', 'productDiscount');
      .select([
          'cart.id',
          'cart.quantity',
          'cart.createdAt',
          'products.id',
          'products.name',
          'products.description',
          'products.createdAt',
          'images.urlImages',
          'variants.id',
          'variants.sku',
          'variants.price',
          'variants.stock',
          'variantAttributeValues.id',
          'attributeValues.value',
          'attributes.name'
        ])
       
        if (search) {
            queryBuilder.andWhere('products.name LIKE :search', { search: `%${search}%` });
          }

        // Filter conditions
          Object.keys(filters).forEach((key) => {
            if (filters[key] !== undefined && filters[key] !== null) {
              let value = filters[key];
              
              // Chuyển đổi giá trị 'true' hoặc 'false' thành boolean
              if (value === 'true') value = true;
              if (value === 'false') value = false;

              queryBuilder.andWhere(`cart.${key} = :${key}`, { [key]: value });
            }
          });

          // count total
          const total = await queryBuilder.getCount();

         // pagination page
          const data = await queryBuilder
            .skip((page - 1) * limit) // Bỏ qua các bản ghi đã được hiển thị
            .take(limit) // Giới hạn số bản ghi trả về
            .orderBy(`cart.${sortBy}`, sortOrder) // Sắp xếp theo trường chỉ định
            .getMany(); // Lấy danh sách bản ghi

          const formattedData = data.map(cart => ({
            id: cart.id,
            quantity: cart.quantity,
            createdAt: cart.createdAt,
            name: cart.variants.products.name,
            description: cart.variants.products.description,
            images: cart.variants.products.images.map(image => image.urlImages),
            variants: {
              sku: cart.variants.sku,
              id: cart.variants.id,
              price: cart.variants.price,
              stock: cart.variants.stock,
              attributes: cart.variants.variantAttributeValues.map(vav => ({
                id: vav.id,
                attributeName: vav.attributeValues.attributes.name,
                attributeValue: vav.attributeValues.value
              }))
            },
          }))

      const totalPage = Math.ceil(total / limit);
       return {
        message: 'List of cart data',
        total,
        totalPage,
        currentPage: +page,
        limit: +limit,
        data: formattedData
       };
       } catch (error) {
      CommonException.handle(error);
       }
  }

  async removeCart(idCart: string, accountsId: string): Promise<{message: string}> {
    try {

      const checkAccount = await this.AccountsRepository.createQueryBuilder('accounts')
        .where('accounts.id = :id', {id: accountsId})
        .andWhere('accounts.deletedAt is null')
        .andWhere('accounts.isActive = :isActive', {isActive: true})
        .getOne();
      if (!checkAccount){
        throw new NotFoundException('tài khoản không tồn tại')
      }   
      
      const checkCart = await this.cartRepository.createQueryBuilder('cart')
        .leftJoinAndSelect('cart.variants', 'variants')
        .where('cart.deletedAt is null')
        .andWhere('cart.id = :id', {id: idCart})
        .getOne();
        
      if(!checkCart){
        throw new NotFoundException('Giỏ hàng không tồn tại') 
      }

      await this.cartRepository.remove(checkCart);
  
      return {
        message: 'Xoá sản phẩm khỏi giỏ hàng thành công'
      };
      
    } catch (error) {
      CommonException.handle(error);
    }
  }

   async getProductByAccountIdAndProductAttributeId(accountId: string, productAttributeId: string): Promise<Cart> {
    try {
      const result = await this.cartRepository.createQueryBuilder('cart')
        .leftJoinAndSelect('cart.variants', 'variants')
        .where('cart.accounts.id = :accountId', { accountId })
        .andWhere('variants.id = :productAttributeId', { productAttributeId })
        .andWhere('cart.deletedAt is null')
        .getOne();
        
      return result;
  

    } catch (error) {
      CommonException.handle(error)
    }
  }

 



}
