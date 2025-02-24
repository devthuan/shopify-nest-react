import { Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product_image.dto';
import { UpdateProductImageDto } from './dto/update-product_image.dto';
import { BaseService } from 'src/common/base.service';
import { ProductImages } from './entities/product_image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductImagesService extends BaseService<ProductImages> {
  constructor(
    @InjectRepository(ProductImages)
    private readonly productImagesRespository : Repository<ProductImages>
  ){
    super(productImagesRespository)

  }
}
