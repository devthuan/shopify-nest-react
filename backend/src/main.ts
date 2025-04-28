import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1/');

  app.enableCors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],  // Cho phép tất cả các domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Nếu bạn cần gửi cookie/token
});
 

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    
  }));

  await app.listen(process.env.APP_PORT ?? 8000);
}
bootstrap();
