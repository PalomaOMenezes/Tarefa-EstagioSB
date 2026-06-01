import { Cliente } from "./cliente.entity";
export declare class ClienteRepository {
    private listaClientes;
    private emailSet;
    private emailMap;
    cadastrarCliente(cliente: Cliente): Promise<Cliente>;
    listarCliente(pagina: number, limite: number, filtroNome?: string): Promise<Cliente[]>;
    editarCliente(id: string, dadosAtualizados: Partial<Cliente>): Promise<Cliente | null>;
    deletarCliente(id: string): Promise<boolean>;
}
