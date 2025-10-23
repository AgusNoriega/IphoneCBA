import "./App.css";
import { useState } from "react";
import { TopBar } from "./components/TopBar";
import { CargarVenta } from "./page/CargarVenta"; // tu ruta actual
import { SideBar } from "./components/SideBar"; // tu nombre de componente

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TopBar onUserClick={() => setOpen(true)} />
      <SideBar
        open={open}
        onClose={() => setOpen(false)}
        onLogout={() => alert("Sesión cerrada")}
      />
      {/* 👇 SIN wrappers: nada de .page ni .card acá */}
      <CargarVenta />
    </>
  );
}
