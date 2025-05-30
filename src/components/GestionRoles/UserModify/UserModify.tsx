import { useState, useEffect } from "react";
import { Form } from "../../Forms/Form/Form";
import FormCard from "../../Forms/FormCard/FormCard";
import FormButton from "../../Forms/FormButton/FormButton";
import "./UserModify.css";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

interface Rol {
  id: string;
  nombre: string;
}

interface UserModifyProps {
  setModifyForm: (value: boolean) => void;
  userEmail: string; // Email del usuario que se está modificando
  userId: string; // ID del usuario para la petición al backend
}

export default function UserModify({
  setModifyForm,
  userEmail,
}: UserModifyProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRolId, setSelectedRolId] = useState<string>("");
  const [roles, setRoles] = useState<Rol[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useAuth();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        //Obtener token
        const token = authService.getToken();
        if (!token) {
          throw new Error("No authentication token found");
        }
        //Hacer fetch al rol utilizando el roleID del user Data
        // Petición al endpoint para obtener todos los roles
        const response = await fetch(
          "http://localhost:8085/api/users/GetallRoles",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener roles");
        }
        //mandarle el token
        const data: Rol[] = await response.json();

        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRolSelection = (id: string) => {
    setSelectedRolId(id);
  };

  const handleSubmit = () => {
    if (selectedRolId) {
      setShowConfirmation(true);
    }
  };

  const confirmChanges = async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error("No se encontró token de autenticación");
      }

      const response = await fetch(
        `http://localhost:8085/api/users/updaterole/${userData?.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newRoleId: selectedRolId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el rol");
      }

      setShowConfirmation(false);
      setModifyForm(false);
    } catch (error) {
      console.error("Error al asignar rol:", error);
    }
  };

  const cancelChanges = () => {
    setShowConfirmation(false);
  };

  // Filtrar roles según término de búsqueda
  const filteredRoles = roles.filter((rol) =>
    rol.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Cargando roles...</div>;

  return (
    <>
      <div className="floating-form-container">
        <Form
          formName="Asignación de rol al usuario"
          className="floating-form"
          size="large"
          setModifyForm={setModifyForm}
        >
          <FormCard
            cardTitle={`Asignar rol a ${userEmail}`}
            text="Seleccione un rol para asignar al usuario"
          />

          <div className="Form-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar roles..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>

            <div className="roles-list">
              {filteredRoles.length > 0 ? (
                filteredRoles.map((rol) => (
                  <div key={rol.id} className="role-item">
                    <label>
                      <input
                        type="radio"
                        name="userRole"
                        checked={selectedRolId === rol.id}
                        onChange={() => handleRolSelection(rol.id)}
                      />
                      <span className="role-nombre">{rol.nombre}</span>
                    </label>
                  </div>
                ))
              ) : (
                <p>No se encontraron roles</p>
              )}
            </div>
          </div>

          <div className="buttons-footer">
            <FormButton
              text="Guardar Cambios"
              handle={handleSubmit}
              disabled={!selectedRolId}
            />
          </div>
        </Form>
      </div>

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <h4>¿Confirmar cambios?</h4>
            <br />
            <p>
              ¿Estás seguro de que deseas asignar este rol al usuario{" "}
              {userEmail}?
            </p>
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
