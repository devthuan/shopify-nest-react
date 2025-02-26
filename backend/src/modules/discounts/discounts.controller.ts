import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discounts } from './entities/discount.entity';
import { plainToInstance } from 'class-transformer';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    try {
      // validate startDate and endDate
      const currentDate = new Date();
      if (createDiscountDto.startDate < currentDate) {
        throw new BadRequestException('Start date must be in the future.');
      }
      if (createDiscountDto.endDate < createDiscountDto.startDate) {
        throw new BadRequestException('End date must be after start date.');
      }
  
      return this.discountsService.create(createDiscountDto);
      
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        console.error('Error occurred:', error); 
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }

  @Get()
  findAll(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query() query: Record<string, any>

  ) {

    const { search : _search, page: _page, limit: _limit, sortBy: _sortBy, sortOrder: _sortOrder, ...filters } = query;


    limit > 100 ? limit = 100 : limit;
    const responseData = this.discountsService.findAll(search, page, limit, sortBy, sortOrder, filters);
    return plainToInstance(Discounts, responseData)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const responseData = this.discountsService.findOne(id);
    return plainToInstance(Discounts, responseData)

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
    return this.discountsService.update(id, updateDiscountDto);
  }

  @Patch('recover/:id')
  recover(@Param('id') id: string){
    return this.discountsService.recover(id);
  }


  @Delete(':id')
  deleteSoft(@Param('id') id: string) {
    return this.discountsService.deleteSoft(id);
  }
}
