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
          throw new Error("No authentication token found");
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
        setSelectedPermisos(currentPermisoIds); // Inicialmente seleccionados
      } catch (error) {
        console.error("Error fetching data:", error);
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

      // Determinar permisos a agregar y eliminar
      const permisosToAdd = selectedPermisos.filter(
        (id) => !currentPermisos.includes(id)
      );
      const permisosToRemove = currentPermisos.filter(
        (id) => !selectedPermisos.includes(id)
      );

      // Enviar cambios al backend
      const addPromises = permisosToAdd.map((permisoId) =>
        fetch(
          `http://localhost:8085/api/users/${roleId}/add-permission/${permisoId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
      );

      const removePromises = permisosToRemove.map((permisoId) =>
        fetch(
          `http://localhost:8085/api/users/${roleId}/remove-permission/${permisoId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
      );

      // Esperar a que todas las operaciones terminen
      await Promise.all([...addPromises, ...removePromises]);

      setShowConfirmation(false);
      setModifyForm(false);
    } catch (error) {
      console.error("Error al guardar permisos:", error);
      setError("Error al actualizar los permisos");
    }
  };

  const cancelChanges = () => {
    setShowConfirmation(false);
  };

  // Filtrar permisos según término de búsqueda
  const filteredPermisos = allPermisos.filter((permiso) =>
    permiso.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Cargando permisos...</div>;
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
            cardTitle="Seleccione permisos para el rol"
            text="Por favor selecciona los permisos deseados para el rol"
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
            <br />
            <p>¿Estás seguro de que deseas actualizar los permisos del Rol?</p>
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
