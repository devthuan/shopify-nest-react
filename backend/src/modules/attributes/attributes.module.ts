import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attributes } from './entities/attribute.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attributes]),
  ],
  controllers: [AttributesController],
  providers: [AttributesService],
  exports: [AttributesService]
})
export class AttributesModule {}
