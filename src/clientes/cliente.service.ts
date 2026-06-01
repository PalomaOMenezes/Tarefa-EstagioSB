import { BadRequestException, Injectable } from "@nestjs/common";
import { AuditoriaQueue, PilhaHistorico } from "src/common/estrutura";
import { ClienteRepository } from "./clientes.repository";
import { CadastrarClienteDto } from "./dto/cliente.dto";
import { Cliente, ClientePF, ClientePJ, StatusCliente } from "./cliente.entity";
import { EditarClienteDto } from "./dto/editar.cliente.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClienteService{

    // Instanciando as estruturas de dados diretamente do Service
    private auditoriaQueue = new AuditoriaQueue();
    private pilhaHistorico = new PilhaHistorico();

    // Injeção de Dependência: trazemos o Repositório para dentro do Service
    constructor(private readonly repository: ClienteRepository){}

    async cadastrarCliente(dto: CadastrarClienteDto): Promise<Cliente>{
        const novoCliente = dto.tipoCliente === 'PF' ? new ClientePF(): new ClientePJ();

        const saltRounds = 10;

        const senhaHasheada = await bcrypt.hash(dto.senha, saltRounds);

        Object.assign(novoCliente,{
            ...dto,
            id: crypto.randomUUID(),
            statusCliente: StatusCliente.ATIVO,
            senha: senhaHasheada // Salvamos o Hash, e NUNCA a senha do DTO
        });
        
        try{
            const clienteSalvo = await this.repository.cadastrarCliente(novoCliente);

            this.auditoriaQueue.enqueue({
                acao:'CRIAR',
                clienteId: clienteSalvo.id,
                timestamp: new Date()
            });

            this.pilhaHistorico.push('cadastrou o cliente: ${clienteSalvo.email}')

            // Dispara o processamento assíncrono da fila de auditoria
            await this.processarAuditoria();

            return clienteSalvo;
        }
        catch(error: unknown){
            // Captura o erro disparado pelo repositório (ex: e-mail duplicado) e repassa como erro HTTP 400
            const mensagem = error instanceof Error ? error.message: 'Erro desconhecido';
        
            throw new BadRequestException(mensagem);
        }
    }


    async listarClientes(pagina: number, limite: number, filtroNome?: string): Promise<Cliente[]>{
        this.pilhaHistorico.push('Consultou a lista de clientes');

        return await this.repository.listarCliente(pagina, limite, filtroNome);
    }

    async editarCliente(id: string, dto: EditarClienteDto): Promise<Cliente>{
        try{
            const clienteEditado = await this.repository.editarCliente(id, dto);

            if (!clienteEditado){
                throw new BadRequestException('Cliente nao encontrado');
            }

            this.auditoriaQueue.enqueue({
                acao: 'ATUALIZAR',
                clienteId: id,
                timestamp: new Date()
            });

            this.pilhaHistorico.push('editou o cliente: ${clienteEditado.email}');
        
            await this.processarAuditoria();

            return clienteEditado;
        }
        catch(error: unknown){
            const mensagem = error instanceof Error ? error.message : 'erro ao editar cliente';
            throw new BadRequestException(mensagem);
        }
    }

    async excluirCliente(id: string): Promise<void>{
        const deletadoComSucesso = await this.repository.deletarCliente(id);

        if(!deletadoComSucesso){
            throw new BadRequestException('Cliente nao encontrado');
        }

        this.auditoriaQueue.enqueue({
            acao:'DELETAR',
            clienteId: id,
            timestamp: new Date()
        })

        this.pilhaHistorico.push('Deletou cliente com id: ${id}');

        await this.processarAuditoria();
    }

    obterHistorico(): string[]{
        return this.pilhaHistorico.getHistorico();
    }

    private async processarAuditoria(): Promise<void>{
        while(this.auditoriaQueue.hasItems()){
            const evento = this.auditoriaQueue.dequeue();

            if(evento){
                console.log('[Auditoria processada] operação: ${evento.acao} | Cliente ID: ${evento.clienteId} | Horario: ${evento.timestamp.toISOSring()}');
            }
        }
    }
}