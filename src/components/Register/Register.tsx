import { Link, redirect, useNavigate } from "react-router-dom";
import Field from "../Forms/Field/Field";
import { Form } from "../Forms/Form/Form";
import FormCard from "../Forms/FormCard/FormCard";
import "./Register.css";
import FormButton from "../Forms/FormButton/FormButton";
import { useState } from "react";

export default function Register(params: any) {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [selectedRol, setSelectedRol] = useState("");

  const handleClick = async () => {
    try {
      // Validación de campos obligatorios
      if (
        !name.trim() ||
        !lastName.trim() ||
        !email.trim() ||
        !address.trim() ||
        !phone.trim() ||
        !password ||
        !passwordConfirmation ||
        !selectedRol
      ) {
        setError("Todos los campos son requeridos");
        return;
      }

      // Validación de nombre y apellido
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
        setError("El nombre solo debe contener letras");
        return;
      }

      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(lastName)) {
        setError("El apellido solo debe contener letras");
        return;
      }

      // Validación de email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Por favor ingresa un correo electrónico válido");
        return;
      }

      // Validación de contraseña
      if (password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres");
        return;
      }

      if (!/[A-Z]/.test(password)) {
        setError("La contraseña debe contener al menos una mayúscula");
        return;
      }

      if (!/[0-9]/.test(password)) {
        setError("La contraseña debe contener al menos un número");
        return;
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        setError("La contraseña debe contener al menos un carácter especial");
        return;
      }

      // Validación de coincidencia de contraseñas
      if (password !== passwordConfirmation) {
        setError("Las contraseñas no coinciden");
        return;
      }

      // Validación de rol seleccionado
      if (!["subastador", "postor"].includes(selectedRol)) {
        setError("Por favor selecciona un rol válido");
        return;
      }

      //aqui va el post
      /*
    const response = await fetch('https://localhost:xxxx/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        lastName,
        email,
        address,
        phone,
        password,
        role: selectedRol
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el registro');
    }

    const data = await response.json();
    */

      // Redirigir después de registro exitoso
      navigate("/");
    } catch (err: any) {
      // Manejo de errores de la API
      if (err.message.includes("Network Error")) {
        setError("Error de conexión. Por favor verifica tu internet");
      } else if (err.message.includes("400")) {
        setError("El correo electrónico ya está registrado");
      } else {
        setError(err.message || "Ocurrió un error durante el registro");
      }
    }
  };

  return (
    <>
      <div className="margin"></div>
      <Form formName="Regístrate" size="large">
        <div className="Form-content">
          <FormCard text="Crea tu cuenta" cardTitle="Join The Perfect Bid" />
          <Field
            name="Nombre"
            placeHolder="your name"
            value={name}
            setValue={setName}
          />
          <Field
            name="Apellido"
            placeHolder="your last name"
            value={lastName}
            setValue={setLastName}
          />
          <Field
            name="Correo electronico"
            placeHolder="your email"
            value={email}
            setValue={setEmail}
          />
          <Field
            name="Direccion"
            placeHolder=" your direction"
            value={address}
            setValue={setAddress}
          />
          <Field
            name="Telefono"
            placeHolder="phone number"
            value={phone}
            setValue={setPhone}
          />
          <Field
            name="Password"
            placeHolder="your password"
            value={password}
            setValue={setPassword}
            type={"password"}
          />
          <Field
            name="Password confirmation"
            placeHolder="password confirmation"
            value={passwordConfirmation}
            setValue={setPasswordConfirmation}
            type={"password"}
          />
          <div className="rol-selection">
            <select
              value={selectedRol}
              onChange={(e) => setSelectedRol(e.target.value)}
            >
              <option value="">Selecciona un rol</option>
              <option value="subastador">Subastador</option>
              <option value="postor">Postor</option>
            </select>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "10px 0 0 0",
            fontSize: "14px",
            color: "red",
            height: "0px",
          }}
        ></div>
        {error && <div className="error">{error}</div>}
        <FormButton text="Registrarse" handle={handleClick} />
        <Link className="link-red" to={"/"}>
          <div className="form-link-register">
            Ya tienes una cuenta? Iniciar Sesion
          </div>
        </Link>
      </Form>
    </>
  );
}
