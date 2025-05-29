import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import "./Profile.css";
import ProfileElement from "./ProfileElement/ProfileElement";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

interface Persona {
  id: string;
  name: string;
  lastName: string;
  email: string;
  roleId: string;
}

// Datos simulados para persona
const personNueva: Persona = {
  id: "12345",
  name: "Juan",
  lastName: "Pérez",
  email: "juan.perez@example.com",
  roleId: "2",
};

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
        /*
        const response = await fetch(
          "http://localhost:5000/api/users/allUsers",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener usuarios");
        }
        const res = await fetch("http://localhost:5000/api/users/GetallRoles", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Error al obtener roles");
        }
        const data = await response.json();
        const currentUser = data.find(
          (prof: any) => prof.id === userData?.userId
        );

        if (!currentUser) {
          throw new Error("User not found");
        }

        setPersona(currentUser);*/
        setPersona(personNueva);
        setRole("Subastador");
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
  }, [userData?.userId]);

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
                title="Fecha de nacimiento"
                content={""}
                icon="/calendar.svg"
              />
              <ProfileElement
                title="Correo electrónico"
                content={persona.email}
                icon="/mail.svg"
              />
              <ProfileElement title="Teléfono" content={""} icon="/phone.svg" />
              <ProfileElement
                title="Dirección"
                content={""}
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
      </div>
    </>
  );
}
