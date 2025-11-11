// src/types/pedidos.ts
export type PedidoDetalle = {
  IMEI: string;
  PrecioUnitario: number | string;
  Producto?: { Equipos?: { Nombre: string } | null } | null;
};

export type Pedido = {
  NdPedido: number;
  Fecha: string; // ISO string
  Clientes?: { Nombre: string } | null;
  Formas_de_Pago?: { Nombre: string } | null;
  Estados_Pedidos_Mayoristas?: { Nombre: string } | null;
  Pedidos_Mayoristas_Detalle: PedidoDetalle[];
};

export type PedidosResponse = {
  page: number;
  pageSize: number;
  total: number;
  data: Pedido[];
};
