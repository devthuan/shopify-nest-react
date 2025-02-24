import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductImagesService } from './product_images.service';
import { CreateProductImageDto } from './dto/create-product_image.dto';
import { UpdateProductImageDto } from './dto/update-product_image.dto';

@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

 
}
