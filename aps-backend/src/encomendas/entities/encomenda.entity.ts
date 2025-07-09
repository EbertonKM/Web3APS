export class Encomenda {
    id: number;
    codRastreio: string;
    origem: string;
    destino: string;
    dataEmissao: Date; //Atribuido automaticamente na criação
    ultimaLocalizacao: string;
    entregue: boolean;
    //entregador: Entregador; Suponho que algo assim aconteça
    observacoes: string;
}