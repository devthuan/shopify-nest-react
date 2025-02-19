import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsController } from './variants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variants } from './entities/variants.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Variants]),
  ],
  controllers: [VariantsController],
  providers: [VariantsService],
  exports: [VariantsService]
})
export class VariantsModule {}
