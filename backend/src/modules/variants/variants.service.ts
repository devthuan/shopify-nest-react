import { Injectable } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Variants } from './entities/variants.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class VariantsService extends BaseService<Variants> {
  constructor(
    @InjectRepository(Variants)
    private readonly variantRepository: Repository<Variants>
  ){
    super(variantRepository);
  }
}
