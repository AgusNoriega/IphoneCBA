import type { Pedido } from "./mock";

export default function PedidoDetalle({
  pedido,
  open,
}: {
  pedido: Pedido;
  open: boolean;
}) {
  const total = pedido.Pedidos_Mayoristas_Detalle.reduce(
    (acc, it) => acc + Number(it.PrecioUnitario || 0),
    0
  );

  function eliminarPedido() {
    alert(`(UI) Eliminar pedido ${pedido.NdPedido}`);
  }
  function descontarStock() {
    alert(`(UI) Descontar stock del pedido ${pedido.NdPedido}`);
  }

  return (
    <div
      id={`pedido-${pedido.NdPedido}`}
      className={`pedido-detalle ${open ? "open" : ""}`}
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12 }}
      >
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Equipo</th>
                <th>IMEI</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {pedido.Pedidos_Mayoristas_Detalle.map((it) => (
                <tr key={it.IMEI}>
                  <td>{it.Producto?.Equipos?.Nombre ?? "-"}</td>
                  <td>{it.IMEI}</td>
                  <td>USD {Number(it.PrecioUnitario || 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="acciones" style={{ marginTop: 8 }}>
            <button className="btn-danger" onClick={eliminarPedido}>
              Eliminar pedido
            </button>
            <button className="btn" onClick={descontarStock}>
              Descontar del stock
            </button>
          </div>
        </div>

        <div className="resumen">
          <div>
            <b>Método de pago:</b> {pedido.Formas_de_Pago?.Nombre ?? "-"}
          </div>
          <div>
            <b>Estado:</b> {pedido.Estados_Pedidos_Mayoristas?.Nombre ?? "-"}
          </div>
          <hr />
          <div>
            <b>Total:</b> USD {total.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
