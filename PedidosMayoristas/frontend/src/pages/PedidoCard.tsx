import { useMemo, useState } from "react";
import PedidoDetalle from "./PedidoDetalle";
import type { Pedido } from "./mock";

export default function PedidoCard({ pedido }: { pedido: Pedido }) {
  const [open, setOpen] = useState(false);

  const total = useMemo(
    () =>
      pedido.Pedidos_Mayoristas_Detalle.reduce(
        (acc, it) => acc + Number(it.PrecioUnitario || 0),
        0
      ),
    [pedido.Pedidos_Mayoristas_Detalle]
  );

  return (
    <div className={`pedido-card ${open ? "is-open" : ""}`}>
      {/* header del acordeón */}
      <button
        className="pedido-header"
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`pedido-${pedido.NdPedido}`}
      >
        <span>
          <b>{pedido.Clientes?.Nombre ?? "Cliente"}</b>
          {" — "}
          {new Date(pedido.Fecha).toLocaleDateString()}
          {" — N° "}
          {pedido.NdPedido}
        </span>
        <span>
          USD {total.toFixed(2)} {open ? "▲" : "▼"}
        </span>
      </button>

      {/* detalle SIEMPRE montado; abre/cierra con CSS */}
      <PedidoDetalle pedido={pedido} open={open} />
    </div>
  );
}
