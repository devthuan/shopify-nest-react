import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseService } from 'src/common/base.service';
import { Products } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService extends BaseService<Products> {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>
  ){
    super(productRepository);
  }


 

}
