import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { CategoriesModule } from '../categories/categories.module';
import { AttributesModule } from '../attributes/attributes.module';
import { AttributeValues } from '../attribute_values/entities/attribute_value.entity';
import { Attributes } from '../attributes/entities/attribute.entity';
import { VariantsModule } from '../variants/variants.module';
import { Variants } from '../variants/entities/variants.entity';
import { VariantAttributeValues } from '../variant-attribute-values/entities/variant-attribute-value.entity';
import { ProductImages } from '../product_images/entities/product_image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Attributes, AttributeValues, VariantAttributeValues, Variants, ProductImages]),
    CategoriesModule,
    AttributesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
