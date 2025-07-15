import axios from "axios";
import { Entregador } from "@/types/Entregador";

const api = axios.create({
  baseURL: "http://localhost:3000/entregadores",
});

export const getEntregadores = () => api.get<Entregador[]>("/");
export const getEntregador = (id: number) => api.get<Entregador>(`/${id}`);
export const createEntregador = (data: Entregador) => api.post("/", data);
export const updateEntregador = (id: number, data: Partial<Entregador>) => api.patch(`/${id}`, data);
export const deleteEntregador = (id: number) => api.delete(`/${id}`);