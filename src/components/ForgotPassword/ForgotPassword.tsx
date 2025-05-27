import Field from "../Forms/Field/Field";
import { Form } from "../Forms/Form/Form";
import FormButton from "../Forms/FormButton/FormButton";
import FormCard from "../Forms/FormCard/FormCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pulsedButton, setPulsedButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCode = (code: string): boolean => {
    const codeRegex = /^\d{6}$/; // Asumiendo que el código es de 6 dígitos
    return codeRegex.test(code);
  };

  const handleClick = () => {
    setErrorMessage(""); // Limpiar mensajes anteriores

    if (!email) {
      setErrorMessage("El correo electrónico es requerido");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Por favor ingrese un correo electrónico válido");
      return;
    }

    setPulsedButton(true);
    setErrorMessage(""); // Limpiar mensaje si pasa validación
  };

  const continueClick = () => {
    setErrorMessage(""); // Limpiar mensajes anteriores

    if (!code) {
      setErrorMessage("El código de verificación es requerido");
      return;
    }

    if (!validateCode(code)) {
      setErrorMessage("El código debe contener exactamente 6 dígitos");
      return;
    }

    // Aquí va la petición al endpoint del API Gateway
    // Si la petición es exitosa:
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

        {pulsedButton && (
          <Field
            name="Código de verificación"
            placeHolder="123456"
            value={code}
            setValue={setCode}
          />
        )}

        {/* Mensaje de error antes del botón */}
        {errorMessage && <div className="error">{errorMessage}</div>}

        {!pulsedButton && (
          <FormButton text="Enviar código" handle={handleClick} />
        )}

        {pulsedButton && <FormButton text="Continuar" handle={continueClick} />}

        {pulsedButton && (
          <p className="Message">
            Se ha enviado un código al correo electrónico
          </p>
        )}
      </Form>
    </>
  );
}
