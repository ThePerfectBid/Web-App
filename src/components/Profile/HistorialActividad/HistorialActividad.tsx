import { useEffect, useState } from "react";
import "./HistorialActividad.css";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";
type Actividad = {
  id: number;
  userId: string;
  action: "LOGIN" | "USER_UPDATED" | "PASSWORD_CHANGED";
  timestamp: Date;
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

  //colocar useEffect que utilice authService.getToken(), si el token es valido realice peticion al endpoint para obtener la lista de actividades
  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const token = authService.getToken();
        if (!token) {
          throw new Error("No authentication token found");
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
        setActividades(data); // Aquí se setearían las actividades reales desde el backend
      } catch (error) {
        console.error("Error fetcheando actividades:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchActividades();
  }, []);

  // Obtener años únicos
  const anosUnicos = [
    ...new Set(
      actividades.map((item) =>
        new Date(item.timestamp.getFullYear()).getFullYear().toString()
      )
    ),
  ];

  // Obtener meses únicos
  const mesesUnicos = [
    ...new Set(
      actividades.map((item) =>
        (new Date(item.timestamp.getDate()).getMonth() + 1).toString()
      )
    ),
  ];

  const actividadesFiltradas = actividades.filter((actividad) => {
    const fechaActividad = new Date(actividad.timestamp.getDate());
    const anoActividad = fechaActividad.getFullYear().toString();
    const mesActividad = (fechaActividad.getMonth() + 1).toString();

    const cumpleTipo =
      filtroTipo === "todos" || actividad.action === filtroTipo;
    const cumpleFecha =
      filtroFecha === "todos" ||
      actividad.timestamp.getDate().toString() === filtroFecha;
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
    return <div className="error">Error: {error}</div>;
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
              <option value="UPDATED_USER">Actualización de perfil</option>
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
                        a.timestamp.getFullYear().toString() === filtroAno &&
                        (a.timestamp.getMonth() + 1).toString() === mes
                    )
                  )
                  .map((mes) => (
                    <option key={mes} value={mes}>
                      {new Date(2000, parseInt(mes) - 1).toLocaleString(
                        "es-ES",
                        { month: "long" }
                      )}
                    </option>
                  ))}
            </select>
          </div>
        </div>
      </div>

      <div className="actividades-container">
        {actividadesFiltradas.map((actividad) => (
          <div key={actividad.id} className="actividad-item">
            <div className="actividad-icono">
              {getIconoTipo(actividad.action)}
            </div>
            <div className="actividad-contenido">
              <div className="actividad-nombre">{actividad.action}</div>
              <div className="actividad-fecha">
                {new Date(actividad.timestamp.getDate()).toLocaleDateString(
                  "es-ES",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}{" "}
                • {actividad.timestamp.getHours().toString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
