'use client'
import { deleteEncomenda, getEncomendas } from "@/lib/encomendasAPI";
import { Encomenda } from "@/types/Encomenda";
import React, { useEffect, useState } from "react"
import Link from "next/link";

export default function Entregas() {
    const [encomendas, setEncomendas] = useState<Encomenda[]>([])

    const carregarEncomendas = async () => {
        const res = await getEncomendas()
        setEncomendas(res.data)
    }

    useEffect(() => {
        carregarEncomendas()
    }, []);
    
    const handleDelete = async (id: number) => {
        if(confirm('Deseja remover a encomenda ' + id + '?')) {
            await deleteEncomenda(id);
            carregarEncomendas();
        }
    };

    return(
        <div className="list-page">
            <h1 className="list-title">Lista das encomendas:</h1>
            <Link className="list-add" href={'/encomendas/new'}>Nova encomenda</Link>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Origem</th>
                        <th>Destino</th>
                        <th>Entregador</th>
                        <th>Analisar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {encomendas.map((a) => 
                        <tr key={a.id}>
                            <td>{a.id}</td>
                            <td>{a.origem}</td>
                            <td>{a.destino}</td>
                            <td>{a.entregadorId}</td>
                            <td><Link href={`/encomendas/${a.id}`}>+</Link></td>
                            <td><button onClick={() => {if (a.id !== undefined) handleDelete(a.id)}}>X</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}