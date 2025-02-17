import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { RedisService } from '../redis/redis.service';
import { MailService } from '../mail/mail.service';
import { QueryRunner, Repository } from 'typeorm';
import { Accounts } from './entities/account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Roles } from '../role/entities/role.entity';
import { DataSource } from 'typeorm/browser';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let accountRepository: Repository<Accounts>;
  let roleRepository: Repository<Roles>;
  let redisService: RedisService;
  let mailService: MailService;
  let queryRunner: QueryRunner;
  
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Accounts), useClass: Repository
        },
        {
          provide: getRepositoryToken(Roles), useClass: Repository
        },
        { provide: RedisService, useClass: RedisService },
      ]
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    accountRepository = moduleRef.get<Repository<Accounts>>(getRepositoryToken(Accounts));
    roleRepository = moduleRef.get<Repository<Roles>>(getRepositoryToken(Roles));
    redisService = moduleRef.get<RedisService>(RedisService);
    mailService = moduleRef.get<MailService>(MailService);
    queryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: { save: jest.fn() },
    } as unknown as QueryRunner;
    authService['dataSource'].createQueryRunner = jest.fn().mockReturnValue(queryRunner);
  });

  it('should create an account successfully', async () => {
    jest.spyOn(accountRepository, 'findOne').mockResolvedValue(null);
    
    jest.spyOn(roleRepository, 'findOne').mockResolvedValue({ id: 1, codeName: 'client' } as unknown as Roles);

    jest.spyOn(queryRunner.manager, 'save').mockResolvedValue({});

    jest.spyOn(redisService, 'set').mockResolvedValue();

    jest.spyOn(mailService, 'sendEmail').mockResolvedValue('email sent');

    const result = await authService.createAccountForClient({
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
      confirmPassword: '',
      role: ''
    });
     
    expect(result).toEqual({
      statusCode: 201,
      status: 'success',
      message: 'Đăng tài khoản thành công',
    });

    expect(queryRunner.manager.save).toHaveBeenCalledTimes(1);
    expect(redisService.set).toHaveBeenCalledTimes(1);
    expect(mailService.sendEmail).toHaveBeenCalledTimes(1);
    expect(queryRunner.commitTransaction).toHaveBeenCalledTimes(1);
  });



});
