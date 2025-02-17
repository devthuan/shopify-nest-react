import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './modules/role/role.module';
import { MailModule } from './modules/mail/mail.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from './modules/redis/redis.module';
import { VariantsModule } from './modules/variants/variants.module';
import { AttributeValuesModule } from './modules/attribute_values/attribute_values.module';
import { VariantAttributesModule } from './modules/variant_attributes/variant_attributes.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AttributesModule } from './modules/attributes/attributes.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.development.env',
        isGlobal: true,
      }),
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),

      AuthModule,
      RoleModule,
      MailModule,
      RedisModule,
      VariantsModule,
      AttributeValuesModule,
      VariantAttributesModule,
      ProductsModule,
      CategoriesModule,
      AttributesModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
