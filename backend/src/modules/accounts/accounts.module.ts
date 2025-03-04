import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Accounts } from '../auth/entities/account.entity';
import { Roles } from '../role/entities/role.entity';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accounts, Roles]),
    AuthModule,
    MailModule
  ],
  exports: [AccountsService],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
