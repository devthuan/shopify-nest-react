import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { BaseService } from 'src/common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Accounts } from '../auth/entities/account.entity';
import { CommonException } from 'src/common/exception';
import { UseVoucherDto } from './dto/use-voucher-dto';
import { UseVouchers } from './entities/use-voucher.entity';
import { Vouchers } from './entities/voucher.entity';

@Injectable()
export class VouchersService extends BaseService<Vouchers> {
  constructor(
    @InjectRepository(Vouchers)
    private readonly vouchersRepository: Repository<Vouchers>, 

    @InjectRepository(UseVouchers)
    private readonly useVouchersRepository: Repository<UseVouchers>, 
    @InjectRepository(Accounts)
    private readonly accountsRepository: Repository<Accounts>, 

    private readonly dataSource : DataSource
  ) {
    super(vouchersRepository)
  }

  async usingVouchers(useVoucherDto: UseVoucherDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner()
    try {
      await queryRunner.connect()
      await queryRunner.startTransaction()

      // check using voucher
      const useVoucher = await this.useVouchersRepository.createQueryBuilder('useVouchers')
      .where('useVouchers.accountsId = :accountsId AND useVouchers.vouchersId = :voucherId', { accountsId: useVoucherDto.accountId, voucherId: useVoucherDto.voucherId })
      .getOne();
      
      if (useVoucher) {
        throw new BadRequestException('Voucher đã được sử dụng ')
      }


      // check account
      const account = await this.accountsRepository.createQueryBuilder('accounts')
      .where('accounts.id = :id', { id: useVoucherDto.accountId })
      .andWhere('accounts.deletedAt IS NULL')
      .andWhere('accounts.isActive = :isActive', { isActive: true})
      .getOne();

      if (!account) {
        throw new BadRequestException('Tài khoản không tồn tại hoặc đã sử dụng ')
      }

      // check voucher
      const voucher = await this.vouchersRepository.createQueryBuilder('vouchers')
      .where('vouchers.id = :voucherId', { voucherId: useVoucherDto.voucherId })
      .andWhere('vouchers.deletedAt IS NULL')
      .andWhere('vouchers.startDate <= :startDate ', { startDate: new Date()})
      .andWhere(' vouchers.endDate >= :endDate', {  endDate: new Date() })
      .andWhere('vouchers.quantity > 0')
      .getOne();

      
      if (!voucher) { 
        throw new BadRequestException('Voucher không tồn tại hoặc đã hết hạn')
      }
    
    
      let newUseVoucher =  this.useVouchersRepository.create({
        usingDate: new Date(),
        accounts: account,
        vouchers: voucher
      })
      
      await this.useVouchersRepository.save(newUseVoucher);

      voucher.quantity--;
      await this.vouchersRepository.save(voucher);
      
      return {
        message: 'Sử dụng voucher thành công.'
      };

    } catch (error) {
      CommonException.handle(error)
    }
  }

  async findOneByCode(code: string): Promise<Vouchers> {
    try {
       const entityName = this.vouchersRepository.target instanceof Function 
        ? this.vouchersRepository.target.name 
        : this.vouchersRepository.target;
  
        const data = await this.vouchersRepository.createQueryBuilder('vouchers')
          .where('vouchers.code = :code', { code }) // Kiểm tra ID
          .andWhere('vouchers.deletedAt IS NULL') // Kiểm tra deletedAt là null
          .getOne();
  
        if (!data) {
          throw new NotFoundException(`${entityName} không tồn tại`);
        }
  
        return data;
      } catch (error) {
        CommonException.handle(error)
      }
    }

