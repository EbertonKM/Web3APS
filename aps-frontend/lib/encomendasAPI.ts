import axios from "axios";
import { Encomenda } from "@/types/Encomenda";

const api = axios.create({
  baseURL: "http://localhost:3000/encomendas",
});

export const getEncomendas = () => api.get<Encomenda[]>("/");
export const getEncomenda = (id: number) => api.get<Encomenda>(`/${id}`);
export const createEncomenda = (data: Encomenda) => api.post("/", data);
export const updateEncomenda = (id: number, data: Partial<Encomenda>) => api.patch(`/${id}`, data);
export const deleteEncomenda = (id: number) => api.delete(`/${id}`);