import { PaymentsModule } from './../payments/payments.module';
import { forwardRef, Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bills } from './entities/bill.entity';
import { BillDetails } from './entities/bill-detail.entity';
import { Variants } from '../variants/entities/variants.entity';
import { Accounts } from '../auth/entities/account.entity';
import { CartsService } from '../carts/carts.service';
import { CartsModule } from '../carts/carts.module';
import { VouchersModule } from '../vouchers/vouchers.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bills, BillDetails, Variants, Accounts]),


    PaymentsModule,
    CartsModule,
    VouchersModule,
    ProductsModule
  ],

  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
