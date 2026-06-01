"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarClienteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const cliente_dto_1 = require("./cliente.dto");
class EditarClienteDto extends (0, mapped_types_1.PartialType)(cliente_dto_1.CadastrarClienteDto) {
}
exports.EditarClienteDto = EditarClienteDto;
//# sourceMappingURL=editar.cliente.dto.js.map