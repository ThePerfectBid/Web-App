import { useEffect, useState } from "react";
import "./HistorialActividad.css";
import { authService } from "../../services/authService";

type Actividad = {
  id: number;
  nombre: string;
  tipo: "inicio_sesion" | "actualizacion_perfil" | "cambio_contrasena";
  fecha: string;
  hora: string;
};

export default function HistorialActividad() {
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [filtroFecha, _setFiltroFecha] = useState<string>("todos");
  const [filtroAno, setFiltroAno] = useState<string>("todos");
  const [filtroMes, setFiltroMes] = useState<string>("todos");
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Datos simulados para cuando no hay conexión o mientras se desarrolla
  const historialActividadSimulado: Actividad[] = [
    {
      id: 1,
      nombre: "Inicio de sesión desde dispositivo móvil",
      tipo: "inicio_sesion",
      fecha: "2023-05-15",
      hora: "09:30",
    },
    {
      id: 2,
      nombre: "Actualización de información personal",
      tipo: "actualizacion_perfil",
      fecha: "2023-05-14",
      hora: "14:15",
    },
    {
      id: 3,
      nombre: "Cambio de contraseña",
      tipo: "cambio_contrasena",
      fecha: "2023-05-12",
      hora: "11:45",
    },
    {
      id: 4,
      nombre: "Inicio de sesión desde navegador Chrome",
      tipo: "inicio_sesion",
      fecha: "2023-05-10",
      hora: "16:20",
    },
    {
      id: 5,
      nombre: "Actualización de foto de perfil",
      tipo: "actualizacion_perfil",
      fecha: "2023-05-08",
      hora: "10:00",
    },
    {
      id: 6,
      nombre: "Inicio de sesión desde dispositivo móvil",
      tipo: "inicio_sesion",
      fecha: "2023-05-05",
      hora: "08:15",
    },
    {
      id: 7,
      nombre: "Cambio de contraseña",
      tipo: "cambio_contrasena",
      fecha: "2023-05-01",
      hora: "13:30",
    },
  ];

  //colocar useEffect que utilice authService.getToken(), si el token es valido realice peticion al endpoint para obtener la lista de actividades
  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const token = authService.getToken();
        if (!token) {
          throw new Error("No authentication token found");
        }
        /*
          const response = await fetch(
            "http://localhost:5000/api/users/actividades",
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
        */

        // Usamos datos simulados mientras el endpoint no esté disponible
        setActividades(historialActividadSimulado);
      } catch (error) {
        console.error("Error fetcheando actividades:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        // Usamos datos simulados como fallback
        setActividades(historialActividadSimulado);
      } finally {
        setLoading(false);
      }
    };

    fetchActividades();
  }, []);

  // Obtener años únicos
  const anosUnicos = [
    ...new Set(
      actividades.map((item) => new Date(item.fecha).getFullYear().toString())
    ),
  ];

  // Obtener meses únicos
  const mesesUnicos = [
    ...new Set(
      actividades.map((item) =>
        (new Date(item.fecha).getMonth() + 1).toString()
      )
    ),
  ];

  const actividadesFiltradas = actividades.filter((actividad) => {
    const fechaActividad = new Date(actividad.fecha);
    const anoActividad = fechaActividad.getFullYear().toString();
    const mesActividad = (fechaActividad.getMonth() + 1).toString();

    const cumpleTipo = filtroTipo === "todos" || actividad.tipo === filtroTipo;
    const cumpleFecha =
      filtroFecha === "todos" || actividad.fecha === filtroFecha;
    const cumpleAno = filtroAno === "todos" || anoActividad === filtroAno;
    const cumpleMes = filtroMes === "todos" || mesActividad === filtroMes;

    return (
      cumpleTipo &&
      (filtroFecha !== "todos" ? cumpleFecha : cumpleAno && cumpleMes)
    );
  });

  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case "inicio_sesion":
        return (
          <img
            src="/login.svg"
            alt="Inicio de sesión"
            className="actividad-icono-svg"
          />
        );
      case "actualizacion_perfil":
        return (
          <img
            src="/edit.svg"
            alt="Editar perfil"
            className="actividad-icono-svg"
          />
        );
      case "cambio_contrasena":
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
              <option value="inicio_sesion">Inicio de sesión</option>
              <option value="actualizacion_perfil">
                Actualización de perfil
              </option>
              <option value="cambio_contrasena">Cambio de contraseña</option>
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
                        new Date(a.fecha).getFullYear().toString() ===
                          filtroAno &&
                        (new Date(a.fecha).getMonth() + 1).toString() === mes
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
              {getIconoTipo(actividad.tipo)}
            </div>
            <div className="actividad-contenido">
              <div className="actividad-nombre">{actividad.nombre}</div>
              <div className="actividad-fecha">
                {new Date(actividad.fecha).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}{" "}
                • {actividad.hora}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
