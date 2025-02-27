import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { CommonException } from 'src/common/exception';
import { BaseService } from 'src/common/base.service';
import { Discounts } from './entities/discount.entity';
import { Products } from '../products/entities/product.entity';


@Injectable()
export class DiscountsService extends BaseService<Discounts> {

  constructor(
    @InjectRepository(Discounts)
    private readonly discountRepository: Repository<Discounts>,

    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ){
    super(discountRepository)
  }

  async create(createDiscountDto : CreateDiscountDto): Promise<any> {
    try {
      const findProduct = await this.productRepository.createQueryBuilder('products')
      .where('products.id = :id', {id : createDiscountDto.productsId})
      .andWhere('products.deletedAt IS NULL')
      .getOne();

    if(!findProduct){
      throw new NotFoundException('Product not found')
    }

    const entity = await super.create(createDiscountDto)
    entity.products = findProduct;

    return await this.discountRepository.save(entity)
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

  ): Promise<{ total: number;  totalPage: number; currentPage: number; limit : number; data: Discounts[]}>{
   try {
        const queryBuilder = this.discountRepository.createQueryBuilder('productDiscount')
          .leftJoinAndSelect('productDiscount.products', 'products')
          .where('productDiscount.deletedAt IS NULL')
          .andWhere('products.deletedAt IS NULL')

          if (search) {
            queryBuilder.andWhere('productDiscount.name LIKE :search', { search: `%${search}%` });
          }
          // Filter conditions
            Object.keys(filters).forEach((key) => {
              if (filters[key] !== undefined && filters[key] !== null) {
                let value = filters[key];
                
                // Chuyển đổi giá trị 'true' hoặc 'false' thành boolean
                if (value === 'true') value = true;
                if (value === 'false') value = false;

                queryBuilder.andWhere(`productDiscount.${key} = :${key}`, { [key]: value });
              }
            });

          // count total
          const total = await queryBuilder.getCount();

         // pagination page
          const data = await queryBuilder
            .skip((page - 1) * limit) // Bỏ qua các bản ghi đã được hiển thị
            .take(limit) // Giới hạn số bản ghi trả về
            .orderBy(`productDiscount.${sortBy}`, sortOrder) // Sắp xếp theo trường chỉ định
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

  async findOne(id: string): Promise<Discounts> {
      try {
        const data = await this.discountRepository.createQueryBuilder('productDiscount')
        .leftJoinAndSelect('productDiscount.products', 'products')
        .where('productDiscount.id = :id', { id }) 
        .andWhere('productDiscount.deletedAt IS NULL') 
        .andWhere('products.deletedAt IS NULL') 
        .getOne();

      if (!data) {
        throw new NotFoundException('Data not found');
      }

      return data;
        
      } catch (error) {
          CommonException.handle(error)
      }
  }
  
}
