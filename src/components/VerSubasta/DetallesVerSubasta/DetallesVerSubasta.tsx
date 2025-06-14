import "./DetallesVerSubasta.css";

export interface SubastaI {
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  base: number;
  duracion: number;
  incremento: number;
  precio_reserva: number;
  tipo_subasta: string;
  estado:
    | "Pending"
    | "Active"
    | "Ended"
    | "Cancelled"
    | "Deserted"
    | "Completed";
  fecha_inicio: string;
  fecha_fin: string;
}

interface DetallesVerSubastaProps {
  subasta: SubastaI;
}

export default function DetallesVerSubasta({
  subasta,
}: DetallesVerSubastaProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="detalles-subasta-container">
      <div className="detalles-subasta-imagen-container">
        <img
          src={subasta.imagen}
          alt={subasta.nombre}
          className="detalles-subasta-imagen"
        />
      </div>

      <div className="detalles-subasta-info">
        <h3 className="detalles-subasta-nombre">{subasta.nombre}</h3>
        <p className="detalles-subasta-descripcion">{subasta.descripcion}</p>

        <div className="detalles-subasta-meta">
          <div className="detalles-subasta-stat">
            <span className="detalles-subasta-stat-label">Precio actual:</span>
            <span className="detalles-subasta-stat-value detalles-subasta-precio-actual">
              {formatCurrency(subasta.precio)}
            </span>
          </div>

          <div className="detalles-subasta-stat">
            <span className="detalles-subasta-stat-label">Precio base:</span>
            <span className="detalles-subasta-stat-value">
              {formatCurrency(subasta.base)}
            </span>
          </div>

          <div className="detalles-subasta-stat">
            <span className="detalles-subasta-stat-label">
              Incremento mínimo:
            </span>
            <span className="detalles-subasta-stat-value">
              {formatCurrency(subasta.incremento)}
            </span>
          </div>

          <div className="detalles-subasta-stat">
            <span className="detalles-subasta-stat-label">
              Precio de reserva:
            </span>
            <span className="detalles-subasta-stat-value">
              {formatCurrency(subasta.precio_reserva)}
            </span>
          </div>

          <div className="detalles-subasta-stat">
            <span className="detalles-subasta-stat-label">Categoría:</span>
            <span className="detalles-subasta-stat-value">
              {subasta.tipo_subasta}
            </span>
          </div>

          <div className="detalles-subasta-stat">
            <span className="detalles-subasta-stat-label">Duración:</span>
            <span className="detalles-subasta-stat-value">
              {subasta.duracion} horas
            </span>
          </div>

          <div className="detalles-subasta-stat">
            <span className="detalles-subasta-stat-label">Inició:</span>
            <span className="detalles-subasta-stat-value">
              {new Date(subasta.fecha_inicio).toLocaleString()}
            </span>
          </div>

          <div className="detalles-subasta-stat">
            <span className="detalles-subasta-stat-label">Finaliza:</span>
            <span className="detalles-subasta-stat-value">
              {new Date(subasta.fecha_fin).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
