// src/components/LogIn.tsx
import "./LogIn.css";
import Field from "../Forms/Field/Field";
import { Link } from "react-router-dom";
import { Form } from "../Forms/Form/Form";
import FormButton from "../Forms/FormButton/FormButton";
import FormCard from "../Forms/FormCard/FormCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleClick = async () => {
    try {
      // Validación de campos del formulario
      if (!email.trim()) {
        setError("El correo electrónico es requerido");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Por favor ingresa un correo electrónico válido");
        return;
      }

      if (!password.trim()) {
        setError("La contraseña es requerida");
        return;
      }

      if (password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres");
        return;
      }

      // Simulación de respuesta del servidor (esto sería reemplazado por tu llamada real a la API)
      const response = {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        refresh_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJlZnJlc2ggVG9rZW4iLCJpYXQiOjE1MTYyMzkwMjJ9.4tC2Y2s7-7ZKlJz7Kz7Kz7Kz7Kz7Kz7Kz7Kz7Kz7Kz",
        expires_in: 3600,
        email: "usuario.prueba@example.com",
        userId: "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
        roleId: "6818b6ff035415cfcd8aa229",
      };
      /*
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Obligatorio para JSON
        },
        body: JSON.stringify({ email, password }), // Datos en JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Credenciales incorrectas");
      }

      const data = await response.json();
*/
      login(response);
      navigate("/perfil");
    } catch (err: any) {
      // Manejo de errores de la API
      if (err.message.includes("Network Error")) {
        setError("Error de conexión. Por favor verifica tu internet");
      } else if (err.message.includes("401")) {
        setError("Correo o contraseña incorrectos");
      } else {
        setError(err.message || "Ocurrió un error al iniciar sesión");
      }
    }
  };

  return (
    <>
      <div className="margin"></div>
      <Form formName="The Perfect Bid" size="small">
        <FormCard
          text="Ingresa tus datos y accede a tu cuenta"
          cardTitle="Ingreso"
        />
        <Field
          name="Correo electronico"
          placeHolder="Introduzca el correo de usuario"
          setValue={setEmail}
          value={email}
        />
        <Field
          name="Contraseña"
          placeHolder="Introduzca su contraseña"
          type={"password"}
          setValue={setPassword}
          value={password}
        />
        <Link className="link-red" to={"/forgot-password"}>
          <div className="form-link-forget">Olvidó su contraseña?</div>
        </Link>
        {error && <div className="error">{error}</div>}
        <FormButton text="Ingresar" handle={handleClick} />

        <Link className="link-red" to={"/Register"}>
          <div className="form-link-register">
            No tienes una cuenta? Regístrate ya!
          </div>
        </Link>
      </Form>
    </>
  );
}
