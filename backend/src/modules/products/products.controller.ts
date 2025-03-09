import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto)
  }

  @Get('')
  getAllProduct(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query() query: Record<string, any> // Lấy tất cả query params còn lại
  ) {
    const {search : _search, page: _page, limit: _limit, sortBy: _sortBy, sortOrder: _sortOrder, ...filters } = query;
    limit = limit > 100 ? 100 : limit;

    return this.productsService.getAllProduct(search, page, limit, sortBy, sortOrder, filters);
    
  }
  
  @Get(':id')
  getProductById(@Param('id') id : string) {
    return this.productsService.getProductById(id)
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto){
    return this.productsService.updateProduct(id,updateProductDto)
  }

  @Patch('recover/:id')
  recover(@Param('id') id: string) {
    console.log(id)
    return this.productsService.recover(id);
  }

  @Delete(':id')
  deleteSoft(@Param('id') id: string) {
    return this.productsService.deleteSoft(id);
  }
  
}
