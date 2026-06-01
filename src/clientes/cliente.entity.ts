export type TipoCliente = 'PF' | 'PJ';

export enum StatusCliente{
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
    PENDENTE = 'PENDENTE',
}


export abstract class Cliente {

    id: string;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    senha: string;
    statusCliente: StatusCliente;
    tipoCliente: TipoCliente;
}

export class ClientePF extends Cliente{
    cpf: string;
}

export class ClientePJ extends Cliente{
    cnpj: string;
    razaoSocial: string;
}