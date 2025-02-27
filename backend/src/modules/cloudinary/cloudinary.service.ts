import { Injectable } from '@nestjs/common';
import { CreateCloudinaryDto } from './dto/create-cloudinary.dto';
import { UpdateCloudinaryDto } from './dto/update-cloudinary.dto';
import { CloudinaryConfig } from './cloudinary.config';

@Injectable()
export class CloudinaryService {
    constructor(private cloudinaryConfig: CloudinaryConfig) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      this.cloudinaryConfig.getInstance().uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      ).end(file.buffer);
    });
  }

  async deleteImage(publicId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.cloudinaryConfig.getInstance().uploader.destroy(publicId, (error, result) => {
        if (error) reject(error);
        else resolve(result.result === 'ok');
      });
    });
  }
}
