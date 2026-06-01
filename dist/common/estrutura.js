"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PilhaHistorico = exports.AuditoriaQueue = void 0;
class AuditoriaQueue {
    itens = [];
    enqueue(evento) {
        this.itens.push(evento);
    }
    dequeue() {
        return this.itens.shift();
    }
    hasItems() {
        return this.itens.length > 0;
    }
}
exports.AuditoriaQueue = AuditoriaQueue;
class PilhaHistorico {
    itens = [];
    LIMITE = 10;
    push(acao) {
        if (this.itens.length >= this.LIMITE) {
            this.itens.shift();
        }
        this.itens.push(acao);
    }
    getHistorico() {
        return [...this.itens].reverse();
    }
}
exports.PilhaHistorico = PilhaHistorico;
//# sourceMappingURL=estrutura.js.map