import { PartialType } from "@nestjs/mapped-types";
import { CadastrarClienteDto } from "./cliente.dto";

export class EditarClienteDto extends PartialType(CadastrarClienteDto){}

