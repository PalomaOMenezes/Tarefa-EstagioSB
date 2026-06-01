"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const estrutura_1 = require("../common/estrutura");
const clientes_repository_1 = require("./clientes.repository");
const cliente_entity_1 = require("./cliente.entity");
const bcrypt = __importStar(require("bcrypt"));
let ClienteService = class ClienteService {
    repository;
    auditoriaQueue = new estrutura_1.AuditoriaQueue();
    pilhaHistorico = new estrutura_1.PilhaHistorico();
    constructor(repository) {
        this.repository = repository;
    }
    async cadastrarCliente(dto) {
        const novoCliente = dto.tipoCliente === 'PF' ? new cliente_entity_1.ClientePF() : new cliente_entity_1.ClientePJ();
        const saltRounds = 10;
        const senhaHasheada = await bcrypt.hash(dto.senha, saltRounds);
        Object.assign(novoCliente, {
            ...dto,
            id: crypto.randomUUID(),
            statusCliente: cliente_entity_1.StatusCliente.ATIVO,
            senha: senhaHasheada
        });
        try {
            const clienteSalvo = await this.repository.cadastrarCliente(novoCliente);
            this.auditoriaQueue.enqueue({
                acao: 'CRIAR',
                clienteId: clienteSalvo.id,
                timestamp: new Date()
            });
            this.pilhaHistorico.push('cadastrou o cliente: ${clienteSalvo.email}');
            await this.processarAuditoria();
            return clienteSalvo;
        }
        catch (error) {
            const mensagem = error instanceof Error ? error.message : 'Erro desconhecido';
            throw new common_1.BadRequestException(mensagem);
        }
    }
    async listarClientes(pagina, limite, filtroNome) {
        this.pilhaHistorico.push('Consultou a lista de clientes');
        return await this.repository.listarCliente(pagina, limite, filtroNome);
    }
    async editarCliente(id, dto) {
        try {
            const clienteEditado = await this.repository.editarCliente(id, dto);
            if (!clienteEditado) {
                throw new common_1.BadRequestException('Cliente nao encontrado');
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
        catch (error) {
            const mensagem = error instanceof Error ? error.message : 'erro ao editar cliente';
            throw new common_1.BadRequestException(mensagem);
        }
    }
    async excluirCliente(id) {
        const deletadoComSucesso = await this.repository.deletarCliente(id);
        if (!deletadoComSucesso) {
            throw new common_1.BadRequestException('Cliente nao encontrado');
        }
        this.auditoriaQueue.enqueue({
            acao: 'DELETAR',
            clienteId: id,
            timestamp: new Date()
        });
        this.pilhaHistorico.push('Deletou cliente com id: ${id}');
        await this.processarAuditoria();
    }
    obterHistorico() {
        return this.pilhaHistorico.getHistorico();
    }
    async processarAuditoria() {
        while (this.auditoriaQueue.hasItems()) {
            const evento = this.auditoriaQueue.dequeue();
            if (evento) {
                console.log('[Auditoria processada] operação: ${evento.acao} | Cliente ID: ${evento.clienteId} | Horario: ${evento.timestamp.toISOSring()}');
            }
        }
    }
};
exports.ClienteService = ClienteService;
exports.ClienteService = ClienteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clientes_repository_1.ClienteRepository])
], ClienteService);
//# sourceMappingURL=cliente.service.js.map