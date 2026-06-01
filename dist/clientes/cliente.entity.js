"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientePJ = exports.ClientePF = exports.Cliente = exports.StatusCliente = void 0;
var StatusCliente;
(function (StatusCliente) {
    StatusCliente["ATIVO"] = "ATIVO";
    StatusCliente["INATIVO"] = "INATIVO";
    StatusCliente["PENDENTE"] = "PENDENTE";
})(StatusCliente || (exports.StatusCliente = StatusCliente = {}));
class Cliente {
    id;
    nome;
    email;
    telefone;
    endereco;
    senha;
    statusCliente;
    tipoCliente;
}
exports.Cliente = Cliente;
class ClientePF extends Cliente {
    cpf;
}
exports.ClientePF = ClientePF;
class ClientePJ extends Cliente {
    cnpj;
    razaoSocial;
}
exports.ClientePJ = ClientePJ;
//# sourceMappingURL=cliente.entity.js.map