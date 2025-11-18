interface RowData {
  fecha: string;
  imei: string;
  equipo: string;
  capacidad: string;
  color: string;
  bateria: string;
  grado: string;
  detalle: string;
  estado: string;
  formaPago: string;
  precioVenta: string;
  notas: string;
}

const mockData: RowData[] = [
  {
    fecha: "2025-11-18",
    imei: "356789123456789",
    equipo: "iPhone 13",
    capacidad: "128 GB",
    color: "Negro",
    bateria: "91%",
    grado: "A",
    detalle: "Sin detalles importantes",
    estado: "Vendido",
    formaPago: "Crédito",
    precioVenta: "$850.000",
    notas: "Cliente recurrente",
  },
  {
    fecha: "2025-11-17",
    imei: "354321987654321",
    equipo: "iPhone 11",
    capacidad: "64 GB",
    color: "Blanco",
    bateria: "85%",
    grado: "B",
    detalle: "Pequeños rayones",
    estado: "En stock",
    formaPago: "Efectivo",
    precioVenta: "$520.000",
    notas: "",
  },
];

const ResultsTable: React.FC = () => {
  return (
    <section className="table-wrapper">
      <div className="table-scroll">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>IMEI</th>
              <th>Equipo</th>
              <th>Capacidad</th>
              <th>Color</th>
              <th>Batería</th>
              <th>Grado</th>
              <th>Detalle</th>
              <th>Estado</th>
              <th>Forma De Pago</th>
              <th>Precio Venta</th>
              <th>Notas</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, i) => (
              <tr key={i}>
                <td>{row.fecha}</td>
                <td>{row.imei}</td>
                <td>{row.equipo}</td>
                <td>{row.capacidad}</td>
                <td>{row.color}</td>
                <td>{row.bateria}</td>
                <td>{row.grado}</td>
                <td>{row.detalle}</td>
                <td>{row.estado}</td>
                <td>{row.formaPago}</td>
                <td>{row.precioVenta}</td>
                <td>{row.notas}</td>
              </tr>
            ))}

            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={`empty-${i}`}>
                <td colSpan={12} className="empty-row"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ResultsTable;
