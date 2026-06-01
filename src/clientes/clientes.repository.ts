import { Injectable } from "@nestjs/common";
import { error } from "console";
import { Cliente } from "./cliente.entity";


@Injectable()
export class ClienteRepository{

    private listaClientes: Cliente[]=[];

    //garantindo unicidade do email, set guarda valores unicos e aqui verifica
    private emailSet = new Set<string>();

    //passo o email como chave, e ele retorna o cliente todo (busca O(1))
    private emailMap = new Map<string, Cliente>();

    async cadastrarCliente(cliente: Cliente): Promise<Cliente>{

        // Validação usando o Set, super rapida
        if(this.emailSet.has(cliente.email)){
            throw new error('E-mail ja cadastrado.');
        }

        this.listaClientes.push(cliente);
        this.emailSet.add(cliente.email);
        this.emailMap.set(cliente.email, cliente);

        return cliente;
    }

    
    async listarCliente(pagina: number, limite: number, filtroNome?: string): Promise<Cliente[]>{
        
        //variavel usando let pode ser modificada em seguida
        let resultado = this.listaClientes;

        if(filtroNome){
            resultado = resultado.filter(c =>
                c.nome.toLowerCase().includes(filtroNome.toLocaleLowerCase())
                //tolowercase deixa todas as letras do nome do db e digoitado em minuscula
                //includes verifica se o nome digitado esta contido no nome
            );
        }

        const startIndex = (pagina - 1) * limite;
        //calcula emqual indice nossa pagina vai começar
        //slice corta um pedaço do array (startindex + limite)
        return resultado.slice(startIndex, startIndex + limite);
    }

    async editarCliente(id: string, dadosAtualizados: Partial<Cliente>): Promise<Cliente | null>{
        const index = this.listaClientes.findIndex(c => c.id === id);
        if(index === -1) return null;

        const clienteAtual = this.listaClientes[index];

        // Se o email estiver sendo alterado, precisamos atualizar o Set e o Map
        if(dadosAtualizados.email && dadosAtualizados.email !== clienteAtual.email){
           if(this.emailSet.has(dadosAtualizados.email)){
            throw new Error('O e-mail já esta em uso')
           } 
           
            // Remove os registros do email antigo
            this.emailSet.delete(clienteAtual.email);
            this.emailMap.delete(clienteAtual.email);

        // Adiciona os registros com o email novo
        this.emailSet.add(dadosAtualizados.email!);
        }

        // Mescla os dados antigos com os novos
        const clienteEditado = {...clienteAtual,...dadosAtualizados};
        //salva na lista
        this.listaClientes[index] = clienteEditado;
        //atualiza a referencioa do map com o obejo atualizado
        this.emailMap.set(clienteEditado.email, clienteEditado);

        return clienteEditado;

    }

    async deletarCliente(id: string): Promise<boolean>{
        const index = this.listaClientes.findIndex(c => c.id === id);
        if(index === -1) return false;

        const cliente = this.listaClientes[index];

        this.listaClientes.splice(index, 1);
        this.emailSet.delete(cliente.email);
        this.emailMap.delete(cliente.email);

        return true;
    }
}