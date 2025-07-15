import axios from "axios";
import { RastreamentoStatus } from "@/types/RastreamentoStatus";

const api = axios.create({
  baseURL: "http://localhost:3000/rastreamento-status",
});

export const getRastreamentos = () => api.get<RastreamentoStatus[]>("/");
export const getRastreamentoByEncomenda = (encomendaId: number) => api.get<RastreamentoStatus[]>(`/?encomendaId=${encomendaId}`);
export const createRastreamento = (data: RastreamentoStatus) => api.post("/", data);
export const removeRastreamento = (id: number) => api.delete(`/${id}`);