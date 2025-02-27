import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from './entities/review.entity';
import { Accounts } from '../auth/entities/account.entity';
import { Products } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reviews, Accounts, Products]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
