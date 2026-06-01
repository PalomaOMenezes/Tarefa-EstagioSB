"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const common_1 = require("@nestjs/common");
const console_1 = require("console");
let ClienteRepository = class ClienteRepository {
    listaClientes = [];
    emailSet = new Set();
    emailMap = new Map();
    async cadastrarCliente(cliente) {
        if (this.emailSet.has(cliente.email)) {
            throw new console_1.error('E-mail ja cadastrado.');
        }
        this.listaClientes.push(cliente);
        this.emailSet.add(cliente.email);
        this.emailMap.set(cliente.email, cliente);
        return cliente;
    }
    async listarCliente(pagina, limite, filtroNome) {
        let resultado = this.listaClientes;
        if (filtroNome) {
            resultado = resultado.filter(c => c.nome.toLowerCase().includes(filtroNome.toLocaleLowerCase()));
        }
        const startIndex = (pagina - 1) * limite;
        return resultado.slice(startIndex, startIndex + limite);
    }
    async editarCliente(id, dadosAtualizados) {
        const index = this.listaClientes.findIndex(c => c.id === id);
        if (index === -1)
            return null;
        const clienteAtual = this.listaClientes[index];
        if (dadosAtualizados.email && dadosAtualizados.email !== clienteAtual.email) {
            if (this.emailSet.has(dadosAtualizados.email)) {
                throw new Error('O e-mail já esta em uso');
            }
            this.emailSet.delete(clienteAtual.email);
            this.emailMap.delete(clienteAtual.email);
            this.emailSet.add(dadosAtualizados.email);
        }
        const clienteEditado = { ...clienteAtual, ...dadosAtualizados };
        this.listaClientes[index] = clienteEditado;
        this.emailMap.set(clienteEditado.email, clienteEditado);
        return clienteEditado;
    }
    async deletarCliente(id) {
        const index = this.listaClientes.findIndex(c => c.id === id);
        if (index === -1)
            return false;
        const cliente = this.listaClientes[index];
        this.listaClientes.splice(index, 1);
        this.emailSet.delete(cliente.email);
        this.emailMap.delete(cliente.email);
        return true;
    }
};
exports.ClienteRepository = ClienteRepository;
exports.ClienteRepository = ClienteRepository = __decorate([
    (0, common_1.Injectable)()
], ClienteRepository);
//# sourceMappingURL=clientes.repository.js.map