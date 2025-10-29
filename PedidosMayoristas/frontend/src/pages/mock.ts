// Tipos
export type Detalle = {
  IMEI: string;
  PrecioUnitario: number;
  Producto?: { Equipos?: { Nombre?: string } | null } | null;
};
export type Pedido = {
  NdPedido: number;
  Fecha: string; // ISO
  Clientes?: { Nombre?: string } | null;
  Formas_de_Pago?: { Nombre?: string } | null;
  Estados_Pedidos_Mayoristas?: { Nombre?: string } | null;
  Pedidos_Mayoristas_Detalle: Detalle[];
};

// Mock
export const pedidosMock: Pedido[] = [
  {
    NdPedido: 12001,
    Fecha: new Date().toISOString(),
    Clientes: { Nombre: "Carlos - CellSat S.A." },
    Formas_de_Pago: { Nombre: "Transferencia" },
    Estados_Pedidos_Mayoristas: { Nombre: "Pendiente" },
    Pedidos_Mayoristas_Detalle: [
      { IMEI: "123456789012345", PrecioUnitario: 800,  Producto: { Equipos: { Nombre: "iPhone 16" } } },
      { IMEI: "423589000111222", PrecioUnitario: 850,  Producto: { Equipos: { Nombre: "iPhone 16" } } },
      { IMEI: "423523999000888", PrecioUnitario: 780,  Producto: { Equipos: { Nombre: "iPhone 14" } } },
    ],
  },
  {
    NdPedido: 12000,
    Fecha: new Date(Date.now() - 86400000).toISOString(),
    Clientes: { Nombre: "Gaston - Iphone S.A." },
    Formas_de_Pago: { Nombre: "Efectivo" },
    Estados_Pedidos_Mayoristas: { Nombre: "Confirmado" },
    Pedidos_Mayoristas_Detalle: [
      { IMEI: "555666777888999", PrecioUnitario: 700, Producto: { Equipos: { Nombre: "iPhone 13" } } },
      { IMEI: "111222333444555", PrecioUnitario: 950, Producto: { Equipos: { Nombre: "iPhone 16 Pro" } } },
    ],
  },
];
