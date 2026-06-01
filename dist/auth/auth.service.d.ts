import { JwtService } from "@nestjs/jwt";
import { ClienteService } from "../clientes/cliente.service";
export declare class AuthService {
    private clienteService;
    private jwtService;
    constructor(clienteService: ClienteService, jwtService: JwtService);
    autenticar(email: string, senha: string): Promise<{
        acessoToken: string;
    }>;
}
