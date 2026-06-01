"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const common_1 = require("@nestjs/common");
const cliente_service_1 = require("./cliente.service");
const cliente_dto_1 = require("./dto/cliente.dto");
const editar_cliente_dto_1 = require("./dto/editar.cliente.dto");
const passport_1 = require("@nestjs/passport");
let ClienteController = class ClienteController {
    clienteService;
    constructor(clienteService) {
        this.clienteService = clienteService;
    }
    async cadastrar(dto) {
        const cliente = await this.clienteService.cadastrarCliente(dto);
        return {
            sucesso: true,
            mensagem: 'Cliente cadastrado com sucesso',
            data: cliente,
        };
    }
    async listar(pagina = '1', limite = '10', filtroNome) {
        const clientes = await this.clienteService.listarClientes(Number(pagina), Number(limite), filtroNome);
        return {
            sucesso: true,
            mensagem: 'Listagem concluida',
            data: clientes,
        };
    }
    obterHistorico() {
        const historico = this.clienteService.obterHistorico();
        return {
            sucesso: true,
            mensagem: 'Historico de açoes da sessão',
            data: historico
        };
    }
    async editar(id, dto) {
        const clienteEditado = await this.clienteService.editarCliente(id, dto);
        return {
            sucesso: true,
            mensagem: 'Cliente editado com sucesso',
            data: clienteEditado,
        };
    }
    async excluir(id) {
        await this.clienteService.excluirCliente(id);
    }
};
exports.ClienteController = ClienteController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cliente_dto_1.CadastrarClienteDto]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "cadastrar", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('pagina')),
    __param(1, (0, common_1.Query)('limite')),
    __param(2, (0, common_1.Query)('filtroNome')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)('historico'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ClienteController.prototype, "obterHistorico", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, editar_cliente_dto_1.EditarClienteDto]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "editar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "excluir", null);
exports.ClienteController = ClienteController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('clientes'),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService])
], ClienteController);
//# sourceMappingURL=cliente.controller.js.map