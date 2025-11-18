// src/components/SearchFilters.tsx
export type Condicion = "nuevo" | "usado";

export interface FiltersState {
  condicion: Condicion;
  color: string;
  imeiModelo: string;
  fecha: string;
  grado: string;
  formaPago: string;
}

interface Props {
  filters: FiltersState;
  onChange: (next: FiltersState) => void;
}

const SearchFilters: React.FC<Props> = ({ filters, onChange }) => {
  const handleChange = (field: keyof FiltersState, value: string) => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <section className="filters-card">
      <div className="filters-header">
        <span className="filters-title">Filtros de Búsqueda</span>
      </div>

      <div className="filters-body">
        {/* ==== COLUMNA IZQUIERDA ==== */}
        <div className="filters-col-left">
          {/* Nuevo + Colores */}
          <div className="filters-left-group">
            <label className="radio-label">
              <input
                type="radio"
                name="condicion"
                value="nuevo"
                checked={filters.condicion === "nuevo"}
                onChange={(e) => handleChange("condicion", e.target.value)}
              />
              <span>Nuevo</span>
            </label>

            <div className="filters-field">
              <label>Colores:</label>
              <select
                value={filters.color}
                onChange={(e) => handleChange("color", e.target.value)}
              >
                <option value="">Todos</option>
                <option value="negro">Negro</option>
                <option value="blanco">Blanco</option>
                <option value="azul">Azul</option>
                <option value="rojo">Rojo</option>
              </select>
            </div>
          </div>

          {/* Usado + Grado */}
          <div className="filters-left-group">
            <label className="radio-label">
              <input
                type="radio"
                name="condicion"
                value="usado"
                checked={filters.condicion === "usado"}
                onChange={(e) => handleChange("condicion", e.target.value)}
              />
              <span>Usado</span>
            </label>

            <div className="filters-field">
              <label>Grado:</label>
              <select
                value={filters.grado}
                onChange={(e) => handleChange("grado", e.target.value)}
              >
                <option value="">Todos</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>
        </div>

        {/* ==== COLUMNA DERECHA ==== */}
        <div className="filters-col-right">
          <div className="filters-grid-right">
            {/* IMEI / Modelo ocupa todo el ancho */}
            <div className="filters-field imei-field">
              <label>IMEI / Modelo...</label>
              <div className="pill-input">
                <input
                  type="text"
                  placeholder="IMEI / Modelo..."
                  value={filters.imeiModelo}
                  onChange={(e) => handleChange("imeiModelo", e.target.value)}
                />
              </div>
            </div>

            {/* Fecha a la derecha */}
            <div className="filters-field fecha-field">
              <label>Fecha:</label>
              <div className="pill-input pill-input-sm">
                <input
                  type="date"
                  value={filters.fecha}
                  onChange={(e) => handleChange("fecha", e.target.value)}
                />
              </div>
            </div>

            {/* Forma de pago debajo de Fecha */}
            <div className="filters-field forma-pago-field">
              <label>Forma de pago:</label>
              <select
                value={filters.formaPago}
                onChange={(e) => handleChange("formaPago", e.target.value)}
              >
                <option value="">Todas</option>
                <option value="efectivo">Efectivo</option>
                <option value="debito">Débito</option>
                <option value="credito">Crédito</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilters;
