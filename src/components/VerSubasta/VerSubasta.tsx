import { useState } from "react";
import "./VerSubasta.css";
import Pujas, { type Puja } from "./Pujas/Pujas";
import LibroPujas from "./LibroPujas/LibroPujas";
import type { SubastaI } from "./DetallesVerSubasta/DetallesVerSubasta";
import DetallesVerSubasta from "./DetallesVerSubasta/DetallesVerSubasta";

export default function VerSubasta() {
  const [subasta, setSubasta] = useState<SubastaI>({
    nombre: "Laptop Gamer de Alta Gama",
    descripcion: "Laptop con procesador i9, 32GB RAM, RTX 4080, 1TB SSD",
    imagen: "https://picsum.photos/800/600",
    precio: 1500,
    base: 1000,
    duracion: 72,
    incremento: 50,
    precio_reserva: 1200,
    tipo_subasta: "Tecnología",
    estado: "Active",
    fecha_inicio: "2023-05-15T10:00:00",
    fecha_fin: "2023-05-18T10:00:00",
  });

  const [pujasData, setPujasData] = useState<Puja[]>([]);

  return (
    <div className="ver-subasta-container">
      <div className="ver-subasta-header">
        <h2 className="ver-subasta-titulo">{subasta.nombre}</h2>
        <span
          className="ver-subasta-estado-badge"
          style={{
            backgroundColor: getEstadoColor(subasta.estado),
            color: getEstadoTextColor(subasta.estado),
          }}
        >
          {subasta.estado}
        </span>
      </div>

      <div className="ver-subasta-content">
        <div className="ver-subasta-left-panel">
          <DetallesVerSubasta subasta={subasta} />
          {subasta.estado === "Active" && (
            <Pujas
              precioActual={subasta.precio}
              incrementoMinimo={subasta.incremento}
            />
          )}
        </div>

        <div className="ver-subasta-right-panel">
          <LibroPujas pujasData={pujasData} setPujasData={setPujasData} />
        </div>
      </div>
    </div>
  );
}

function getEstadoColor(estado: string): string {
  switch (estado) {
    case "Active":
      return "#4CAF50";
    case "Pending":
      return "#FFC107";
    case "Ended":
      return "#2196F3";
    case "Cancelled":
      return "#F44336";
    case "Deserted":
      return "#9E9E9E";
    case "Completed":
      return "#673AB7";
    default:
      return "#000";
  }
}

function getEstadoTextColor(estado: string): string {
  return estado === "Pending" ? "#000" : "#fff";
}
