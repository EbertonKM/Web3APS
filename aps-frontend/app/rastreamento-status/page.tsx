'use client'
import { getRastreamentos } from "@/lib/rastreamento-statusAPI";
import { RastreamentoStatus } from "@/types/RastreamentoStatus";
import React, { useEffect, useState } from "react"

export default function Rastreamentos() {
    const [rastreamentoStatus, RastreamentoStatus] = useState<RastreamentoStatus[]>([])

    const carregarRastreamentos = async () => {
        const res = await getRastreamentos()
        RastreamentoStatus(res.data)
    }

    useEffect(() => {
        carregarRastreamentos()
    }, []);

    //Função feita pelo Chat GPT pra formata a data
    function formatDateTime(isoString: string): string {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }


    return (
        <div className="list-page">
            <h1 className="list-title">Lista dos rastreamentos:</h1>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Encomenda</th>
                        <th>Localização</th>
                        <th>Status</th>
                        <th>Data de registro</th>
                    </tr>
                </thead>
                <tbody>
                    {/* slice e sort para deixar os itens na ordem decrescente, solução pelo Chat GPT */}
                    {rastreamentoStatus.slice().sort((a, b) => {
                        if (b.id === undefined) return -1;
                        if (a.id === undefined) return 1;
                        return b.id - a.id;
                    }).map((a) =>
                        <tr key={a.id}>
                            <td>{a.id}</td>
                            <td>{a.encomendaId}</td>
                            <td>{a.localizacao}</td>
                            <td>{a.status}</td>
                            <td>{formatDateTime(a.dataRegistro?? "")}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}