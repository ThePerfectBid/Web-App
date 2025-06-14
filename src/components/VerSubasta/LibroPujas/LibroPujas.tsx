import { useState, useEffect } from "react";
import "./LibroPujas.css";

interface Puja {
  id: number;
  usuario: string;
  monto: number;
  fecha: string;
  automatica: boolean;
}

interface LibroPujasProps {
  pujasData: Puja[];
  setPujasData: (pujas: Puja[]) => void;
}

export default function LibroPujas({
  pujasData,
  setPujasData,
}: LibroPujasProps) {
  useEffect(() => {
    try {
      /*
      const response = await fetch('/api/pujas?subastaId=123');
      if (!response.ok) throw new Error('Error al obtener pujas');
      const data = await response.json();
      setPujasData(data);
      */

      const mockData = [
        {
          id: 1,
          usuario: "usuario1",
          monto: 1600,
          fecha: "2023-05-15T14:30:00",
          automatica: false,
        },
        {
          id: 2,
          usuario: "usuario2",
          monto: 1550,
          fecha: "2023-05-15T14:25:00",
          automatica: true,
        },
        {
          id: 3,
          usuario: "usuario3",
          monto: 1500,
          fecha: "2023-05-15T14:20:00",
          automatica: false,
        },
        {
          id: 4,
          usuario: "usuario4",
          monto: 1450,
          fecha: "2023-05-15T14:15:00",
          automatica: true,
        },
        {
          id: 5,
          usuario: "usuario5",
          monto: 1400,
          fecha: "2023-05-15T14:10:00",
          automatica: false,
        },
        {
          id: 6,
          usuario: "usuario6",
          monto: 1350,
          fecha: "2023-05-15T14:05:00",
          automatica: false,
        },
        {
          id: 7,
          usuario: "usuario7",
          monto: 1300,
          fecha: "2023-05-15T14:00:00",
          automatica: true,
        },
        {
          id: 8,
          usuario: "usuario8",
          monto: 1250,
          fecha: "2023-05-15T13:55:00",
          automatica: false,
        },
        {
          id: 9,
          usuario: "usuario9",
          monto: 1200,
          fecha: "2023-05-15T13:50:00",
          automatica: false,
        },
        {
          id: 10,
          usuario: "usuario10",
          monto: 1150,
          fecha: "2023-05-15T13:45:00",
          automatica: true,
        },
      ];

      setPujasData(mockData);
    } catch (error) {
      console.error("Error al obtener pujas:", error);
    }
  }, [setPujasData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString();
  };

  return (
    <div className="libro-pujas-subasta-container">
      <h3 className="libro-pujas-subasta-titulo">Libro de Pujas</h3>

      <div className="libro-pujas-subasta-header">
        <span className="libro-pujas-subasta-header-usuario">Usuario</span>
        <span className="libro-pujas-subasta-header-monto">Monto</span>
        <span className="libro-pujas-subasta-header-hora">Hora</span>
        <span className="libro-pujas-subasta-header-tipo">Tipo</span>
      </div>

      <div className="libro-pujas-subasta-list">
        {pujasData.map((puja) => (
          <div key={puja.id} className="libro-pujas-subasta-item">
            <span className="libro-pujas-subasta-usuario">{puja.usuario}</span>
            <span className="libro-pujas-subasta-monto">
              {formatCurrency(puja.monto)}
            </span>
            <span className="libro-pujas-subasta-fecha">
              {formatDate(puja.fecha)}
            </span>
            <span className="libro-pujas-subasta-tipo">
              {puja.automatica ? (
                <span className="libro-pujas-subasta-badge-auto">Auto</span>
              ) : (
                <span className="libro-pujas-subasta-badge-manual">Manual</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
