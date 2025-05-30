import { useState } from "react";
import "./EditUsers.css";
import User, { UserI } from "./User/User";

interface UsersProps {
  setEditUser: (value: boolean) => void;
  setMarkedUser: (user: UserI) => void;
}

export default function Users({ setEditUser, setMarkedUser }: UsersProps) {
  const [allUsers, _setAllUsers] = useState<UserI[]>([
    { id: "1", email: "admin@example.com" },
    { id: "2", email: "editor@example.com" },
    { id: "3", email: "user@example.com" },
    { id: "4", email: "guest@example.com" },
    { id: "1", email: "admin@example.com" },
    { id: "2", email: "editor@example.com" },
    { id: "3", email: "user@example.com" },
    { id: "4", email: "guest@example.com" },
    { id: "1", email: "admin@example.com" },
    { id: "2", email: "editor@example.com" },
    { id: "3", email: "user@example.com" },
    { id: "4", email: "guest@example.com" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = allUsers.filter((user) =>
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
        {filteredUsers.map((user) => (
          <User
            key={user.id}
            user={user}
            setEditUser={setEditUser}
            setMarkedUser={setMarkedUser}
          />
        ))}
      </div>
    </div>
  );
}
