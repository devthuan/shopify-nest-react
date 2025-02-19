import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VariantAttributeValuesService } from './variant-attribute-values.service';
import { CreateVariantAttributeValueDto } from './dto/create-variant-attribute-value.dto';
import { UpdateVariantAttributeValueDto } from './dto/update-variant-attribute-value.dto';

@Controller('variant-attribute-values')
export class VariantAttributeValuesController {
  constructor(private readonly variantAttributeValuesService: VariantAttributeValuesService) {}

  
}
