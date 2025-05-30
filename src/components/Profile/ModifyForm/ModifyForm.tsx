import { useState } from "react";
import { Form } from "../../Forms/Form/Form";
import FormCard from "../../Forms/FormCard/FormCard";
import Field from "../../Forms/Field/Field";
import FormButton from "../../Forms/FormButton/FormButton";
import "./ModifyForm.css";
import { authService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

interface ProfileData {
  name: string;
  lastName: string;
  phone: string;
  address: string;
}

interface FloatingFormProps {
  setModifyForm: (value: boolean) => void;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
}

export default function ModifyForm({
  setModifyForm,
  nombre,
  apellido,
  telefono,
  direccion,
}: FloatingFormProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: nombre,
    lastName: apellido,
    phone: telefono,
    address: direccion,
  });
  const { userData } = useAuth();

  const handleInputChange = (field: keyof ProfileData) => (value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const confirmChanges = async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const dataToSend: ProfileData = {
        name: profileData.name,
        lastName: profileData.lastName,
        phone: profileData.phone,
        address: profileData.address,
      };

      // Enviar todos los permisos seleccionados en una sola petición POST
      const responseAdd = await fetch(
        `http://localhost:8085/api/update/${userData?.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!responseAdd.ok) {
        throw new Error("Error al actualizar usuario");
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

  return (
    <>
      <div className="floating-form-container">
        <Form
          formName="Modificación de Perfil"
          className="floating-form"
          size="large"
          setModifyForm={setModifyForm}
        >
          <FormCard
            cardTitle="Información Personal"
            text="Por favor actualiza tus datos personales"
          />

          <div className="Form-content">
            <Field
              name="Nombre completo"
              placeHolder="tu nombre"
              value={profileData.name}
              setValue={handleInputChange("name")}
            />
            <Field
              name="Apellido"
              placeHolder="Tu apellido"
              value={profileData.lastName}
              setValue={handleInputChange("lastName")}
            />

            <Field
              name="Teléfono"
              placeHolder="teléfono"
              value={profileData.phone}
              setValue={handleInputChange("phone")}
            />

            <Field
              name="Dirección"
              placeHolder="dirección"
              value={profileData.address}
              setValue={handleInputChange("address")}
            />
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
