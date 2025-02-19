import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttributeValuesService } from './attribute_values.service';
import { CreateAttributeValueDto } from './dto/create-attribute_value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute_value.dto';

@Controller('attribute-values')
export class AttributeValuesController {
  constructor(private readonly attributeValuesService: AttributeValuesService) {}

  
}
