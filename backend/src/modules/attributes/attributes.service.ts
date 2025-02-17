import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Attributes } from './entities/attribute.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AttributesService extends BaseService<Attributes> {
  constructor(
    @InjectRepository(Attributes)
    private readonly attributeRepository: Repository<Attributes>
  ){
    super(attributeRepository);
  }
}
