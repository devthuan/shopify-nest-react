import { v2 as cloudinary } from 'cloudinary';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryConfig {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  getInstance() {
    return cloudinary;
  }
}
