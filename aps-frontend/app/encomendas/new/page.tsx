'use client'
import { createEncomenda, getEncomendas } from "@/lib/encomendasAPI";
import { getEntregadores } from "@/lib/entregadoresAPI";
import { createRastreamento } from "@/lib/rastreamento-statusAPI";
import { Encomenda } from "@/types/Encomenda";
import { Entregador } from "@/types/Entregador";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"

export default function Entregas() {
    const router = useRouter()
    const [form, setForm] = useState<Encomenda>({origem: '', destino: '', entregadorId: 0 })
    const [entregadores, setEntregadores] = useState<Entregador[]>([])

    const carregarEntregadores = async () => {
        const res = await getEntregadores()
        setEntregadores(res.data)
    }

    useEffect(() => {
        carregarEntregadores()
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({ ...form, entregadorId: parseInt(e.target.value) || 0 })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createEncomenda(form);
        //Uma das minhas maiores gambiarras
        const encomendasGet = await getEncomendas()
        const encomendas = encomendasGet.data
        const ultimaEncomenda = encomendas[encomendas.length - 1]
        const rastreamento = {
            localizacao: form.origem,
            status: 'Em preparo',
            encomendaId: ultimaEncomenda.id?? 0
        };
        await createRastreamento(rastreamento);
        router.push('/encomendas');
    };

    return (
        <div className="add-page">
            <h1>Nova encomenda</h1>
            <form onSubmit={handleSubmit}>
                <input name="origem" placeholder="Origem" onChange={handleChange} required />
                <input name="destino" placeholder="Destino" onChange={handleChange} required />
                <label htmlFor="entregadorId">Entregador:</label>
                <select name="entregadorId" value={form.entregadorId ?? ""} onChange={handleSelectChange}>
                    <option value="">Selecione um entregador</option>
                    {entregadores.map((a) => (
                        <option key={a.id} value={a.id}>{a.nome}</option>
                    ))}
                </select>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}