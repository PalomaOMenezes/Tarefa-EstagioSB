import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClienteService } from "src/clientes/cliente.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService{
    constructor(
        private clienteService: ClienteService,
        private jwtService: JwtService
    ){}

    async autenticar(email: string, senha: string): Promise<{acessoToken: string}>{
        const listaClientes = await this.clienteService.listarClientes(1, 1000);
        const cliente = listaClientes.find(c => c.email === email);

        if(!cliente){
            throw new UnauthorizedException('E-mail ou senha incorretos');
        }

        const senhaConfere = await bcrypt.compare(senha, cliente.senha);
        if(!senhaConfere){
            throw new UnauthorizedException('Senha ou e-mail incorretos');
        }

        const payload = {sub: cliente.id, email: cliente.email, tipo: cliente.tipoCliente };
    
        return{
            acessoToken: await this.jwtService.signAsync(payload),
        };
    }
}