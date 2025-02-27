import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { plainToInstance } from 'class-transformer';
import { Cart } from './entities/cart.entity';
import { AuthGuardCustom } from '../auth/auth.guard';

@Controller('carts')
@UseGuards(AuthGuardCustom)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createCartDto: CreateCartDto) {
      createCartDto.accountsId = req['user'].id

  
    return this.cartsService.createCart(createCartDto);
  }
  
  @Patch('increase/:id')
  increaseQuantity(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    let accountsId = req['user'].id
    return this.cartsService.increaseQuantity(id, accountsId);
  }

  @Patch('decrease/:id')
  decreaseQuantity(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
      let accountsId = req['user'].id
    return this.cartsService.decreaseQuantity(id, accountsId);
  }


  @Get()
  findAll(
    @Req() req: Request,
    @Query('search') search: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortOrder') sortOrder: "ASC" | "DESC" = "DESC",
    @Query() query: Record<string, any>

  ) {

    const { search : _search, page: _page, limit: _limit, sortBy: _sortBy, sortOrder: _sortOrder, ...filters } = query;

    limit = limit > 100 ? 100 : limit ;
    let accountId = req['user'].id
    let data = this.cartsService.findAll(search, page, limit, sortBy, sortOrder, accountId,filters);
    return plainToInstance(Cart, data)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartsService.findOne(id);
  // }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string, 
    @Body() updateCartDto: UpdateCartDto
  ) {
    updateCartDto.accountsId = req['user'].id
    return this.cartsService.updateQuantity(id, updateCartDto);
  }
  
  @Delete(':id')
  deleteSoft(@Param('id') id: string, @Req() req: Request) {
    let accountsId = req['user'].id
    return this.cartsService.removeCart(id, accountsId);
  }
}
