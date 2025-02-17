import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { plainToInstance } from 'class-transformer';
import { Attributes } from './entities/attribute.entity';

@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Post()
  create(@Body() createAttributeDto: CreateAttributeDto) {
    return this.attributesService.create(createAttributeDto);
  }

  @Get()
  findAll(
    @Query('search') search : string,
    @Query('page') page: number ,
    @Query('limit') limit: number ,
    @Query('sortBy') sortBy: string ,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
    @Query() query: Record<string, any>

  ) {
    const { page: _page, limit: _limit, sortBy: _sortBy, sortOrder: _sortOrder, ...filters } = query;

    limit > 100 ? limit = 100 : limit;
    const data = this.attributesService.findAll(search, page, limit, sortBy, sortOrder, filters);
    return plainToInstance(Attributes, data)
  }
  @Get('deleted')
  findAllDeleted(
    @Query('search') search : string,
    @Query('page') page: number ,
    @Query('limit') limit: number ,
    @Query('sortBy') sortBy: string ,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
    @Query() query: Record<string, any>

  ) {
    const { search : _search, page: _page, limit: _limit, sortBy: _sortBy, sortOrder: _sortOrder, ...filters } = query;

    limit = limit > 100 ? limit = 100 : limit;
    return this.attributesService.findAllDeleted(search, page, limit, sortBy, sortOrder, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
     const data = this.attributesService.findOne(id);
    return plainToInstance(Attributes, data)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttributeDto: UpdateAttributeDto) {
    return this.attributesService.update(id, updateAttributeDto);
  }

  @Patch('recover/:id')
  recover(@Param('id') id: string) {
    return this.attributesService.recover(id);
  }

  @Delete(':id')
  deleteSoft(@Param('id') id: string) {
    return this.attributesService.deleteSoft(id);
  }
}
