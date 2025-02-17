import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class CommonException {
  static handle(error: Error): void {
    console.log(error)
    if (error instanceof NotFoundException) {
      throw new NotFoundException('Tài nguyên không tồn tại.');
    } else if (error instanceof BadRequestException) {
        if(error.message) {
          throw new BadRequestException(error.message);
        }
        throw new BadRequestException('Yêu cầu không hợp lệ.');
    } else if (error instanceof ConflictException) {
       if(error.message) {
          throw new ConflictException(error.message);
        }
      throw new ConflictException('Dữ liệu đã tồn tại.');
    } else if (error instanceof UnauthorizedException) {
      throw new UnauthorizedException('Bạn không có quyền truy cập.');
    } else if (error instanceof ForbiddenException) {
      throw new ForbiddenException('Truy cập bị từ chối.');
    } else if (error instanceof ValidationError) {
      // Xử lý lỗi validation từ class-validator
      const validationErrors = this.formatValidationError(error);
      throw new BadRequestException(validationErrors);
    } else {
      console.error('Lỗi xảy ra:', error); // Ghi log lỗi cụ thể
      throw new InternalServerErrorException('Đã xảy ra lỗi không mong muốn.');
    }
  }

  /**
   * Hàm định dạng lỗi validation từ class-validator
   * @param error - Lỗi validation
   * @returns Thông báo lỗi dạng đối tượng
   */
  private static formatValidationError(error: ValidationError): { [key: string]: string } {
    const errors: { [key: string]: string } = {};
    if (error.constraints) {
      Object.keys(error.constraints).forEach((key) => {
        errors[key] = error.constraints[key];
      });
    }
    return errors;
  }
}