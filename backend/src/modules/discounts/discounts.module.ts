import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discounts } from './entities/discount.entity';
import { Products } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Discounts, Products]),
  ],
  controllers: [DiscountsController],
  providers: [DiscountsService],
})
export class DiscountsModule {}
