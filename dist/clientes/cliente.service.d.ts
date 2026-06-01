import { ClienteRepository } from "./clientes.repository";
import { CadastrarClienteDto } from "./dto/cliente.dto";
import { Cliente } from "./cliente.entity";
import { EditarClienteDto } from "./dto/editar.cliente.dto";
export declare class ClienteService {
    private readonly repository;
    private auditoriaQueue;
    private pilhaHistorico;
    constructor(repository: ClienteRepository);
    cadastrarCliente(dto: CadastrarClienteDto): Promise<Cliente>;
    listarClientes(pagina: number, limite: number, filtroNome?: string): Promise<Cliente[]>;
    editarCliente(id: string, dto: EditarClienteDto): Promise<Cliente>;
    excluirCliente(id: string): Promise<void>;
    obterHistorico(): string[];
    private processarAuditoria;
}
