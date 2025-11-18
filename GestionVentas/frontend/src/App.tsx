// src/App.tsx
import { useState } from "react";
import "./App.css";

import { TopBar } from "./components/TopBar";
import { SideBar } from "./components/SideBar";

import SearchFilters from "./components/SearchFilters";
import type { FiltersState } from "./components/SearchFilters";
import ResultsTable from "./components/ResultsTable";

function App() {
  const [filters, setFilters] = useState<FiltersState>({
    condicion: "nuevo",
    color: "",
    imeiModelo: "",
    fecha: "",
    grado: "",
    formaPago: "",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleUserClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    // Acá después enganchás tu lógica real de logout
    console.log("Cerrar sesión");
    setSidebarOpen(false);
  };

  return (
    <div className="app-root">
      <TopBar onUserClick={handleUserClick} />

      <SideBar
        open={sidebarOpen}
        onClose={handleCloseSidebar}
        onLogout={handleLogout}
      />

      <div className="app-layout">
        <main className="app-main">
          <SearchFilters filters={filters} onChange={setFilters} />

          <div className="actions-row">
            <button className="btn-primary">Buscar</button>

            <button className="btn-primary btn-outline">
              Devolver productos al stock
            </button>
          </div>

          <ResultsTable />
        </main>
      </div>
    </div>
  );
}

export default App;
