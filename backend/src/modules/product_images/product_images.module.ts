import { Module } from '@nestjs/common';
import { ProductImagesService } from './product_images.service';
import { ProductImagesController } from './product_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImages } from './entities/product_image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductImages])
  ],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
})
export class ProductImagesModule {}
