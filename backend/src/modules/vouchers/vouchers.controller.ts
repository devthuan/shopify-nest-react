import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { plainToInstance } from 'class-transformer';
import { Vouchers } from './entities/voucher.entity';
import { UseVoucherDto } from './dto/use-voucher-dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardCustom } from '../auth/auth.guard';

@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.vouchersService.create(createVoucherDto);
  }

  
  @Get()
  findAll(
    @Query('search') search : string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query() query: Record<string, any>

  ) {
    const {search : _search, page: _page, limit: _limit, sortBy: _sortBy, sortOrder: _sortOrder, ...filters } = query;
    limit = limit > 100 ? 100 : limit;
    let data=  this.vouchersService.findAll(search, page, limit, sortBy, sortOrder, filters);
    return plainToInstance(Vouchers, data)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    let data = this.vouchersService.findOne(id);
    return plainToInstance(Vouchers, data)
  }

  @Get('code/:code')
  findOneByCode(@Param('code') code: string) {
    console.log(code)
    let data = this.vouchersService.findOneByCode(code);
    return plainToInstance(Vouchers, data)
  }

  @UseGuards(AuthGuardCustom)
  @Get('check/:code')
  checkUseVouchers(@Param('code') voucherCode: string,
    @Req() req: Request,) {
    let  accountId = req['user'].id
    let data = this.vouchersService.checkUseVouchers(voucherCode, accountId);
    return plainToInstance(Vouchers, data)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
    return this.vouchersService.update(id, updateVoucherDto);
  }


  @Patch('use-voucher/:id')
  useVoucher(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    let useVoucherDto = new UseVoucherDto()
      useVoucherDto.accountId = req['user'].id
      useVoucherDto.voucherId = id
    return this.vouchersService.usingVouchers(useVoucherDto);
  }

  @Patch('recover/:id')
  recover(@Param('id') id: string) {
    return this.vouchersService.recover(id);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.vouchersService.deleteSoft(id);
  }
  
}
