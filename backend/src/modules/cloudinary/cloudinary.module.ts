import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryConfig } from './cloudinary.config';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryConfig],
  exports: [CloudinaryConfig, CloudinaryService]

})
export class CloudinaryModule {}
