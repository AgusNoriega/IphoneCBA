import Swal from "sweetalert2";
import { useEffect, useState } from "react";

type Opcion = { id: number; nombre: string };

export const CargarVenta = () => {
  const [fecha, setFecha] = useState("");
  const [imei, setImei] = useState("");
  const [precio, setPrecio] = useState("");
  const [notas, setNotas] = useState("");

  const [formasPago, setFormasPago] = useState<Opcion[]>([]);
  const [tiposVenta, setTiposVenta] = useState<Opcion[]>([]);
  const [idFormaPago, setIdFormaPago] = useState<number | null>(null);
  const [idTipoVenta, setIdTipoVenta] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function cargarCatalogos() {
      try {
        const [fpRes, tvRes] = await Promise.all([
          fetch("http://localhost:3000/catalogos/formas-pago"),
          fetch("http://localhost:3000/catalogos/tipos-venta"),
        ]);
        const fpJson = await fpRes.json();
        const tvJson = await tvRes.json();

        const fp: Opcion[] = fpJson.map((x: any) => ({
          id: x.IdFormasdepago,
          nombre: x.Nombre,
        }));
        const tv: Opcion[] = tvJson.map((x: any) => ({
          id: x.idIdTipodeventa,
          nombre: x.Nombre,
        }));

        setFormasPago(fp);
        setTiposVenta(tv);

        // seleccionar defaults si existen
        if (fp.length > 0) setIdFormaPago(fp[0].id);
        if (tv.length > 0) setIdTipoVenta(tv[0].id);
      } catch (e) {
        console.error("Error cargando catálogos", e);
        alert("No se pudieron cargar los catálogos");
      }
    }
    cargarCatalogos();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fecha)
      return Swal.fire({
        icon: "error",
        title: "No se pudo registrar la venta",
        text: "Seleccione una fecha valida",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#dc3545",
      });
    if (!imei || imei.length < 10) return alert("IMEI inválido");
    const p = Number(precio);
    if (!p || p <= 0)
      return Swal.fire({
        icon: "error",
        title: "No se pudo registrar la venta",
        text: "Ingrese el precio de la venta",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#dc3545",
      });
    if (!idFormaPago) return alert("Seleccioná una forma de pago");
    if (!idTipoVenta) return alert("Seleccioná un tipo de venta");

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imeis: [imei],
          idFormaPago,
          idTipoVenta,
          precio: p,
          notas,
          // podés enviar fecha si el backend la quiere tomar:
          // fecha,
        }),
      });
      if (!response.ok) {
        const t = await response.text();
        throw new Error(t || "Error al registrar la venta");
      }
      const data = await response.json();
      Swal.fire({
        title: "✅ Venta registrada con éxito",
        html: `
    <div style="font-size: 15px; color:#333; margin-top: 6px;">
      El producto con IMEI <b>${imei}</b> fue marcado como <b>vendido</b>.
    </div>
  `,
        icon: "success",
        iconColor: "#4a7df5",
        background: "#fff",
        color: "#111",
        confirmButtonText: "Listo",
        confirmButtonColor: "#4a7df5",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });

      // limpiar
      setFecha("");
      setImei("");
      setPrecio("");
      setNotas("");
      // mantener selección de combos, si querés no los resetees
    } catch (err: any) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "No se pudo registrar la venta",
        text: err.message?.includes("IMEI")
          ? err.message
          : "Verificá que el IMEI no esté ya vendido o que exista en la base de datos.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setLoading(false);
    }
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
              value={idFormaPago ?? ""}
              onChange={(e) => setIdFormaPago(parseInt(e.target.value))}
            >
              {formasPago.map((op) => (
                <option key={op.id} value={op.id}>
                  {op.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="tipo">Tipo de Venta</label>
            <select
              id="tipo"
              className="select"
              value={idTipoVenta ?? ""}
              onChange={(e) => setIdTipoVenta(parseInt(e.target.value))}
            >
              {tiposVenta.map((op) => (
                <option key={op.id} value={op.id}>
                  {op.nombre}
                </option>
              ))}
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
            <button
              className="btn"
              type="submit"
              disabled={loading || !idFormaPago || !idTipoVenta}
            >
              {loading ? "Guardando..." : "Cargar Venta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
