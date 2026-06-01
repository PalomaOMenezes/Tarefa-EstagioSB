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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastrarClienteDto = void 0;
const class_validator_1 = require("class-validator");
class CadastrarClienteDto {
    senha;
    nome;
    email;
    telefone;
    endereco;
    tipoCliente;
    cpf;
    cnpj;
    razaoSocial;
}
exports.CadastrarClienteDto = CadastrarClienteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'A senha é obrigatória' }),
    (0, class_validator_1.MinLength)(6, { message: 'A senha deve terno minimo 6 carateres' }),
    __metadata("design:type", String)
], CadastrarClienteDto.prototype, "senha", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O nome deve ser um texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: ' o nome é obrigatório' }),
    __metadata("design:type", String)
], CadastrarClienteDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Forneça um e-mail valido' }),
    __metadata("design:type", String)
], CadastrarClienteDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O telefone é obrigatório' }),
    __metadata("design:type", String)
], CadastrarClienteDto.prototype, "telefone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O endereço é obrogatório' }),
    __metadata("design:type", String)
], CadastrarClienteDto.prototype, "endereco", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['PF', 'PJ'], { message: 'O tipo deve ser PF ou PJ' }),
    __metadata("design:type", String)
], CadastrarClienteDto.prototype, "tipoCliente", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(objeto => objeto.tipoCliente === 'PF'),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O CPF é obrigatório para pessoa fisica' }),
    __metadata("design:type", String)
], CadastrarClienteDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(objeto => objeto.tipo === 'PJ'),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O CNPJ é obrigatório para pessoa juídica' }),
    __metadata("design:type", String)
], CadastrarClienteDto.prototype, "cnpj", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(objeto => objeto.tipoCliente === 'PJ'),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Razão social é obrigatório para pessoa jurídica' }),
    __metadata("design:type", String)
], CadastrarClienteDto.prototype, "razaoSocial", void 0);
//# sourceMappingURL=cliente.dto.js.map