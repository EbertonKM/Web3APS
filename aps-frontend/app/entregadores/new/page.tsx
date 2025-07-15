'use client'
import { createEntregador } from "@/lib/entregadoresAPI";
import { Entregador } from "@/types/Entregador";
import { useRouter } from "next/navigation";
import React, { useState } from "react"

export default function Entregas() {
    const router = useRouter()
    const [form, setForm] = useState<Entregador>({nome: '', telefone: ''})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createEntregador(form);
        router.push('/entregadores');
    };
    
    return(
        <div className="add-page">
            <h1>Novo entregador</h1>
            <form onSubmit={handleSubmit}>
                <input name="nome" placeholder="Nome" onChange={handleChange} required/>
                <input name="telefone" placeholder="Telefone" onChange={handleChange} required/>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}