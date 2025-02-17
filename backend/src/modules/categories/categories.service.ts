import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Categories } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class CategoriesService extends BaseService<Categories> {
  constructor(
    @InjectRepository(Categories)
    private readonly categoryRepository: Repository<Categories>
  ){
    super(categoryRepository);
  }
}
