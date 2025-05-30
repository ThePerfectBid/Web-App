import { useState, useEffect } from "react";
import EditRoles from "./EditRoles/EditRoles";
import "./GestionRoles.css";
import EditUsers from "./EditUsers/EditUsers";
import RoleModifyForm from "./RoleModifyForm/RoleModifyForm";
import UserModify from "./UserModify/UserModify";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ErrorPage from "../Error/ErrorPage";
import type { RoleI } from "./EditRoles/Role/Role";
import type { UserI } from "./EditUsers/User/User";
import { authService } from "../services/authService";

export default function GestionRoles() {
  const [editRole, setEditRole] = useState(false);
  const [marked, setMarked] = useState<RoleI>({ name: "", id: "" });
  const [editUser, setEditUser] = useState(false);
  const [markedUser, setMarkedUser] = useState<UserI>({ email: "", id: "" });
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { userData } = useAuth(); // Mantenido pero marcado como no usado

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        //Obtencion de token
        const token = authService.getToken();
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

        const roles = await response.json();

        // Buscamos el rol del usuario actual
        const userRole = roles.find(
          (role: any) => role.id === userData?.roleId
        );

        if (!userRole) {
          setIsAdmin(false);
          return;
        }

        // Verificar si el usuario tiene rol de administrador
        setIsAdmin(userRole === "6818b6ff035415cfcd8aa229");
      } catch (error) {
        console.error("Error verificando roles:", error);
        navigate("/login");
        setIsAdmin(false);
      }
    };

    checkAdminRole();
  }, [navigate, userData]); // Agregado userData para eliminar warning

  if (isAdmin === null) {
    return <LoadingSpinner />;
  }

  if (!isAdmin) {
    return (
      <ErrorPage
        title={"Non authorized"}
        message={"Usted no tiene los permisos necesarios"}
        code={"401"}
      />
    );
  }

  return (
    <div className="gestion-roles-container">
      <div className="header">
        <h2>Administración de roles y permisos</h2>
      </div>
      <div className="content-roles">
        <EditRoles setEditRole={setEditRole} setMarked={setMarked} />
        <EditUsers setEditUser={setEditUser} setMarkedUser={setMarkedUser} />
      </div>
      {editRole && (
        <RoleModifyForm setModifyForm={setEditRole} roleId={marked.id} />
      )}
      {editUser && (
        <UserModify
          setModifyForm={setEditUser}
          userEmail={markedUser.email}
          userId={markedUser.id}
        />
      )}
    </div>
  );
}
