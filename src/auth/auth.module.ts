import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ClientesModule } from "src/clientes/cliente.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./auth.strategy";

@Module({
    imports: [
        ClientesModule, //importanto para a leitura do array
        JwtModule.register({
            global: true,
            secret: 'chave_super_secreta',
            signOptions: {expiresIn: '1h'},
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule{}