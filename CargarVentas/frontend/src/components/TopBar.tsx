import React from "react";

export const TopBar: React.FC<{ onUserClick?: () => void }> = ({
  onUserClick,
}) => {
  const items = [
    "Cargar Ventas",
    "Ventas",
    "Stock",
    "Pedidos En Camino",
    "Pedidos Mayorista",
    "Estadísticas",
    "Objetivos",
    "Gestión de Usuarios",
    "Gestión de precios",
  ];

  return (
    <header className="topbar">
      <nav className="chips">
        {items.map((txt) => (
          <button key={txt} className="chip" type="button">
            {txt}
          </button>
        ))}
      </nav>

      <button className="user user-btn" onClick={onUserClick}>
        <span>👤</span>
        <span>Joaquín Linares</span>
      </button>
    </header>
  );
};
