import { useState } from "react";
import "./GestionSubastas.css";
import Subasta from "./Subasta/Subasta";
import type { SubastaI } from "./Subasta/Subasta";
import SubastaModifyForm from "./SubastaModifyForm/SubastaModifyForm";

export default function GestionSubastas() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [subastasData] = useState<SubastaI[]>([
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
      estado: "Pending",
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
      estado: "Active",
    },
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
      estado: "Pending",
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
      estado: "Active",
    },
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
      estado: "Pending",
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
      estado: "Active",
    },
  ]);

  return (
    <div className="gestion-subastas-container">
      <div className="header-container">
        <h2>Subastas</h2>
        <button className="add-button" onClick={() => setShowAddForm(true)}>
          + Agregar Subasta
        </button>
      </div>

      <div className="subastas-grid">
        {subastasData.map((subasta) => (
          <Subasta key={subasta.id} {...subasta} isAdmin={true} />
        ))}
      </div>

      {showAddForm && (
        <SubastaModifyForm
          setModifyForm={setShowAddForm}
          nombre={""}
          descripcion={""}
          imagen={""}
          precio={0}
          base={0}
          duracion={0}
          incremento={0}
          precio_reserva={0}
          tipo_subasta={""}
          estado={"Pending"}
          isAddMode={true}
        />
      )}
    </div>
  );
}
