import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vouchers } from './entities/voucher.entity';
import { UseVouchers } from './entities/use-voucher.entity';
import { Accounts } from '../auth/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vouchers, UseVouchers, Accounts])
  ],
  controllers: [VouchersController],
  providers: [VouchersService],
  exports: [VouchersService]
})
export class VouchersModule {}
