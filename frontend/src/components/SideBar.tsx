import { useState, useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
};

export const SideBar = ({ open, onClose, onLogout }: Props) => {
  // acordeón minimal: una sola sección "Cuenta"
  const [expanded, setExpanded] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // cerrar con ESC
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  // altura animada del acordeón
  const contentStyle = {
    maxHeight: expanded ? `${contentRef.current?.scrollHeight ?? 0}px` : "0px",
    opacity: expanded ? 1 : 0,
  };

  return (
    <>
      <div className={`sb-overlay ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`sb-panel ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="sb-header">
          <h3>Menú</h3>
          <button className="sb-close" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className="sb-content">
          <div
            className="acc-content"
            ref={contentRef}
            style={contentStyle as React.CSSProperties}
          >
            <button className="btn btn-danger" onClick={onLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
