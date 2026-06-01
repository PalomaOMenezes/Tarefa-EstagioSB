export interface EventoAuditoria {
    acao: string;
    clienteId: string;
    timestamp: Date;
  }

  // Fila Queue
  
  export class AuditoriaQueue {
    private itens: EventoAuditoria[] = [];
  
    // enqueue = enfileirar, push diciona un novo elemento ao final da fila
    enqueue(evento: EventoAuditoria): void {
      this.itens.push(evento);
    }
  
    // Remove e retorna o primeiro da fila, cria o conportamento FIFO
    dequeue(): EventoAuditoria | undefined {
      return this.itens.shift();
    }
  
    // Verifica se há itens na fila
    hasItems(): boolean {
      return this.itens.length > 0;
    }
  }

  // Pilha historico LIFO

  export class PilhaHistorico {

    //cria a pilha
    private itens: string[] = [];
    private readonly LIMITE = 10; // Histórico das últimas 10 ações
  
    // Adiciona no topo da pilha
    push(acao: string): void {
      if (this.itens.length >= this.LIMITE) {
        // Remove a ação mais antiga se estourar o limite
        this.itens.shift(); 
      }
      this.itens.push(acao);
    }
  
    // Retorna o histórico invertido
    getHistorico(): string[] {
      return [...this.itens].reverse();
    }
  }


