export interface EventoAuditoria {
    acao: string;
    clienteId: string;
    timestamp: Date;
}
export declare class AuditoriaQueue {
    private itens;
    enqueue(evento: EventoAuditoria): void;
    dequeue(): EventoAuditoria | undefined;
    hasItems(): boolean;
}
export declare class PilhaHistorico {
    private itens;
    private readonly LIMITE;
    push(acao: string): void;
    getHistorico(): string[];
}
