export class RastreamentoStatus {
    id: number
    localizacao: string
    status: string
    dataRegistro: Date
    encomendaId: number //ID da encomenda a qual o registro diz respeito
}
