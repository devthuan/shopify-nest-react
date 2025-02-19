import { Injectable } from '@nestjs/common';
import { CreateVariantAttributeValueDto } from './dto/create-variant-attribute-value.dto';
import { UpdateVariantAttributeValueDto } from './dto/update-variant-attribute-value.dto';
import { BaseService } from 'src/common/base.service';
import { VariantAttributeValues } from './entities/variant-attribute-value.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VariantAttributeValuesService extends BaseService<VariantAttributeValues> {
 constructor(
  @InjectRepository(VariantAttributeValues)
  private readonly variantAttributeValuesRepository: Repository<VariantAttributeValues>
 ){
  super(variantAttributeValuesRepository)
 }
}
