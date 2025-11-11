import "./App.css";
import { useState } from "react";
import { TopBar } from "./components/TopBar";
import { CargarVenta } from "./page/CargarVenta"; 
import { SideBar } from "./components/SideBar"; 

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
   
      <CargarVenta />
    </>
  );
}
