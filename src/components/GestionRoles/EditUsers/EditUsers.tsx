import { useEffect, useState } from "react";
import "./EditUsers.css";
import User, { type UserI } from "./User/User";
import { authService } from "../../services/authService";

interface UsersProps {
  setEditUser: (value: boolean) => void;
  setMarkedUser: (user: UserI) => void;
}

export default function Users({ setEditUser, setMarkedUser }: UsersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState<UserI[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = async () => {
      try {
        const token = authService.getToken();
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          `http://localhost:8085/api/users/allUsers`,
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

        const data = await response.json();

        setAllUsers(data);
      } catch (error) {
        console.error("Error fetcheando roles:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      }
    };
    auth();
  }, []);

  const filteredUsers = allUsers?.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <h3>Administrar Usuarios</h3>
      <div className="users-search">
        <input
          type="text"
          placeholder="Buscar usuario por email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="users-map">
        {filteredUsers?.map((user) => (
          <User
            key={user.id}
            user={user}
            setEditUser={setEditUser}
            setMarkedUser={setMarkedUser}
          />
        ))}
      </div>
      {error && <div className="error">error</div>}
    </div>
  );
}
