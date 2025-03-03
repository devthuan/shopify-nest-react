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
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AttributesModule } from './modules/attributes/attributes.module';
import { VariantAttributeValuesModule } from './modules/variant-attribute-values/variant-attribute-values.module';
import { ProductImagesModule } from './modules/product_images/product_images.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { VouchersModule } from './modules/vouchers/vouchers.module';
import { CartsModule } from './modules/carts/carts.module';
import { BillsModule } from './modules/bills/bills.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { DiscountsModule } from './modules/discounts/discounts.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

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
      ProductsModule,
      CategoriesModule,
      AttributesModule,
      VariantAttributeValuesModule,
      ProductImagesModule,
      CloudinaryModule,
      VouchersModule,
      CartsModule,
      BillsModule,
      PaymentsModule,
      DiscountsModule,
      ReviewsModule,
      NotificationsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
