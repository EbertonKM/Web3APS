'use client'
import { deleteEntregador, getEntregadores } from "@/lib/entregadoresAPI";
import { Entregador } from "@/types/Entregador";
import React, { useEffect, useState } from "react"
import Link from "next/link";

export default function Entregadores() {
    const [entregadores, setEntregadores] = useState<Entregador[]>([])

    const carregarEntregadores = async () => {
        const res = await getEntregadores()
        setEntregadores(res.data)
    }

    useEffect(() => {
        carregarEntregadores()
    }, []);
    
    const handleDelete = async (id: number) => {
        if(confirm('Deseja remover o entregador ' + id + '?')) {
            await deleteEntregador(id);
            carregarEntregadores();
        }
    };

    return(
        <div className="list-page">
            <h1 className="list-title">Lista dos entregadores:</h1>
            <Link className="list-add" href={'/entregadores/new'}>Novo entregador</Link>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {entregadores.map((a) => 
                        <tr key={a.id}>
                            <td>{a.id}</td>
                            <td>{a.nome}</td>
                            <td>{a.telefone}</td>
                            <td><button onClick={() => {if (a.id !== undefined) handleDelete(a.id)}}>X</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}