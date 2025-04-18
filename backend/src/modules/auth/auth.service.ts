import { RedisService } from './../redis/redis.service';
import { BadRequestException,  Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from './entities/account.entity';
import { DataSource, Repository } from 'typeorm';
import { Roles } from '../role/entities/role.entity';
import { CommonException } from 'src/common/exception';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { MailService } from '../mail/mail.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { BaseService } from 'src/common/base.service';
import { LoginGoogle } from './auth.interface';

@Injectable()
export class AuthService extends BaseService<Accounts> {
  constructor(
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Accounts)
    private readonly accountRepository: Repository<Accounts>,
    @InjectRepository(Roles)
    private readonly roleRepository: Repository<Roles>,

    private readonly dataSource: DataSource,
    
    private readonly mailService: MailService,
    private readonly redisService: RedisService,  
    private readonly jwtService: JwtService,
  ) {
    super(accountRepository);
  }

  async createAccountForClient(createAuthDto: CreateAuthDto) : Promise<{statusCode: number, status: string, message: string}> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // check existing account
      const existingAccount = await this.accountRepository.findOne({where:{email: createAuthDto.email}});
      if(existingAccount) {
        if(!existingAccount.isActive && existingAccount.lastLogin === null) {
              // generate otp 
          const otp = this.generateOTP();
          const otpHash = await this.hashingPassword(otp.toString())

          // save otp to redis
          this.redisService.set(createAuthDto.email, otpHash, 3000);
          // send otp to email
          await this.mailService.sendEmail(
            createAuthDto.email,
            'Mã otp xác thực tài khoản',
            otp.toString(),
            otp.toString()
          )
          throw new BadRequestException('Tài khoản chưa được kích hoạt, vui lòng kiểm tra email để kích hoạt tài khoản');
        }else {
          throw new BadRequestException('Email đã tồn tại');
        }
      }
      const existingAccountUsername = await this.checkExistingCommon({column: "userName", value: createAuthDto.username});
      if(existingAccountUsername) {
        throw new BadRequestException('Username đã tồn tại');
      }

      // check role
      const role = await this.roleRepository.findOne({where:{codeName: 'client'}});
      if(!role) {
        throw new BadRequestException('Role không tồn tại');
      }

      // create account
      const newAccount = this.accountRepository.create({
        userName: createAuthDto.username,
        email: createAuthDto.email,
        password: await this.hashingPassword(createAuthDto.password),
        balance: 0,
        ip: '127.0.0.1',
        device: 'web',
        typeLogin: 'system',
        lastLogin: null,
        isActive: true,
        role: role 
      });
      await queryRunner.manager.save(newAccount);

      // generate otp 
      const otp = this.generateOTP();
      const otpHash = await this.hashingPassword(otp.toString())

       // save otp to redis
      this.redisService.set(createAuthDto.email, otpHash, 3000);
      // send otp to email
      // await this.mailService.sendEmail(
      //   createAuthDto.email,
      //   'Mã otp xác thực tài khoản',
      //   otp.toString(),
      //   otp.toString()
      // )

      await queryRunner.commitTransaction()
      return {
        statusCode: 201,
        status:'success',
        message: 'Đăng tài khoản thành công',
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      CommonException.handle(error);
    } finally {
      await queryRunner.release();
    }
  }

  async loginForClient(loginDto: LoginDto): Promise<{statusCode: number, status: string, message: string, data: object }> {
    try {
      const user = await this.dataSource
      .getRepository(Accounts)
      .createQueryBuilder('accounts')
      .leftJoinAndSelect('accounts.role', 'roles')
      .where('(accounts.email = :email OR accounts.username = :username)', {
        email: loginDto.email || null,     // Nếu không có email, dùng null
        username: loginDto.username || null,  // Nếu không có username, dùng null
      })
      .andWhere('accounts.deletedAt is null')
      .getOne()

      if (!user) {
       throw new NotFoundException('Tài khoản không tồn tại');
      }
      if(!user.isActive){
        throw new BadRequestException('Tài khoản chưa được kích hoạt');
       
      }
      const isMatch = await bcrypt.compare(loginDto.password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Tài khoản hoặc mật khẩu không đúng');
       
      }

      const payload = {
        id: user.id,
        username: user.userName,
        email: user.email,
        role: user.role.codeName
      }
      const token = await this.jwtService.signAsync(payload)

      user.lastLogin = new Date();
      user.ip = loginDto.ip;
      await this.accountRepository.save(user);

      return {
        statusCode: 200,
        status:'success',
        message: 'Đăng nhập thành công',
        data: {
          accessToken : token
        }
      }
    } catch (error) {
      CommonException.handle(error);
    }
  }

  async loginForAdmin(loginDto: LoginDto): Promise<{statusCode: number, status: string, message: string, data: object }> {
    try {
      const user = await this.dataSource
      .getRepository(Accounts)
      .createQueryBuilder('accounts')
      .leftJoinAndSelect('accounts.role', 'roles')
      .where('(accounts.email = :email OR accounts.username = :username)', {
        email: loginDto.email || null,     // Nếu không có email, dùng null
        username: loginDto.username || null,  // Nếu không có username, dùng null
      })
      .andWhere('accounts.deletedAt is null')
      .getOne()

      if (!user) {
       throw new NotFoundException('Tài khoản không tồn tại');
      }
      if(!user.isActive){
        throw new BadRequestException('Tài khoản chưa được kích hoạt');
       
      }
     
      const isMatch = await bcrypt.compare(loginDto.password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Tài khoản hoặc mật khẩu không đúng');
      
      }

      if(user.role.codeName !== 'admin') {
        throw new UnauthorizedException('Tài khoản không có quyền truy cập chức năng này!');
      }

      const payload = {
        id: user.id,
        username: user.userName,
        email: user.email,
        role: user.role.codeName
      }
      const token = await this.jwtService.signAsync(payload)

      user.lastLogin = new Date();
      user.ip = loginDto.ip;
      await this.accountRepository.save(user);

      return {
        statusCode: 200,
        status:'success',
        message: 'Đăng nhập thành công',
        data: {
          accessToken : token
        }
      }
    } catch (error) {
      CommonException.handle(error);
    }
  }

  async loginWithGoogle(infoUser : LoginGoogle): Promise<any>{
  
      const queryRunner = this.dataSource.createQueryRunner()
    try {
      await queryRunner.connect()
      await queryRunner.startTransaction()

      // check existing accounts
      const existingAccountEmail = await this.accountRepository.createQueryBuilder('accounts')
      .leftJoinAndSelect('accounts.role', 'role')
      .where('accounts.email = :email', {email: infoUser.email})
      .getOne();
      if (existingAccountEmail){
         const payload = {
          id: existingAccountEmail.id,
          username: existingAccountEmail?.userName,
          email: existingAccountEmail.email,
          role: existingAccountEmail.role.codeName
        }
        const token = await this.jwtService.signAsync(payload)

        existingAccountEmail.lastLogin = new Date();
        existingAccountEmail.ip = "0.0.0.0";
        existingAccountEmail.typeLogin = "google";
        await this.accountRepository.save(existingAccountEmail);
        return {
          statusCode: 200,
          status:'success',
          message: 'Đăng nhập thành công.',
          data: {
            accessToken : token
          }
        }
      }else {
        const  role = await this.roleRepository.createQueryBuilder('roles')
          .where('roles.codeName = :codeName', {codeName: "client"})
          .andWhere('roles.deletedAt is null')
          .getOne();

          if (!role) throw new BadRequestException('Quyền không tồn tại');


          const new_user = this.accountRepository.create({
            userName: infoUser.email,
            email: infoUser.email,
            password: await this.hashingPassword(this.generatePassword()),
            balance: 0,
            ip: '127.0.0.1',
            device: 'web',
            typeLogin: 'google',
            lastLogin: null,
            isActive: true,
            role: role 
          })
          await queryRunner.manager.save(new_user)

        
          // const newAccountInfo =  this.userInformationRepository.create({
          //   email: infoUser.email,
          //   avatar: infoUser.picture,
          //   fullName: infoUser.firstName + " " + infoUser.lastName,
          //   account: new_user
          // })
          // await queryRunner.manager.save(newAccountInfo)
        
          const payload = {
          id: new_user.id,
          username: new_user?.userName,
          email: new_user.email,
          role: role.codeName
        }
        const token = await this.jwtService.signAsync(payload)

        new_user.lastLogin = new Date();
        new_user.ip = "0.0.0.0";
        await queryRunner.manager.save(new_user);
        
        await queryRunner.commitTransaction()
        
        return {
          statusCode: 200,
          status:'success',
          message: 'Đăng nhập thành công.',
          data: {
            accessToken : token
          }
        }

      
      }
      
      
    } catch (error) {
      await queryRunner.rollbackTransaction()
      CommonException.handle(error)
    }finally {
      await queryRunner.release();
    }
   
  }

  async sendOTP(email: string) : Promise<{statusCode: number, status: string, message: string}> {
    try {
        const cachedData = await this.redisService.get(email);
        if (cachedData) {
            throw new BadRequestException('Bạn đã yêu cầu mã OTP, vui lòng kiểm tra email của bạn.');
           
        }

        const otp : number = this.generateOTP();
        const hashedOTP : string = await this.hashingPassword(otp.toString());
        await this.redisService.set(email, hashedOTP, 6000);

        console.log(this.redisService.get(email))
        await this.mailService.sendEmail(
            email,
            "Mã OTP đăng ký tài khoản",
            otp.toString(),
            otp.toString()
        )
        return {
            statusCode: 200,
            status: "success",
            message: "OTP đã gửi thành công",
        };
        
    } catch (error) {
        CommonException.handle(error);
    }
  }

  async verifyOTP(email : string, otp : string) : Promise<{statusCode: number, status: string, message: string}> {
      try {
          const otpCache : string = await this.redisService.get(email)
          console.log(otpCache)
          if(!otpCache) {
            throw new NotFoundException('OTP hết hạn hoặc không tồn tại');
             
          }
          const checkOTP = await this.verifyPassword(otp,otpCache)
          if(!checkOTP) {
              throw new BadRequestException('OTP không đúng');
          }

          const user = await this.accountRepository.findOne({
              where: {
                  email: email,
                  deletedAt:  null
              }
          })

          if(!user) {
            throw new NotFoundException('Tài khoản không tồn tại');
          }
          user.isActive = true
          user.updatedAt = new Date()
          await this.accountRepository.save(user)
          

          await this.redisService.del(email)
          return {
              statusCode: 200,
              status: "success",
              message: "Xác thực tài khoản thành công."
          };
      } catch (error) {
         CommonException.handle(error); 
      }
  }

  async changePassword(changePasswordDto : ChangePasswordDto): Promise<{statusCode: number, status: string, message: string}> {
    try {
      const user = await this.accountRepository.findOne({
        where: {
          email: changePasswordDto.email,
          deletedAt: null
        }
      })

      if (!user) {
        throw new NotFoundException('Tài khoản không tồn tại');
      
      }

      const isMatch = await bcrypt.compare(changePasswordDto.oldPassword, user.password);
      if (!isMatch) {
        throw new BadRequestException('Mật khẩu cũ không đúng');
      }

      const newPassword = await this.hashingPassword(changePasswordDto.newPassword);
      user.password = newPassword;
      user.updatedAt = new Date();
      await this.accountRepository.save(user);

      return {
        statusCode: 200,
        status:'success',
        message: 'Đã thay đổi mật khẩu thành công',
      }
      
    } catch (error) {
      CommonException.handle(error);
    }
  }

  async forgotPassword(email: string): Promise<{statusCode: number, status: string, message: string}> {
    try {
      const user = await this.accountRepository.findOne({
        where: {
          email: email,
          deletedAt: null
        }
      })

      if(!user){ 
        return {
          statusCode: 404,
          status: 'error',
          message: 'Tài khoản không tồn tại',
        }
      }

      const newPassword = this.generatePassword();
      const hashedNewPassword = await this.hashingPassword(newPassword);
      user.password = hashedNewPassword;
      user.updatedAt = new Date();
      await this.accountRepository.save(user);
      
      await this.mailService.sendEmail(
        email,
        "Mật khẩu mới",
        "Mật khẩu của bạn đã được thay đổi thành công",
        `<p>Mật khẩu mới của bạn là: ${newPassword}</p>`
      )

      return {
        statusCode: 200,
        status:'success',
        message: 'Đã thay đổi mật khẩu thành công',
      }

      
    } catch (error) {
      CommonException.handle(error);
    }
  }

  async hashingPassword(password: string): Promise<string> {
      let salt : number = 10;
      let hashedPassword : string = await bcrypt.hash(password, salt);
      return hashedPassword;
  }

  async verifyPassword(originPassword: string, hashPassword: string): Promise<boolean> {
      return await bcrypt.compare(originPassword, hashPassword);
  }

  generateOTP() {
      let otp = Math.floor(100000 + Math.random() * 900000);
      return otp;
  }

  generatePassword(): string {
      const password = Math.random().toString(36).substr(2, 10);
      return password;
  }
  
}
