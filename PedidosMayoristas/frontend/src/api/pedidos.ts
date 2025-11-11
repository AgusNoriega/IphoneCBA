import type { Pedido, PedidosResponse } from "../types/pedidos";

const BASE_URL = "http://localhost:3001";

export async function fetchPedidos(params: {
  q?: string;
  fecha?: string; // YYYY-MM-DD
  estado?: "pendiente" | "completado" | "todos";
  page?: number;
  pageSize?: number;
}): Promise<PedidosResponse> {
  const usp = new URLSearchParams();
  if (params.q) usp.set("q", params.q);
  if (params.fecha) usp.set("fecha", params.fecha);
  if (params.estado) usp.set("estado", params.estado);
  if (params.page) usp.set("page", String(params.page));
  if (params.pageSize) usp.set("pageSize", String(params.pageSize));

  const res = await fetch(`${BASE_URL}/pedidos-mayoristas?${usp.toString()}`);
  if (!res.ok) throw new Error("Error al cargar pedidos");
  const json = await res.json();

  const data: Pedido[] = (json.data ?? []).map((p: any) => ({
    ...p,
    Fecha:
      typeof p.Fecha === "string" ? p.Fecha : new Date(p.Fecha).toISOString(),
  }));

  return { ...json, data };
}

export async function completarPedido(id: number) {
  const res = await fetch(`${BASE_URL}/pedidos-mayoristas/${id}/completar`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Error al completar pedido");
  return res.json();
}

export async function eliminarPedido(id: number) {
  const res = await fetch(`${BASE_URL}/pedidos-mayoristas/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar pedido");
  return res.json();
}

export type { Pedido };
