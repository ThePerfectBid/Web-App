import Field from "../Forms/Field/Field";
import { Form } from "../Forms/Form/Form";
import FormButton from "../Forms/FormButton/FormButton";
import FormCard from "../Forms/FormCard/FormCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pulsedButton, setPulsedButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClick = async () => {
    setErrorMessage(""); // Limpiar mensajes anteriores

    if (!email) {
      setErrorMessage("El correo electrónico es requerido");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Por favor ingrese un correo electrónico válido");
      return;
    }

    const response = await fetch(
      `http://localhost:44335/reset-password/${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el envio del correo");
    }

    setPulsedButton(true);
    setErrorMessage(""); // Limpiar mensaje si pasa validación
  };

  const continueClick = () => {
    setErrorMessage(""); // Limpiar mensajes anteriores

    navigate("/");
  };

  return (
    <>
      <div className="margin"></div>
      <Form formName="¿Has olvidado tu contraseña?" size="small">
        <br />
        <FormCard
          text="Ingresa los datos solicitados para recuperar tu contraseña"
          cardTitle="Recupera tu contraseña"
        />
        <Field
          name="Correo electrónico"
          placeHolder="user@example.com"
          setValue={setEmail}
          value={email}
        />

        {/* Mensaje de error antes del botón */}
        {errorMessage && <div className="error">{errorMessage}</div>}

        {!pulsedButton && (
          <FormButton text="Enviar correo" handle={handleClick} />
        )}

        {pulsedButton && <FormButton text="Continuar" handle={continueClick} />}

        {pulsedButton && (
          <p className="Message">
            Se ha enviado un mensaje al correo electrónico
          </p>
        )}
      </Form>
    </>
  );
}
