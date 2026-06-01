import type { TipoCliente } from '../cliente.entity';
export declare class CadastrarClienteDto {
    senha: string;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    tipoCliente: TipoCliente;
    cpf?: string;
    cnpj?: string;
    razaoSocial?: string;
}
