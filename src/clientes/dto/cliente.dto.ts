import { IsEmail, IsIn, IsNotEmpty, IsString, ValidateIf, MinLength } from "class-validator";
import * as clienteEntity from "../cliente.entity";
import type { TipoCliente } from '../cliente.entity'; 

export class CadastrarClienteDto{
    @IsString()
    @IsNotEmpty({message:'A senha é obrigatória'})
    @MinLength(6,{message: 'A senha deve terno minimo 6 carateres'})
    senha: string;

    @IsString({message: 'O nome deve ser um texto'})
    @IsNotEmpty({message: ' o nome é obrigatório'})
    nome: string;

    @IsEmail({}, {message: 'Forneça um e-mail valido'})
    email: string;

    @IsString()
    @IsNotEmpty({message: 'O telefone é obrigatório'})
    telefone: string;

    @IsString()
    @IsNotEmpty({message: 'O endereço é obrogatório'})
    endereco: string;

    @IsString()
    @IsIn(['PF', 'PJ'], {message: 'O tipo deve ser PF ou PJ'})
    tipoCliente: TipoCliente;

    @ValidateIf(objeto => objeto.tipoCliente === 'PF')
    @IsString()
    @IsNotEmpty({message: 'O CPF é obrigatório para pessoa fisica'})
    cpf?: string;

    @ValidateIf(objeto => objeto.tipo === 'PJ')
    @IsString()
    @IsNotEmpty({message: 'O CNPJ é obrigatório para pessoa juídica'})
    cnpj?: string;

    @ValidateIf(objeto => objeto.tipoCliente === 'PJ')
    @IsString()
    @IsNotEmpty({message:'Razão social é obrigatório para pessoa jurídica'})
    razaoSocial?: string;

}