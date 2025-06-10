import { useEffect, useState } from "react";
import "./EditRoles.css";
import Role from "./Role/Role";
import type { RoleI } from "./Role/Role";
import { authService } from "../../services/authService";

interface EditRolesProps {
  setEditRole: (value: boolean) => void;
  setMarked: (role: RoleI) => void;
}

export default function EditRoles({ setEditRole, setMarked }: EditRolesProps) {
  const [allRoles, setAllRoles] = useState<RoleI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = authService.getToken();

        if (!token) {
          throw new Error("No authentication token found");
        }
        /*
        const response = await fetch(
          "http://localhost:8085/api/users/GetallRoles",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener roles");
        }

        const data = await response.json();*/
        const data: RoleI[] = [
          {
            id: "role_admin",
            name: "Administrador",
          },
          {
            id: "role_editor",
            name: "Editor",
          },
          {
            id: "role_viewer",
            name: "Lector",
          },
          {
            id: "role_guest",
            name: "Invitado",
          },
          {
            id: "role_support",
            name: "Soporte Técnico",
          },
          {
            id: "role_analyst",
            name: "Analista",
          },
          {
            id: "role_developer",
            name: "Desarrollador",
          },
          {
            id: "role_manager",
            name: "Gerente",
          },
          {
            id: "role_auditor",
            name: "Auditor",
          },
          {
            id: "role_sales",
            name: "Ventas",
          },
        ];
        setAllRoles(data);
      } catch (err) {
        console.error("Error fetching roles:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) {
    return <div>Cargando roles...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  return (
    <div className="edit-roles">
      <h3>Editar Roles</h3>
      <div className="roles-map">
        {allRoles.map((role) => (
          <Role
            key={role.id}
            role={role}
            setEditRole={setEditRole}
            setMarked={setMarked}
          />
        ))}
      </div>
    </div>
  );
}
