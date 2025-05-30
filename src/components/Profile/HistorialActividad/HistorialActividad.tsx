import { useEffect, useState } from "react";
import "./HistorialActividad.css";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

type Actividad = {
  id: number;
  userId: string;
  action: "LOGIN" | "USER_UPDATED" | "PASSWORD_CHANGED";
  timestamp: string; // Recibimos string ISO desde .NET
};

export default function HistorialActividad() {
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [filtroFecha, _setFiltroFecha] = useState<string>("todos");
  const [filtroAno, setFiltroAno] = useState<string>("todos");
  const [filtroMes, setFiltroMes] = useState<string>("todos");
  const { userData } = useAuth();
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const token = authService.getToken();
        if (!token) {
          throw new Error("No se encontró token de autenticación");
        }

        const response = await fetch(
          `http://localhost:8085/api/users/${userData?.userId}/activity`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener actividades");
        }

        const data = await response.json();
        setActividades(data); // Guardamos los datos directamente (timestamp como string)
      } catch (error) {
        console.error("Error al obtener actividades:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchActividades();
  }, [userData?.userId]);

  // Función para convertir timestamp string a Date
  const parseTimestamp = (timestamp: string): Date => {
    return new Date(timestamp);
  };

  // Obtener años únicos
  const anosUnicos = [
    ...new Set(
      actividades.map((item) =>
        parseTimestamp(item.timestamp).getFullYear().toString()
      )
    ),
  ];

  // Obtener meses únicos
  const mesesUnicos = [
    ...new Set(
      actividades.map((item) =>
        (parseTimestamp(item.timestamp).getMonth() + 1).toString()
      )
    ),
  ];

  const actividadesFiltradas = actividades.filter((actividad) => {
    const fechaActividad = parseTimestamp(actividad.timestamp);
    const anoActividad = fechaActividad.getFullYear().toString();
    const mesActividad = (fechaActividad.getMonth() + 1).toString();
    const diaActividad = fechaActividad.getDate().toString();

    const cumpleTipo =
      filtroTipo === "todos" || actividad.action === filtroTipo;
    const cumpleFecha = filtroFecha === "todos" || diaActividad === filtroFecha;
    const cumpleAno = filtroAno === "todos" || anoActividad === filtroAno;
    const cumpleMes = filtroMes === "todos" || mesActividad === filtroMes;

    return (
      cumpleTipo &&
      (filtroFecha !== "todos" ? cumpleFecha : cumpleAno && cumpleMes)
    );
  });

  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case "LOGIN":
        return (
          <img
            src="/login.svg"
            alt="Inicio de sesión"
            className="actividad-icono-svg"
          />
        );
      case "USER_UPDATED":
        return (
          <img
            src="/edit.svg"
            alt="Editar perfil"
            className="actividad-icono-svg"
          />
        );
      case "PASSWORD_CHANGED":
        return (
          <img
            src="/unlock.svg"
            alt="Cambio de contraseña"
            className="actividad-icono-svg"
          />
        );
      default:
        return (
          <img
            src="/info.svg"
            alt="Información"
            className="actividad-icono-svg"
          />
        );
    }
  };

  if (loading) {
    return <div>Cargando actividades...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="historial-actividad">
      <div className="historial-header">
        <h3>Actividad reciente</h3>
        <div className="filtros-container">
          <div className="filtro-group">
            <label>Tipo de actividad</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="filtro-select"
            >
              <option value="todos">Todos</option>
              <option value="LOGIN">Inicio de sesión</option>
              <option value="USER_UPDATED">Actualización de perfil</option>
              <option value="PASSWORD_CHANGED">Cambio de contraseña</option>
            </select>
          </div>

          <div className="filtro-group">
            <label>Año</label>
            <select
              value={filtroAno}
              onChange={(e) => setFiltroAno(e.target.value)}
              className="filtro-select"
            >
              <option value="todos">Todos</option>
              {anosUnicos.map((ano) => (
                <option key={ano} value={ano}>
                  {ano}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-group">
            <label>Mes</label>
            <select
              value={filtroMes}
              onChange={(e) => setFiltroMes(e.target.value)}
              className="filtro-select"
              disabled={filtroAno === "todos"}
            >
              <option value="todos">Todos</option>
              {filtroAno !== "todos" &&
                mesesUnicos
                  .filter((mes) =>
                    actividades.some(
                      (a) =>
                        parseTimestamp(a.timestamp).getFullYear().toString() ===
                          filtroAno &&
                        (
                          parseTimestamp(a.timestamp).getMonth() + 1
                        ).toString() === mes
                    )
                  )
                  .map((mes) => (
                    <option key={mes} value={mes}>
                      {new Date(2000, parseInt(mes) - 1).toLocaleString(
                        "es-ES",
                        {
                          month: "long",
                        }
                      )}
                    </option>
                  ))}
            </select>
          </div>
        </div>
      </div>

      <div className="actividades-container">
        {actividadesFiltradas.map((actividad) => {
          const fecha = parseTimestamp(actividad.timestamp);
          return (
            <div key={actividad.id} className="actividad-item">
              <div className="actividad-icono">
                {getIconoTipo(actividad.action)}
              </div>
              <div className="actividad-contenido">
                <div className="actividad-nombre">
                  {actividad.action === "LOGIN" && "Inicio de sesión"}
                  {actividad.action === "USER_UPDATED" &&
                    "Actualización de perfil"}
                  {actividad.action === "PASSWORD_CHANGED" &&
                    "Cambio de contraseña"}
                </div>
                <div className="actividad-fecha">
                  {fecha.toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  •{" "}
                  {fecha.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
