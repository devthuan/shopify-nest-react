import { Module } from '@nestjs/common';
import { VariantAttributeValuesService } from './variant-attribute-values.service';
import { VariantAttributeValuesController } from './variant-attribute-values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantAttributeValues } from './entities/variant-attribute-value.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VariantAttributeValues])
  ],
  controllers: [VariantAttributeValuesController],
  providers: [VariantAttributeValuesService],
})
export class VariantAttributeValuesModule {}
