<<<<<<< HEAD
import { useState, useEffect } from 'react'
import { Form } from '../../Forms/Form/Form'
import FormCard from '../../Forms/FormCard/FormCard'
import FormButton from '../../Forms/FormButton/FormButton'
import './UserModify.css'
import { useAuth } from '../../context/AuthContext'
import { authService } from '../../services/authService'

interface Rol {
  id: string
  nombre: string
}

interface UserModifyProps {
  setModifyForm: (value: boolean) => void
  userEmail: string // Email del usuario que se está modificando
  userId: string // ID del usuario para la petición al backend
}

export default function UserModify({ setModifyForm, userEmail, userId }: UserModifyProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRolId, setSelectedRolId] = useState<string>('')
  const [roles, setRoles] = useState<Rol[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { userData } = useAuth()
=======
import { useState, useEffect } from "react";
import { Form } from "../../Forms/Form/Form";
import FormCard from "../../Forms/FormCard/FormCard";
import FormButton from "../../Forms/FormButton/FormButton";
import "./UserModify.css";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

interface Rol {
  id: string;
  nombre: string;
}

interface UserModifyProps {
  setModifyForm: (value: boolean) => void;
  userEmail: string; // Email del usuario que se está modificando
  userId: string; // ID del usuario para la petición al backend
}

export default function UserModify({
  setModifyForm,
  userEmail,
  userId,
}: UserModifyProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRolId, setSelectedRolId] = useState<string>("");
  const [roles, setRoles] = useState<Rol[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useAuth();
>>>>>>> main

  // Simular carga de roles desde backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        //Obtener token
<<<<<<< HEAD
        // const token = authService.getToken()
=======
        const token = authService.getToken();
        if (!token) {
          throw new Error("No authentication token found");
        }
>>>>>>> main
        //Hacer fetch al rol utilizando el roleID del user Data
        // Petición al endpoint para obtener todos los roles
        /*  const response = await fetch('http://localhost:5028/api/users/GetallRoles', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Error al obtener roles')
        }*/
        //mandarle el token
        // const data:Rol[] = reponse;
        // Datos de ejemplo
        const data: Rol[] = [
<<<<<<< HEAD
          { id: '1', nombre: 'Administrador' },
          { id: '2', nombre: 'Editor' },
          { id: '3', nombre: 'Consultor' },
          { id: '4', nombre: 'Invitado' },
        ]

        setRoles(data)
      } catch (error) {
        console.error('Error fetching roles:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoles()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleRolSelection = (id: string) => {
    setSelectedRolId(id)
  }

  const handleSubmit = () => {
    if (selectedRolId) {
      setShowConfirmation(true)
    }
  }

  const confirmChanges = async () => {
    try {
=======
          { id: "1", nombre: "Administrador" },
          { id: "2", nombre: "Editor" },
          { id: "3", nombre: "Consultor" },
          { id: "4", nombre: "Invitado" },
        ];

        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRolSelection = (id: string) => {
    setSelectedRolId(id);
  };

  const handleSubmit = () => {
    if (selectedRolId) {
      setShowConfirmation(true);
    }
  };

  const confirmChanges = async () => {
    try {
      const email = userData?.email;
      console.log(email);
>>>>>>> main
      //const token = authService.getToken()
      /*
      await fetch(`/api/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rolId: selectedRolId })
      })
      */
<<<<<<< HEAD
      console.log(`Asignando rol ${selectedRolId} al usuario ${userId}`)

      setShowConfirmation(false)
      setModifyForm(false)
    } catch (error) {
      console.error('Error al asignar rol:', error)
    }
  }

  const cancelChanges = () => {
    setShowConfirmation(false)
  }
=======
      console.log(`Asignando rol ${selectedRolId} al usuario ${userId}`);

      setShowConfirmation(false);
      setModifyForm(false);
    } catch (error) {
      console.error("Error al asignar rol:", error);
    }
  };

  const cancelChanges = () => {
    setShowConfirmation(false);
  };
>>>>>>> main

  // Filtrar roles según término de búsqueda
  const filteredRoles = roles.filter((rol) =>
    rol.nombre.toLowerCase().includes(searchTerm.toLowerCase())
<<<<<<< HEAD
  )

  if (isLoading) return <div>Cargando roles...</div>
=======
  );

  if (isLoading) return <div>Cargando roles...</div>;
>>>>>>> main

  return (
    <>
      <div className="floating-form-container">
        <Form
          formName="Asignación de rol al usuario"
          className="floating-form"
          size="large"
          setModifyForm={setModifyForm}
        >
          <FormCard
            cardTitle={`Asignar rol a ${userEmail}`}
            text="Seleccione un rol para asignar al usuario"
          />

          <div className="Form-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar roles..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>

            <div className="roles-list">
              {filteredRoles.length > 0 ? (
                filteredRoles.map((rol) => (
                  <div key={rol.id} className="role-item">
                    <label>
                      <input
                        type="radio"
                        name="userRole"
                        checked={selectedRolId === rol.id}
                        onChange={() => handleRolSelection(rol.id)}
                      />
                      <span className="role-nombre">{rol.nombre}</span>
                    </label>
                  </div>
                ))
              ) : (
                <p>No se encontraron roles</p>
              )}
            </div>
          </div>

          <div className="buttons-footer">
<<<<<<< HEAD
            <FormButton text="Guardar Cambios" handle={handleSubmit} disabled={!selectedRolId} />
=======
            <FormButton
              text="Guardar Cambios"
              handle={handleSubmit}
              disabled={!selectedRolId}
            />
>>>>>>> main
          </div>
        </Form>
      </div>

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <h4>¿Confirmar cambios?</h4>
            <br />
<<<<<<< HEAD
            <p>¿Estás seguro de que deseas asignar este rol al usuario {userEmail}?</p>
=======
            <p>
              ¿Estás seguro de que deseas asignar este rol al usuario{" "}
              {userEmail}?
            </p>
>>>>>>> main
            <div className="confirmation-buttons">
              <FormButton text="Confirmar" handle={confirmChanges} />
              <FormButton text="Cancelar" handle={cancelChanges} />
            </div>
          </div>
        </div>
      )}
    </>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> main
}
