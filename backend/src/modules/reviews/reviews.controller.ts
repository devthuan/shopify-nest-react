import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { plainToInstance } from 'class-transformer';
import { AuthGuardCustom } from '../auth/auth.guard';
import { Reviews } from './entities/review.entity';

@Controller('reviews')
@UseGuards(AuthGuardCustom)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Post()
  create(@Req() req, @Body() createReviewDto: CreateReviewDto) {
    createReviewDto.accountId = req.user.id
    const data = this.reviewsService.create(createReviewDto);
    return plainToInstance(Reviews, data)
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
    const {search : _search, page: _page, limit: _limit, sortBy: _sortBy, sortOrder: _sortOrder, ...filters } = query;
    limit = limit > 100 ? 100 : limit;
    const data = this.reviewsService.findAll(search, page, limit, sortBy, sortOrder, filters);
    return plainToInstance(Reviews, data)
  }
  @Get('by-product/:id')
  findAllByProduct(
    @Param('id') productId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    limit > 100 ? limit = 100 : limit;
    const data = this.reviewsService.findAllByProduct(productId, page, limit, sortBy, sortOrder);
    return plainToInstance(Reviews, data)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Patch('recover/:id')
  restore(@Param('id') id: string) {
    return this.reviewsService.recover(id);
  }

  @Delete(':id')
  deleteSoft(@Param('id') id: string) {
    return this.reviewsService.deleteSoft(id);
  }
}
