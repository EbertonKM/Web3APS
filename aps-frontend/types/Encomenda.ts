export interface Encomenda {
    id?: number;
    origem: string;
    destino: string;
    dataEmissao?: string;
    entregue?: boolean;
    observacoes?: string | null;
    entregadorId: number | null;
}