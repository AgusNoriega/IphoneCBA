import { useState } from "react";

type FormaPago = "Efectivo" | "Transferencia" | "Tarjeta" | "Mercado Pago";

export const CargarVenta = () => {
  const [fecha, setFecha] = useState("");
  const [imei, setImei] = useState("");
  const [formaPago, setFormaPago] = useState<FormaPago>("Efectivo");
  const [precio, setPrecio] = useState("");
  const [notas, setNotas] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fecha) return alert("La fecha es obligatoria");
    if (!imei || imei.length < 10) return alert("IMEI inválido");
    const p = Number(precio);
    if (!p || p <= 0) return alert("Precio inválido");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("✅ Venta cargada (simulación)");
      setFecha("");
      setImei("");
      setFormaPago("Efectivo");
      setPrecio("");
      setNotas("");
    }, 400);
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Cargar La Venta</h2>

        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="fecha">Fecha</label>
            <input
              id="fecha"
              type="date"
              className="input"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="imei">IMEI</label>
            <input
              id="imei"
              className="input"
              placeholder="3567891045..."
              value={imei}
              onChange={(e) => setImei(e.target.value.trim())}
            />
          </div>

          <div className="field">
            <label htmlFor="pago">Forma de Pago</label>
            <select
              id="pago"
              className="select"
              value={formaPago}
              onChange={(e) => setFormaPago(e.target.value as FormaPago)}
            >
              <option>Efectivo</option>
              <option>Transferencia</option>
              <option>Tarjeta</option>
              <option>Mercado Pago</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="precio">Precio de Venta</label>
            <input
              id="precio"
              type="number"
              step="0.01"
              className="input"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="notas">Notas</label>
            <textarea
              id="notas"
              className="textarea"
              placeholder="Opcional"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
          </div>

          <div className="actions">
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Cargar Venta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
