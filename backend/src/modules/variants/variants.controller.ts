import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Controller('variants')
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

 
}
