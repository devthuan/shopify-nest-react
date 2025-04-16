import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { plainToInstance } from 'class-transformer';
import { Accounts } from '../auth/entities/account.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

   @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    const data = this.accountsService.createAccountNoVerifyOTP(createAccountDto);
    return plainToInstance(Accounts, data)
  }

  // @UseGuards(PermissionsGuard)
  @Get()
  getAllAccount(
    @Query('search') search: string,  // add search query parameter here`
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',  // add sort query parameters here`
    @Query() query: Record<string, any> // Lấy tất cả query params còn lại
  ) {
     const {search : _search, page: _page, limit: _limit, sortBy: _sortBy, sortOrder: _sortOrder, ...filters } = query;
    const data =  this.accountsService.findAll(search, page, limit, sortBy, sortOrder, filters);
    return plainToInstance(Accounts, data)
  }

  // @UseGuards(PermissionsGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);

  }
  
  // @UseGuards(PermissionsGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    updateAccountDto.id = id;
    return this.accountsService.updateAccount( updateAccountDto);
  }
  // @UseGuards(PermissionsGuard)
  @Patch('lock/:id')
  lockAccount(@Param('id') id: string) {
    return this.accountsService.lockAccount( id);
  }
  
  // @UseGuards(PermissionsGuard)
  @Patch('reset-password/:id')
  resetPassword(@Param('id') id: string) {
    return this.accountsService.resetPassword(id);
  }
  
}