  async useVouchers(voucherCode : string, accountId: string): Promise<Vouchers> {
    const queryRunner = this.dataSource.createQueryRunner()
    try {
      await queryRunner.connect()
      await queryRunner.startTransaction()

      // check using voucher
      const useVoucher = await this.vouchersRepository.createQueryBuilder('vouchers')
        .leftJoinAndSelect('vouchers.useVouchers', 'useVouchers')
        .where('useVouchers.accountsId = :accountsId ', { accountsId: accountId})
        .andWhere('vouchers.code = :voucherCode', { voucherCode: voucherCode})
        .getOne();
      
      if (useVoucher) {
        throw new BadRequestException('Voucher đã được sử dụng')
      }

      // check account
      const account = await this.accountsRepository.createQueryBuilder('accounts')
      .where('accounts.id = :id', { id: accountId })
      .andWhere('accounts.deletedAt IS NULL')
      .andWhere('accounts.isActive = :isActive', { isActive: true})
      .getOne();

      if (!account) {
        throw new BadRequestException('tài khoản không tồn tại hoặc đã bị khoá')
      }

      // check voucher
      const voucher = await this.vouchersRepository.createQueryBuilder('vouchers')
      .where('vouchers.code = :code', { code: voucherCode })
      .andWhere('vouchers.deletedAt IS NULL')
      .andWhere('vouchers.startDate <= :startDate ', { startDate: new Date()})
      .andWhere(' vouchers.endDate >= :endDate', {  endDate: new Date() })
      .andWhere('vouchers.quantity > 0')
      .getOne();

      
      if (!voucher) { 
        throw new BadRequestException('Voucher không tồn tại hoặc đã hết hạn')
      }
    
    
      let newUseVoucher =  this.useVouchersRepository.create({
        usingDate: new Date(),
        accounts: account,
        vouchers: voucher
      })
      
      await this.useVouchersRepository.save(newUseVoucher);

      voucher.quantity--;
      await this.vouchersRepository.save(voucher);
      
      return voucher

    } catch (error) {
      CommonException.handle(error)
    }
  }
  
  async checkUseVouchers(voucherCode : string, accountId: string): Promise<Vouchers> {
    try {
     
      // check using voucher
      const useVoucher = await this.vouchersRepository.createQueryBuilder('vouchers')
        .leftJoinAndSelect('vouchers.useVouchers', 'useVouchers')
        .where('useVouchers.accountsId = :accountsId ', { accountsId: accountId})
        .andWhere('vouchers.code = :voucherCode', { voucherCode: voucherCode})
        .getOne();
      
      if (useVoucher) {
        throw new BadRequestException('Voucher đã được sử dụng')
      }

      // check account
      const account = await this.accountsRepository.createQueryBuilder('accounts')
      .where('accounts.id = :id', { id: accountId })
      .andWhere('accounts.deletedAt IS NULL')
      .andWhere('accounts.isActive = :isActive', { isActive: true})
      .getOne();

      if (!account) {
        throw new BadRequestException('tài khoản không tồn tại hoặc đã bị khoá')
      }

      // check voucher
      const voucher = await this.vouchersRepository.createQueryBuilder('vouchers')
      .where('vouchers.code = :code', { code: voucherCode })
      .andWhere('vouchers.deletedAt IS NULL')
      .andWhere('vouchers.startDate <= :startDate ', { startDate: new Date()})
      .andWhere(' vouchers.endDate >= :endDate', {  endDate: new Date() })
      .andWhere('vouchers.quantity > 0')
      .getOne();

      
      if (!voucher) { 
        throw new BadRequestException('Voucher không tồn tại hoặc đã hết hạn')
      }
      
      return voucher

    } catch (error) {
      CommonException.handle(error)
    }
  }

  async checkStatusVoucher(codeVoucher: string, accountId: string): Promise<Vouchers> {
    try {
      const query = await this.vouchersRepository.createQueryBuilder('vouchers')
      .leftJoinAndSelect('vouchers.useVouchers', 'useVouchers')
      .where('vouchers.code = :code', { code : codeVoucher })
      .andWhere('vouchers.deletedAt is null')
      .getOne();
      console.log(query)
      if (!query) {
        throw new BadRequestException('Voucher không tồn tại hoặc đã hết hạn')
      }else {
        // check used Vouchers
        const usedVoucher = await this.useVouchersRepository.createQueryBuilder('useVouchers')
        .where('useVouchers.vouchersId = :voucherId ', { voucherId: query.id })
        .andWhere('useVouchers.accountsId = :accountId', { accountId: accountId })
        .andWhere('useVouchers.deletedAt is null')
        .getOne();
        
        if (usedVoucher) {
          throw new BadRequestException('Voucher đã được sử dụng')
        }

      }

      // if(query.startDate < new Date()) {
      //   throw new BadRequestException('Voucher not available')
      // }

      // check expire
      if (query.endDate < new Date()) {
        throw new BadRequestException('Voucher đã hết hạn')
      }
      // check quantity
      if (query.quantity <= 0) {
        throw new BadRequestException('Voucher đã hết lượt sử dụng')
      }
      
      if(query.useVouchers.id){
        throw new BadRequestException('Voucher đã được sử dụng')
      }
      
      return query;
     
    } catch (error) {
      CommonException.handle(error)
    }
  }

}
