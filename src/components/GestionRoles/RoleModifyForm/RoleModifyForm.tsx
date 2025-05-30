import { useState, useEffect } from "react";
import { Form } from "../../Forms/Form/Form";
import FormCard from "../../Forms/FormCard/FormCard";
import FormButton from "../../Forms/FormButton/FormButton";
import "./RoleModifyForm.css";
import { authService } from "../../services/authService";

interface Permiso {
  id: string;
  name: string;
}

interface RoleFormProps {
  setModifyForm: (value: boolean) => void;
  roleId: string;
}

export default function RoleModifyForm({
  setModifyForm,
  roleId,
}: RoleFormProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPermisos, setAllPermisos] = useState<Permiso[]>([]);
  const [currentPermisos, setCurrentPermisos] = useState<string[]>([]);
  const [selectedPermisos, setSelectedPermisos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar todos los permisos y los permisos actuales del rol
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authService.getToken();
        if (!token) {
          throw new Error("No se encontró token de autenticación");
        }

        // Obtener todos los permisos disponibles
        const permisosResponse = await fetch(
          "http://localhost:8085/api/users/allPermissions",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!permisosResponse.ok) {
          throw new Error("Error al obtener todos los permisos");
        }
        const permisosData: Permiso[] = await permisosResponse.json();

        // Obtener permisos actuales del rol
        const rolPermisosResponse = await fetch(
          `http://localhost:8085/api/users/${roleId}/permissions`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!rolPermisosResponse.ok) {
          throw new Error("Error al obtener permisos del rol");
        }
        const rolPermisosData: Permiso[] = await rolPermisosResponse.json();

        setAllPermisos(permisosData);
        const currentPermisoIds = rolPermisosData.map((p) => p.id);
        setCurrentPermisos(currentPermisoIds);
        setSelectedPermisos(currentPermisoIds);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [roleId]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const togglePermiso = (id: string) => {
    setSelectedPermisos((prev) =>
      prev.includes(id)
        ? prev.filter((permisoId) => permisoId !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const confirmChanges = async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error("No se encontró token de autenticación");
      }

      // Determinar permisos a agregar (seleccionados que no estaban)
      const permisosToAdd = selectedPermisos.filter(
        (id) => !currentPermisos.includes(id)
      );

      // Determinar permisos a eliminar (estaban pero no están seleccionados)
      const permisosToRemove = currentPermisos.filter(
        (id) => !selectedPermisos.includes(id)
      );

      // Enviar permisos a agregar
      for (const permisoId of permisosToAdd) {
        const response = await fetch(
          `http://localhost:8085/api/users/${roleId}/permissions/${permisoId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error al agregar permiso ${permisoId}`);
        }
      }

      // Enviar permisos a eliminar
      for (const permisoId of permisosToRemove) {
        const response = await fetch(
          `http://localhost:8085/api/users/${roleId}/permissions/${permisoId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error al eliminar permiso ${permisoId}`);
        }
      }

      setShowConfirmation(false);
      setModifyForm(false);
    } catch (error) {
      console.error("Error al actualizar permisos:", error);
      setError("Error al guardar los cambios. Intente nuevamente.");
      setShowConfirmation(false);
    }
  };

  const cancelChanges = () => {
    setShowConfirmation(false);
  };

  // Filtrar permisos según término de búsqueda
  const filteredPermisos = allPermisos.filter((permiso) =>
    permiso.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="loading">Cargando permisos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <div className="floating-form-container">
        <Form
          formName="Modificación de permisos del rol"
          className="floating-form"
          size="large"
          setModifyForm={setModifyForm}
        >
          <FormCard
            cardTitle="Gestión de permisos del rol"
            text="Marque/desmarque los permisos según sea necesario"
          />

          <div className="Form-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar permisos..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>

            <div className="permisos-list">
              {filteredPermisos.length > 0 ? (
                filteredPermisos.map((permiso) => (
                  <div key={permiso.id} className="permiso-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedPermisos.includes(permiso.id)}
                        onChange={() => togglePermiso(permiso.id)}
                      />
                      <span className="permiso-nombre">{permiso.name}</span>
                    </label>
                  </div>
                ))
              ) : (
                <p>No se encontraron permisos</p>
              )}
            </div>
          </div>

          <div className="buttons-footer">
            <FormButton text="Guardar Cambios" handle={handleSubmit} />
          </div>
        </Form>
      </div>

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <h4>¿Confirmar cambios?</h4>
            <p>Se aplicarán los siguientes cambios:</p>
            <ul className="changes-list">
              {selectedPermisos
                .filter((id) => !currentPermisos.includes(id))
                .map((id) => (
                  <li key={`add-${id}`}>
                    [+] Agregar: {allPermisos.find((p) => p.id === id)?.name}
                  </li>
                ))}
              {currentPermisos
                .filter((id) => !selectedPermisos.includes(id))
                .map((id) => (
                  <li key={`remove-${id}`}>
                    [-] Eliminar: {allPermisos.find((p) => p.id === id)?.name}
                  </li>
                ))}
            </ul>
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
