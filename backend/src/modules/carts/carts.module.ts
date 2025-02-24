import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Products } from '../products/entities/product.entity';
import { Variants } from '../variants/entities/variants.entity';
import { Accounts } from '../auth/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Products, Variants, Accounts])],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
