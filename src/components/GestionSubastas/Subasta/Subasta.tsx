import { useState } from "react";
import "./Subasta.css";
import { useNavigate } from "react-router-dom";
import FormButton from "../../Forms/FormButton/FormButton";
import SubastaModifyForm from "../SubastaModifyForm/SubastaModifyForm";

export type EstadoSubasta =
  | "Pending"
  | "Active"
  | "Ended"
  | "Cancelled"
  | "Deserted"
  | "Completed";

export interface SubastaI {
  id?: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  base: number;
  duracion: number;
  incremento: number;
  precio_reserva: number;
  tipo_subasta: string;
  estado: EstadoSubasta;
  isAdmin?: boolean;
}

export default function Subasta({
  id,
  nombre,
  descripcion,
  imagen,
  precio,
  base,
  duracion,
  incremento,
  precio_reserva,
  tipo_subasta,
  estado,
  isAdmin = false,
}: SubastaI) {
  const [modifyForm, setModifyForm] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const navigate = useNavigate();

  const getEstadoColor = () => {
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
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const deleteSubasta = () => {
    setDeleteMessage(true);
  };

  const confirmChanges = () => {
    setDeleteMessage(false);
  };

  const cancelChanges = () => {
    setDeleteMessage(false);
  };

  const handlePujarClick = () => {
    navigate(`/subastas/${id}`);
  };

  return (
    <>
      <div className="subasta-compact">
        <div className="subasta-header">
          <div className="subasta-image">
            <img src={imagen} alt={nombre} />
            <span
              className="estado-badge"
              style={{ backgroundColor: getEstadoColor() }}
            >
              {estado}
            </span>
          </div>
          <h3>{nombre}</h3>
        </div>

        <div className="subasta-body">
          <p className="descripcion">{descripcion}</p>
          <div className="price-info">
            <div className="price-current">
              <span>Puja actual:</span>
              <strong>{formatCurrency(precio)}</strong>
            </div>
            <div className="price-base">
              <span>Base:</span>
              <span>{formatCurrency(base)}</span>
            </div>
          </div>
          <div className="subasta-meta">
            <span className="category">{tipo_subasta}</span>
            <span className="duration">{duracion}h</span>
          </div>
        </div>

        <div className="edit-buttons">
          {isAdmin ? (
            <>
              <button
                className="edit-button"
                onClick={() => setModifyForm(true)}
              >
                Editar
              </button>
              <button className="d-button" onClick={deleteSubasta}>
                Delete
              </button>
            </>
          ) : (
            <button className="pujar-button" onClick={handlePujarClick}>
              Pujar
            </button>
          )}
        </div>
      </div>

      {modifyForm && (
        <SubastaModifyForm
          setModifyForm={setModifyForm}
          nombre={nombre}
          descripcion={descripcion}
          imagen={imagen}
          precio={precio}
          base={base}
          duracion={duracion}
          incremento={incremento}
          precio_reserva={precio_reserva}
          tipo_subasta={tipo_subasta}
          estado={estado}
        />
      )}

      {deleteMessage && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <h4>¿Confirmar eliminación?</h4>
            <p>¿Estás seguro de que deseas eliminar esta subasta?</p>
            <div className="confirmation-buttons">
              <FormButton text="Confirmar" handle={confirmChanges} />
              <FormButton text="Cancelar" handle={cancelChanges} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
