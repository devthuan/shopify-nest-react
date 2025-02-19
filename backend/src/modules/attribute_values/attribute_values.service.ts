import { Injectable } from '@nestjs/common';
import { CreateAttributeValueDto } from './dto/create-attribute_value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute_value.dto';
import { BaseService } from 'src/common/base.service';
import { AttributeValues } from './entities/attribute_value.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AttributeValuesService extends BaseService<AttributeValues> {
  constructor(
    @InjectRepository(AttributeValues)
    private readonly attributeValueRepository: Repository<AttributeValues>
  ){
    super(attributeValueRepository);
  }
  
}
