// src/App.tsx
import { useState } from "react";
import "./App.css";
import { TopBar } from "./components/TopBar";
import { SideBar } from "./components/SideBar";

import MostrarPedido from "./pages/MostrarPedido";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TopBar onUserClick={() => setOpen(true)} />

      <div className="page">
        <MostrarPedido />
      </div>

      <SideBar
        open={open}
        onClose={() => setOpen(false)}
        onLogout={() => alert("Sesión cerrada")}
      />
    </>
  );
}
