// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Ativa a validação baseada nos nossos DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades extras que o usuário tentar enviar (segurança)
    forbidNonWhitelisted: true, // Retorna erro 400 se enviarem campos que não existem no DTO
  }));

  await app.listen(3000);
}
bootstrap();