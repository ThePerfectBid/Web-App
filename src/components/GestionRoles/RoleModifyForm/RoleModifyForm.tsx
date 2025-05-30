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
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const [selectedPermisos, setSelectedPermisos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPermisos = async () => {
      try {
        const token = authService.getToken();
        if (!token) {
          throw new Error("No authentication token found");
        }

        // 1. Obtener todos los permisos disponibles
        const response = await fetch(
          "http://localhost:8085/api/users/allPermissions",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener permisos");
        }

        const data: Permiso[] = await response.json();

        // 2. Obtener permisos actuales del rol
        const response2 = await fetch(
          `http://localhost:8085/api/users/${roleId}/permissions`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response2.ok) {
          throw new Error("Error al obtener permisos del rol");
        }

        const data2: string[] = await response2.json(); // Ahora es array de strings

        // 3. Establecer los permisos y los seleccionados
        setPermisos(data);
        setSelectedPermisos(data2);
      } catch (error) {
        console.error("Error fetching permisos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPermisos();
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

      console.log(permisos);
      // 1. Agregar permisos seleccionados
      for (const permisoId of selectedPermisos) {
        await fetch(
          `http://localhost:8085/api/users/${roleId}/add-permission/${permisoId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // 2. Eliminar permisos no seleccionados
      const permisosAEliminar = permisos
        .filter((p) => !selectedPermisos.includes(p.id))
        .map((p) => p.id);

      for (const permisoId of permisosAEliminar) {
        await fetch(
          `http://localhost:8085/api/users/${roleId}/remove-permission/${permisoId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setShowConfirmation(false);
      setModifyForm(false);
    } catch (error) {
      console.error("Error al guardar permisos:", error);
    }
  };

  const cancelChanges = () => {
    setShowConfirmation(false);
  };

  // Filtrar permisos según término de búsqueda
  const filteredPermisos = permisos.filter((permiso) =>
    permiso.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Cargando permisos...</div>;

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
