import { useState } from "react";
import { Form } from "../../Forms/Form/Form";
import FormCard from "../../Forms/FormCard/FormCard";
import Field from "../../Forms/Field/Field";
import FormButton from "../../Forms/FormButton/FormButton";
import "../ModifyForm/ModifyForm.css";
import { authService } from "../../services/authService";
//Arreglar error pq no se muestra en el grid
interface PasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ModifyPasswordProps {
  setModifyPassword: (value: boolean) => void;
}

export default function ModifyPassword({
  setModifyPassword,
}: ModifyPasswordProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [passwords, setPasswords] = useState<PasswordData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  // meter un useeffect para pedir el token y si vencio mandar pal lobby
  const handleInputChange = (field: keyof PasswordData) => (value: string) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const validatePasswords = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    if (passwords.newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validatePasswords()) {
      setShowConfirmation(true);
    }
  };

  const confirmChanges = async () => {
    try {
      setShowConfirmation(false);
      setModifyPassword(false);
      const token = authService.getToken();

      if (!token) {
        throw new Error("No se encontró token de autenticación");
      }

      const response = await fetch(`http://localhost:44335/update-password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: passwords.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar contraseña");
      }
    } catch (error) {
      console.error("Error en confirmChanges:", error);

      // Revertir el cierre de los modales si hay error
      setShowConfirmation(true);
      setModifyPassword(true);

      // Mostrar mensaje de error al usuario
      setError(
        error instanceof Error
          ? error.message
          : "Error desconocido al actualizar contraseña"
      );
    }
  };
  const cancelChanges = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="floating-form-container">
        <Form
          formName="Cambiar Contraseña"
          className="floating-form"
          size="large"
          setModifyForm={setModifyPassword}
        >
          <FormCard
            cardTitle="Seguridad"
            text="Por favor ingresa tu contraseña actual y la nueva contraseña"
          />

          <div className="Form-content">
            <Field
              name="Contraseña actual"
              placeHolder="contraseña actual"
              value={passwords.oldPassword}
              setValue={handleInputChange("oldPassword")}
              type="password"
            />

            <Field
              name="Nueva contraseña"
              placeHolder="nueva contraseña"
              value={passwords.newPassword}
              setValue={handleInputChange("newPassword")}
              type="password"
            />

            <Field
              name="Confirmar contraseña"
              placeHolder="confirmar contraseña"
              value={passwords.confirmPassword}
              setValue={handleInputChange("confirmPassword")}
              type="password"
            />

            {error && <p className="error">{error}</p>}
          </div>

          <div className="buttons-footer">
            <FormButton text="Cambiar Contraseña" handle={handleSubmit} />
          </div>
        </Form>
      </div>

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <h4>¿Confirmar cambios?</h4>
            <br />
            <p>
              ¿Estás seguro de que deseas actualizar tu información de perfil?
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
