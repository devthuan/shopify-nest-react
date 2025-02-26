import { PartialType } from '@nestjs/mapped-types';
import { CreateBillDto } from './create-bill.dto';
import { IsIn } from 'class-validator';

export class UpdateBillDto extends PartialType(CreateBillDto) {}


export class UpdateStatusDto {
    @IsIn(['pending', 'delivery', 'success', 'failed', 'cancelled'],{message: 'chỉ chấp nhận những giá trị pending, delivery, success, failed, cancelled'})
    status: string ;
}