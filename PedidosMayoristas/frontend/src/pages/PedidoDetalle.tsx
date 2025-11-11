import type { Pedido } from "../types/pedidos";

export default function PedidoDetalle({
  pedido,
  open = true,
}: {
  pedido: Pedido;
  open?: boolean;
}) {
  if (!open) return null;

  return (
    <div className="pedido-detalle">
      <table className="tabla-detalle">
        <thead>
          <tr>
            <th>Equipo</th>
            <th>IMEI</th>
            <th style={{ textAlign: "right" }}>Precio</th>
          </tr>
        </thead>
        <tbody>
          {pedido.Pedidos_Mayoristas_Detalle.map((d) => (
            <tr key={d.IMEI}>
              <td>{d.Producto?.Equipos?.Nombre ?? "—"}</td>
              <td>{d.IMEI}</td>
              <td style={{ textAlign: "right" }}>
                {new Intl.NumberFormat("es-AR").format(
                  Number(d.PrecioUnitario ?? 0)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
