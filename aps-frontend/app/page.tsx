'use client'
import { getEncomendas } from "@/lib/encomendasAPI";
import { getEntregadores } from "@/lib/entregadoresAPI";
import { getRastreamentos } from "@/lib/rastreamento-statusAPI";
import { Encomenda } from "@/types/Encomenda";
import { Entregador } from "@/types/Entregador";
import { RastreamentoStatus } from "@/types/RastreamentoStatus";
import React, { useEffect, useState } from "react"

export default function Home() {
    const [encomendas, setEncomendas] = useState<Encomenda[]>([])
    const [entregadores, setEntregadores] = useState<Entregador[]>([])
    const [rastreamentoStatus, RastreamentoStatus] = useState<RastreamentoStatus[]>([])

    const carregarEncomendas = async () => {
        const res = await getEncomendas()
        setEncomendas(res.data)
    }
    const carregarEntregadores = async () => {
        const res = await getEntregadores()
        setEntregadores(res.data)
    }
    const carregarRastreamentos = async () => {
        const res = await getRastreamentos()
        RastreamentoStatus(res.data)
    }

    useEffect(() => {
        carregarEncomendas()
        carregarEntregadores()
        carregarRastreamentos()
    }, []);
    
    return(
        <div className="main-text">
            Bem vindo ao site de entregas! <br />
        </div>
    );
}