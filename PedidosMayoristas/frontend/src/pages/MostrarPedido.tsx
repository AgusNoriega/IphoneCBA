import { useEffect, useState } from "react";
import PedidoCard from "./PedidoCard";
import type { Pedido } from "../types/pedidos";
import { fetchPedidos, completarPedido, eliminarPedido } from "../api/pedidos";

export default function MostrarPedido() {
  const [busqueda, setBusqueda] = useState("");
  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState<"pendiente" | "completado" | "todos">(
    "pendiente"
  );

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 20;

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [total, setTotal] = useState(0);

  const cargarPedidos = async () => {
    try {
      setCargando(true);
      const resp = await fetchPedidos({
        q: busqueda.trim() || undefined,
        fecha: fecha || undefined,
        estado,
        page,
        pageSize,
      });
      setPedidos(resp.data);
      setTotal(resp.total);
    } catch (e: any) {
      setError(e.message ?? "Error");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, [busqueda, fecha, estado, page]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  async function handleCompletar(id: number) {
    try {
      if (!window.confirm("¿Confirmar completar pedido?")) return;
      await completarPedido(id);
      await cargarPedidos();
    } catch (err: any) {
      alert("❌ " + err.message);
    }
  }

  async function handleEliminar(id: number) {
    try {
      if (!window.confirm("¿Eliminar este pedido?")) return;
      await eliminarPedido(id);
      await cargarPedidos();
    } catch (err: any) {
      alert("❌ " + err.message);
    }
  }

  return (
    <div className="card mostrar-pedidos">
      <div className="filtros">
        <input
          className="input"
          placeholder="Buscar por IMEI, cliente o N° pedido..."
          value={busqueda}
          onChange={(e) => {
            setPage(1);
            setBusqueda(e.target.value);
          }}
        />
        <input
          type="date"
          className="input input-date"
          value={fecha}
          onChange={(e) => {
            setPage(1);
            setFecha(e.target.value);
          }}
        />
        <button
          className="btn btn-date"
          onClick={() => {
            setPage(1);
            setFecha("");
            setBusqueda("");
          }}
        >
          Limpiar
        </button>
      </div>

      <div className="estado-tabs">
        <button
          className={`tab ${estado === "pendiente" ? "active" : ""}`}
          onClick={() => {
            setEstado("pendiente");
            setPage(1);
          }}
        >
          Pendientes
        </button>
        <button
          className={`tab ${estado === "completado" ? "active" : ""}`}
          onClick={() => {
            setEstado("completado");
            setPage(1);
          }}
        >
          Completados
        </button>
        <button
          className={`tab ${estado === "todos" ? "active" : ""}`}
          onClick={() => {
            setEstado("todos");
            setPage(1);
          }}
        >
          Todos
        </button>
      </div>

      {cargando && <p style={{ textAlign: "center" }}>Cargando...</p>}
      {error && (
        <p style={{ color: "crimson", textAlign: "center" }}>{error}</p>
      )}

      <div className="lista-pedidos">
        {pedidos.map((p) => (
          <PedidoCard
            key={p.NdPedido}
            pedido={p}
            onCompletar={handleCompletar}
            onEliminar={handleEliminar}
          />
        ))}
        {!cargando && !error && pedidos.length === 0 && (
          <p style={{ textAlign: "center", marginTop: 20 }}>
            No hay pedidos que coincidan.
          </p>
        )}
      </div>

      <div className="pager">
        <button
          className="btn-nav"
          disabled={page <= 1}
          onClick={() => setPage((x) => x - 1)}
        >
          Anterior
        </button>

        <span className="page-indicator">
          Página {page} / {totalPages}
        </span>

        <button
          className="btn-nav"
          disabled={page >= totalPages}
          onClick={() => setPage((x) => x + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
