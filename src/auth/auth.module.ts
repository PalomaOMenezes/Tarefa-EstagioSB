import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ClientesModule } from "src/clientes/cliente.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        ClientesModule, //importanto para a leitura do array
        JwtModule.register({
            global: true,
            secret: 'chave_super_secreta',
            signOptions: {expiresIn: '1h'},
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule{}