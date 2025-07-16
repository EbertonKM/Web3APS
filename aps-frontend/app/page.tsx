'use client'
import { getEncomendas } from "@/lib/encomendasAPI";
import { getEntregadores } from "@/lib/entregadoresAPI";
import { getRastreamentos } from "@/lib/rastreamento-statusAPI";
import { Encomenda } from "@/types/Encomenda";
import { Entregador } from "@/types/Entregador";
import { RastreamentoStatus } from "@/types/RastreamentoStatus";
import React, { useEffect, useState } from "react"

export default function Home() {
    return(
        <div className="main-text">
            Bem vindo ao site de entregas! <br />
        </div>
    );
}
