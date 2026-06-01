import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/cliente.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ClientesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

