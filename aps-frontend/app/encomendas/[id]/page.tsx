import { getEncomenda } from "@/lib/encomendasAPI";
import { getEntregador } from "@/lib/entregadoresAPI";
import { Encomenda } from "@/types/Encomenda";
import { Entregador } from "@/types/Entregador";

interface Props {
    params:
    { id: string; };
}

export default async function EncomendaDetalhe({ params }: Props) {
    const res = await getEncomenda(Number(params.id));
    const encomenda: Encomenda = res.data;
    const entregador: Entregador | null = encomenda.entregadorId !== null
        ? (await getEntregador(encomenda.entregadorId)).data
        : null;

    return (
        <div className="detalhe-page">
            <h1>Detalhes da Encomenda</h1>
            <p>ID: {encomenda.id}</p>
            <p>Origem: {encomenda.origem}</p>
            <p>Destino: {encomenda.destino}</p>
            {entregador != null &&
                <div>
                    <p>Entregador: {entregador?.nome}</p>
                    <p>Contato do entregador: {entregador?.telefone}</p>
               </div>}
        </div>
    );
}
