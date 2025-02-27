import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto, UpdateStatusDto } from './dto/update-bill.dto';
import { Bills } from './entities/bill.entity';
import { plainToInstance } from 'class-transformer';
import { AuthGuardCustom } from '../auth/auth.guard';

@Controller('bills')
@UseGuards(AuthGuardCustom)
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  create(
    @Req() request: Request,
    @Body() createBillDto: CreateBillDto
  ) {
    createBillDto.accountId = request['user'].id; 

    return this.billsService.create(createBillDto);
  }

  @Get()
  findAll(
    @Query('search') search : string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query() query: Record<string, any>

  ) {
    const {search : _search, page: _page, limit: _limit, sortBy: _sortBy, sortOrder: _sortOrder, ...filters } = query;
    limit = limit > 100 ? limit = 100 : limit;
    let data = this.billsService.findAll(search, page, limit, sortBy, sortOrder, filters);
    return plainToInstance(Bills, data)
  }
  
  @Get('account')
  findAllByAccount(
    @Req() request: Request,
    @Query('search') search : string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query() query: Record<string, any>
  ) {
    const { search : _search, page: _page, limit: _limit, sortBy: _sortBy, sortOrder: _sortOrder, ...filters } = query;
    limit = limit > 100 ? limit = 100 : limit;
    let accountId = request['user'].id;  // get accountId from token
    let data = this.billsService.getBillByAccount(accountId,search, page, limit, sortBy, sortOrder, filters);
    return plainToInstance(Bills, data)
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    let data = this.billsService.findOne(id);
    return plainToInstance(Bills, data)
    
  }

  @Patch('update-status/:id')
  update(@Param('id') id: string,@Body() updateStatusDto :UpdateStatusDto ) {
    return this.billsService.updateStatus(id, updateStatusDto.status);
  }
  
}
