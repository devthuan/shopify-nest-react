import { Type } from './../../../node_modules/@nestjs/passport/dist/interfaces/type.interface.d';
import { Module } from '@nestjs/common';
import { AttributeValuesService } from './attribute_values.service';
import { AttributeValuesController } from './attribute_values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValues } from './entities/attribute_value.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttributeValues]),
  ],
  controllers: [AttributeValuesController],
  providers: [AttributeValuesService],
})
export class AttributeValuesModule {}
