import { useState, useEffect } from "react";
import "./Pujas.css";

export interface Puja {
  id: number;
  usuario: string;
  monto: number;
  fecha: string;
  automatica: boolean;
}
interface PujasProps {
  precioActual: number;
  incrementoMinimo: number;
}

export default function Pujas({ precioActual, incrementoMinimo }: PujasProps) {
  const [pujaManual, setPujaManual] = useState<boolean>(true);
  const [pujaAutomatica, setPujaAutomatica] = useState<boolean>(false);
  const [montoPuja, setMontoPuja] = useState<number>(
    precioActual + incrementoMinimo
  );
  const [montoMaximo, setMontoMaximo] = useState<number>(0);
  const [incrementoAuto, setIncrementoAuto] =
    useState<number>(incrementoMinimo);

  useEffect(() => {
    // Simulación de envío de puja
    try {
      /*
      if (pujaManual) {
        // Lógica para puja manual
        const response = await fetch('/api/pujas/manual', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            monto: montoPuja,
            subastaId: '123', // ID de la subasta vendría de props
            usuarioId: '456' // ID del usuario de la sesión
          })
        });
        
        if (!response.ok) throw new Error('Error en la puja manual');
        
        const data = await response.json();
        console.log('Puja manual exitosa:', data);
      } else if (pujaAutomatica) {
        // Lógica para puja automática
        const response = await fetch('/api/pujas/automatica', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            montoMaximo: montoMaximo,
            incremento: incrementoAuto,
            subastaId: '123', // ID de la subasta vendría de props
            usuarioId: '456' // ID del usuario de la sesión
          })
        });
        
        if (!response.ok) throw new Error('Error en la puja automática');
        
        const data = await response.json();
        console.log('Puja automática configurada:', data);
      }
      */
    } catch (error) {
      console.error("Error al procesar la puja:", error);
    }
  }, [pujaManual, pujaAutomatica, montoPuja, montoMaximo, incrementoAuto]);

  const handleTogglePuja = (type: "manual" | "automatica") => {
    if (type === "manual") {
      setPujaManual(true);
      setPujaAutomatica(false);
    } else {
      setPujaManual(false);
      setPujaAutomatica(true);
    }
  };

  return (
    <div className="pujas-subasta-container">
      <h3 className="pujas-subasta-titulo">Realizar una puja</h3>

      <div className="pujas-subasta-toggle">
        <button
          className={`pujas-subasta-toggle-btn ${
            pujaManual ? "pujas-subasta-toggle-active" : ""
          }`}
          onClick={() => handleTogglePuja("manual")}
        >
          Puja Manual
        </button>
        <button
          className={`pujas-subasta-toggle-btn ${
            pujaAutomatica ? "pujas-subasta-toggle-active" : ""
          }`}
          onClick={() => handleTogglePuja("automatica")}
        >
          Puja Automática
        </button>
      </div>

      {pujaManual && (
        <div className="pujas-subasta-form">
          <div className="pujas-subasta-form-group">
            <label htmlFor="monto-puja" className="pujas-subasta-label">
              Monto de la puja
            </label>
            <div className="pujas-subasta-input-group">
              <span className="pujas-subasta-input-prefix">$</span>
              <input
                type="number"
                id="monto-puja"
                className="pujas-subasta-input"
                value={montoPuja}
                onChange={(e) => setMontoPuja(Number(e.target.value))}
                min={precioActual + incrementoMinimo}
                step={incrementoMinimo}
              />
            </div>
            <p className="pujas-subasta-hint">
              El monto mínimo es {precioActual + incrementoMinimo} (precio
              actual + incremento mínimo)
            </p>
          </div>
          <button className="pujas-subasta-submit-btn">Ofertar</button>
        </div>
      )}

      {pujaAutomatica && (
        <div className="pujas-subasta-form">
          <div className="pujas-subasta-form-group">
            <label htmlFor="monto-maximo" className="pujas-subasta-label">
              Monto máximo
            </label>
            <div className="pujas-subasta-input-group">
              <span className="pujas-subasta-input-prefix">$</span>
              <input
                type="number"
                id="monto-maximo"
                className="pujas-subasta-input"
                value={montoMaximo}
                onChange={(e) => setMontoMaximo(Number(e.target.value))}
                min={precioActual + incrementoMinimo}
              />
            </div>
          </div>
          <div className="pujas-subasta-form-group">
            <label htmlFor="incremento-auto" className="pujas-subasta-label">
              Incremento
            </label>
            <div className="pujas-subasta-input-group">
              <span className="pujas-subasta-input-prefix">$</span>
              <input
                type="number"
                id="incremento-auto"
                className="pujas-subasta-input"
                value={incrementoAuto}
                onChange={(e) => setIncrementoAuto(Number(e.target.value))}
                min={incrementoMinimo}
              />
            </div>
            <p className="pujas-subasta-hint">
              El incremento mínimo es {incrementoMinimo}
            </p>
          </div>
          <button className="pujas-subasta-submit-btn">
            Configurar Puja Automática
          </button>
        </div>
      )}
    </div>
  );
}
