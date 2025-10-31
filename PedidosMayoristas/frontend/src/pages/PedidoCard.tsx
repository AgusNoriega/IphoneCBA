// src/pages/PedidoCard.tsx
import { useMemo, useState } from "react";
import PedidoDetalle from "./PedidoDetalle";
import type { Pedido } from "../types/pedidos";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  pedido: Pedido;
  onCompletar?: (id: number) => void;
  onEliminar?: (id: number) => void;
}

export default function PedidoCard({ pedido, onCompletar, onEliminar }: Props) {
  const [open, setOpen] = useState(false);

  const total = useMemo(
    () =>
      pedido.Pedidos_Mayoristas_Detalle.reduce(
        (acc, it) => acc + Number(it.PrecioUnitario || 0),
        0
      ),
    [pedido.Pedidos_Mayoristas_Detalle]
  );

  const fechaStr = new Date(pedido.Fecha).toLocaleDateString("es-AR");

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.25, ease: "easeInOut" } }}
      className={`pedido-card ${open ? "open" : ""}`}
    >
      {/* HEADER: solo Nº pedido, Razón social y Fecha */}
      <button
        className="pedido-header"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="pedido-header__row">
          <span className="pedido-header__title">
            Pedido #{pedido.NdPedido}
          </span>
          <span className="pedido-header__cliente">
            {pedido.Clientes?.Nombre ?? "—"}
          </span>
          <span className="pedido-header__date">{fechaStr}</span>
        </div>
      </button>

      {/* CONTENIDO: aparece solo cuando abre */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <PedidoDetalle pedido={pedido} />

            <div className="pedido-actions">
              <button
                className="btn"
                onClick={() => onCompletar?.(pedido.NdPedido)}
                title="Completar pedido"
              >
                Completar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onEliminar?.(pedido.NdPedido)}
                title="Eliminar pedido"
              >
                Eliminar
              </button>
            </div>

            <div className="pedido-total">
              <strong>Total: </strong>
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(total)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
