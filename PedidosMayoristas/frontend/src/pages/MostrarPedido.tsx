import { useMemo, useState } from "react";
import PedidoCard from "./PedidoCard";
import { pedidosMock } from "./mock";
import type { Pedido } from "./mock";

export default function MostrarPedido() {
  const [busqueda, setBusqueda] = useState("");
  const [fecha, setFecha] = useState("");
  const pedidos: Pedido[] = pedidosMock;

  const lista = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    const f = fecha ? new Date(fecha).toDateString() : null;

    return pedidos.filter((p) => {
      const coincideTexto =
        (p.Clientes?.Nombre ?? "").toLowerCase().includes(q) ||
        String(p.NdPedido).includes(q) ||
        p.Pedidos_Mayoristas_Detalle.some((d) =>
          d.IMEI.toLowerCase().includes(q)
        );
      const coincideFecha = !f || new Date(p.Fecha).toDateString() === f;
      return coincideTexto && coincideFecha;
    });
  }, [busqueda, pedidos, fecha]);

  return (
    <div className="card mostrar-pedidos">
      <div className="filtros">
        <input
          className="input"
          placeholder=" Buscar por IMEI, cliente o N° pedido..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <input
          type="date"
          className="input"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <button className="btn-date" onClick={() => setFecha("")}>
          Limpiar
        </button>
      </div>

      <div className="lista-pedidos">
        {lista.map((p) => (
          <PedidoCard key={p.NdPedido} pedido={p} />
        ))}
        {lista.length === 0 && (
          <p style={{ textAlign: "center", marginTop: 20 }}>
            No hay pedidos que coincidan.
          </p>
        )}
      </div>
    </div>
  );
}
