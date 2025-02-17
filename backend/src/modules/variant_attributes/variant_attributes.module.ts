import { Module } from '@nestjs/common';
import { VariantAttributesService } from './variant_attributes.service';
import { VariantAttributesController } from './variant_attributes.controller';

@Module({
  controllers: [VariantAttributesController],
  providers: [VariantAttributesService],
})
export class VariantAttributesModule {}
