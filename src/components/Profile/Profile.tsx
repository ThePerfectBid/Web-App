import { useEffect, useState } from "react";
import ModifyForm from "./ModifyForm/ModifyForm";
import "./Profile.css";
import ProfileElement from "./ProfileElement/ProfileElement";
import ModifyPassword from "./ModifyPassword/ModifyPassword";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import HistorialActividad from "./HistorialActividad/HistorialActividad";

interface Persona {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  roleId: string;
}

export default function Profile() {
  const [modifyForm, setModifyForm] = useState(false);
  const [modifyPassword, setModifyPassword] = useState(false);
  const { userData } = useAuth();
  const [role, setRole] = useState("");
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = async () => {
      try {
        const token = authService.getToken();
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          `http://localhost:8085/api/users/getuserbyemail?email=${encodeURIComponent(
            userData?.email || ""
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener usuario");
        }

        const data = await response.json();

        setPersona(data);

        if (persona?.roleId === "6818b9e5035415cfcd8aa231") {
          setRole("Postor");
        } else if (persona?.roleId === "6818b7af035415cfcd8aa22a") {
          setRole("Subastador");
        } else if (persona?.roleId === "6818bd0b035415cfcd8aa238") {
          setRole("Soporte tecnico");
        } else if (persona?.roleId === "6818b6ff035415cfcd8aa229") {
          setRole("Administrador");
        }
      } catch (error) {
        console.error("Error fetcheando roles:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    auth();
  }, []);

  const handleEditProfile = () => {
    setModifyForm(!modifyForm);
  };

  const handleUpdatePassword = () => {
    setModifyPassword(!modifyPassword);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!persona) {
    return <div>No user data available</div>;
  }

  return (
    <>
      <div className="content-2">
        <div className="personal-information">
          {/* Header Section (15%) */}
          <div className="header">
            <h2>Mi Perfil</h2>
          </div>

          {/* Profile Section (25%) */}
          <div className="profile-section">
            <div className="profile">
              <div className="details-profile">
                <h2>{`${persona.name} ${persona.lastName}`}</h2>
                <p>{role}</p>
              </div>
            </div>
          </div>

          {/* Description Section (40%) */}
          <div className="description-section">
            <div className="description">
              <ProfileElement
                title="Correo electrónico"
                content={persona.email}
                icon="/mail.svg"
              />
              <ProfileElement
                title="Teléfono"
                content={persona.phone}
                icon="/phone.svg"
              />
              <ProfileElement
                title="Dirección"
                content={persona.address}
                icon="/location.svg"
              />
            </div>
          </div>

          {/* Buttons Section (20%) */}
          <div className="buttons-section">
            <button className="action-button" onClick={handleEditProfile}>
              Modificar Perfil
            </button>
            <button className="action-button" onClick={handleUpdatePassword}>
              Actualizar Contraseña
            </button>
          </div>
        </div>
        <HistorialActividad />
      </div>
      {modifyForm && (
        <ModifyForm
          nombre={persona.name}
          apellido={persona.lastName}
          correo={persona.email}
          telefono={persona.phone}
          direccion={persona.address}
          setModifyForm={setModifyForm}
        />
      )}
      {modifyPassword && (
        <ModifyPassword setModifyPassword={setModifyPassword} />
      )}
    </>
  );
}
