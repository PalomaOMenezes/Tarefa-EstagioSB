import { ClienteController } from "./cliente.controller";
import { ClienteService } from "./cliente.service";
import { ClienteRepository } from "./clientes.repository";
import { Module } from '@nestjs/common';
exports: [ClienteService] //add minha lista e permite que o c.module use

@Module({
    controllers: [ClienteController],
    providers: [ClienteService, ClienteRepository],
    exports: [ClienteService]
})
export class ClientesModule{}