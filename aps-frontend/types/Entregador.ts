export interface Entregador {
    id?: number;
    nome: string;
    telefone: string;
    ativo?: boolean;
    createdAt?: string | null;
}