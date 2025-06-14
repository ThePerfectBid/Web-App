import { useState } from "react";
import "./ListaSubastas.css";
import Subasta, {
  type EstadoSubasta,
} from "../GestionSubastas/Subasta/Subasta";

export default function ListaSubastas() {
  const [subastas] = useState([
    {
      id: 1,
      nombre: "Reloj Vintage Rolex",
      descripcion: "Reloj de colección en excelente estado",
      imagen:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3",
      precio: 12500,
      base: 10000,
      duracion: 48,
      incremento: 500,
      precio_reserva: 15000,
      tipo_subasta: "Coleccionables",
      estado: "Active" as EstadoSubasta,
    },
    {
      id: 2,
      nombre: "Pintura Abstracta",
      descripcion: "Obra de arte contemporáneo, firmada por el artista",
      imagen:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3",
      precio: 8500,
      base: 7000,
      duracion: 72,
      incremento: 300,
      precio_reserva: 10000,
      tipo_subasta: "Arte",
      estado: "Active" as EstadoSubasta,
    },
  ]);

  return (
    <div className="gestion-subastas-container">
      <div className="header-container">
        <h2>Subastas Disponibles</h2>
      </div>

      <div className="subastas-grid">
        {subastas.map((subasta) => (
          <Subasta key={subasta.id} {...subasta} isAdmin={false} />
        ))}
      </div>
    </div>
  );
}
