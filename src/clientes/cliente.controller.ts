import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { CadastrarClienteDto } from "./dto/cliente.dto";
import type { ApiResponse } from "src/common/api.reponse";
import { Cliente } from "./cliente.entity";
import { EditarClienteDto } from "./dto/editar.cliente.dto";
import { LoginDto } from '../auth/dto';
import {AuthGuard} from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('clientes')
export class ClienteController{

    constructor (private readonly clienteService: ClienteService){}

    @Post()
    async cadastrar(@Body() dto: CadastrarClienteDto): Promise<ApiResponse<Cliente>>{
        const cliente = await this.clienteService.cadastrarCliente(dto);
        return{
            sucesso: true,
            mensagem:'Cliente cadastrado com sucesso',
            data: cliente,
        };
    }

    @Get()
    async listar(
        @Query('pagina') pagina = '1',
        @Query('limite') limite = '10',
        @Query('filtroNome') filtroNome?: string
    ): Promise<ApiResponse<Cliente[]>>{
        const clientes = await this.clienteService.listarClientes(Number(pagina), Number(limite), filtroNome);
        return{
            sucesso: true,
            mensagem:'Listagem concluida',
            data: clientes,
        };
    }

    @Get('historico')
    obterHistorico(): ApiResponse<string[]>{
        const historico = this.clienteService.obterHistorico();
        return{
            sucesso: true,
            mensagem: 'Historico de açoes da sessão',
            data: historico
        };
    }

    @Patch(':id')
    async editar(
        @Param('id') id: string,
        @Body() dto: EditarClienteDto
    ): Promise<ApiResponse<Cliente>>{
        const clienteEditado = await this.clienteService.editarCliente(id, dto);
        return{
            sucesso: true,
            mensagem: 'Cliente editado com sucesso',
            data: clienteEditado,
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async excluir(@Param('id')id: string): Promise<void>{
        await this.clienteService.excluirCliente(id);
    }

}