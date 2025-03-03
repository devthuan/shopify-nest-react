import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { BaseService } from 'src/common/base.service';
import { Accounts } from '../auth/entities/account.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../role/entities/role.entity';
import { AuthService } from '../auth/auth.service';
import { CommonException } from 'src/common/exception';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AccountsService extends BaseService<Accounts> {
 constructor(
   @InjectRepository(Accounts)
    private readonly accountsRepository: Repository<Accounts>,

   @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,

    private readonly authService: AuthService,
    private readonly mailService : MailService,
   
    private readonly dataSource : DataSource
 ){
  super(accountsRepository);
 }

 async createAccountNoVerifyOTP(createAccountDto : CreateAccountDto): Promise<{statusCode: number, status : string, message: string, data: Accounts}> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    try {

      await queryRunner.startTransaction()

      const existingAccountEmail = await this.accountsRepository.findOne({
        where: { email: createAccountDto.email },
      });
      if (existingAccountEmail) throw new BadRequestException('Email đã tồn tại')
      
      const existingAccountUsername = await this.accountsRepository.findOne({
        where: { userName: createAccountDto.username },
      });
      if (existingAccountUsername) throw new BadRequestException('Username đã tồn tại')
      
      const  role = await this.rolesRepository.createQueryBuilder('roles')
      .where('roles.codeName = :codeName', {codeName: createAccountDto.role})
      .andWhere('roles.deletedAt is null')
      .getOne();

      if (!role){
        throw new BadRequestException('Role not found')
      } 


      const new_user = this.accountsRepository.create({
        userName: createAccountDto.username,
        email: createAccountDto.email,
        password:  await this.authService.hashingPassword(createAccountDto.password),
        balance: 0,
        ip: '127.0.0.1',
        device: 'web',
        typeLogin: 'system',
        lastLogin: null,
        isActive: true,
        role: role 
      })
      await queryRunner.manager.save(new_user)

     

      // const newAccountInfo =  this.userInformationRepository.create({
      //   email: createAccountDto.email,
      //   account: new_user
      // })
      // await queryRunner.manager.save(newAccountInfo)
        
      await queryRunner.commitTransaction()

      return {
        statusCode: 201,
        status:'success',
        message: 'User registered successfully',
        data: new_user
      }
      
    } catch (error) {
      await queryRunner.rollbackTransaction();
      CommonException.handle(error)
    }finally {
      await queryRunner.release();
    }
  }

  async lockAccount(accountId: string): Promise<{statusCode: number, status: string, message: string}> {
    try {
      // check account
      const account = await this.accountsRepository.createQueryBuilder('accounts')
      .where('accounts.id = :id', {id: accountId})
      .andWhere('accounts.deletedAt is null')
      .getOne();
      
      if(!account) {
        throw new BadRequestException('Account not found.')
      }
    
      
      // lock account
      account.isActive = !account.isActive;
      account.updatedAt = new Date();
      await this.accountsRepository.save(account);
      if(account.isActive){
        return {
          statusCode: 200,
          status:'success',
          message: 'Account unlocked successfully'
        }
        
      }else {
        return { 
          statusCode: 200,
          status: 'success',
          message: 'Account locked successfully' 
        }
      }
    } catch (error) {
      CommonException.handle(error)
    }
  }

  async updateAccount(updateAccountDto : UpdateAccountDto): Promise<{statusCode: number, status: string, message: string}> {
    try {
      const checkAccount = await this.accountsRepository.createQueryBuilder('accounts')
        .leftJoinAndSelect('accounts.role', 'role')
        .where('accounts.id = :id', { id: updateAccountDto.id })
        .andWhere('accounts.deletedAt is null')
        .getOne();

        if (!checkAccount) {

          throw new BadRequestException('Account not found.')
        }

        // check username
        if (updateAccountDto.userName && checkAccount.userName!== updateAccountDto.userName) {
          const checkUsername = await this.accountsRepository.findOne({ where: { userName: updateAccountDto.userName } });
          if (checkUsername) {
            throw new BadRequestException('Username already exists.');
          }
        }

        if (updateAccountDto.role && checkAccount.role.codeName!== updateAccountDto.role) {
          const role = await this.rolesRepository.findOne({ where: { codeName: updateAccountDto.role } });
          if (!role) {
            throw new BadRequestException('Role not found.');
          }
        
          checkAccount.role = role;
          checkAccount.userName = updateAccountDto.userName
          checkAccount.updatedAt = new Date();  
        }
        await this.accountsRepository.save(checkAccount);
      return { 
        statusCode: 200,
        status: 'success',
        message: 'Account updated successfully.' }
    } catch (error) {
      CommonException.handle(error)
    }
  }

  async resetPassword(accountId : string): Promise<{statusCode: number, status: string, message: string}> {
    try {
      const account = await this.accountsRepository.createQueryBuilder('accounts')
      .where('accounts.id = :id', { id: accountId })
      .getOne();
      
      if (!account) {
        throw new BadRequestException('Account not found.')
      }
      
      const newPassword = Math.random().toString(36).slice(-8);

      const hashedPassword = await this.authService.hashingPassword(newPassword);

      // send email to account with new password
      await this.mailService.sendEmail(account.email, "Cấp mật khẩu mới", newPassword, newPassword)
      
      account.password = hashedPassword;
      account.updatedAt = new Date()
      await this.accountsRepository.save(account);
      
      return {
        statusCode: 200,
        status:'success',
        message: 'Password reset successfully.'
      }
    } catch (error) {
      CommonException.handle(error)
    }
  }

}
