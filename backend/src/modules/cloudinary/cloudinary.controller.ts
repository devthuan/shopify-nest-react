import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, BadRequestException } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CreateCloudinaryDto } from './dto/create-cloudinary.dto';
import { UpdateCloudinaryDto } from './dto/update-cloudinary.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.cloudinaryService.uploadImage(file);
    return { url: imageUrl };
  }

  @Post('many')
  @UseInterceptors(FilesInterceptor('files', 30)) // Cho phép upload tối đa 10 file
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Không có tệp nào được tải lên');
    }

    // Upload từng file lên Cloudinary
    const uploadPromises = files.map(file => this.cloudinaryService.uploadImage(file));
    const imageUrls = await Promise.all(uploadPromises);

    return { urls: imageUrls };
  }
}
