export type TipoCliente = 'PF' | 'PJ';
export declare enum StatusCliente {
    ATIVO = "ATIVO",
    INATIVO = "INATIVO",
    PENDENTE = "PENDENTE"
}
export declare abstract class Cliente {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    senha: string;
    statusCliente: StatusCliente;
    tipoCliente: TipoCliente;
}
export declare class ClientePF extends Cliente {
    cpf: string;
}
export declare class ClientePJ extends Cliente {
    cnpj: string;
    razaoSocial: string;
}
