import { useState, useEffect } from 'react'
import { Form } from '../../Forms/Form/Form'
import FormCard from '../../Forms/FormCard/FormCard'
import FormButton from '../../Forms/FormButton/FormButton'
import './RoleModifyForm.css'
import { authService } from '../../services/authService'

interface Permiso {
  id: string
  nombre: string
}

interface RoleFormProps {
  setModifyForm: (value: boolean) => void
  roleId: string
}

export default function RoleModifyForm({ setModifyForm, roleId }: RoleFormProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [permisos, setPermisos] = useState<Permiso[]>([])
  const [remove, setRemove] = useState<string[]>([])
  const [selectedPermisos, setSelectedPermisos] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Simular carga de permisos desde backend
  useEffect(() => {
    const fetchPermisos = async () => {
      try {
        //const token = authService.getToken()
        // Petición al endpoint para obtener todos los permisos
        /*  const response = await fetch('http://localhost:5028/api/users/allPermissions', {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                })
                if (!response.ok) {
                  throw new Error('Error al obtener permisos')
                }*/
        // const data: Permiso[] = response
        // Datos de ejemplo
        const data: Permiso[] = [
          { id: '1', nombre: 'Crear usuarios' },
          { id: '2', nombre: 'Editar roles' },
          { id: '3', nombre: 'Eliminar contenido' },
          { id: '4', nombre: 'Ver reportes' },
          { id: '5', nombre: 'Gestionar permisos' },
        ]

        setPermisos(data)
      } catch (error) {
        console.error('Error fetching permisos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPermisos()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const togglePermiso = (id: string) => {
    setSelectedPermisos((prev) =>
      prev.includes(id) ? prev.filter((permisoId) => permisoId !== id) : [...prev, id]
    )

    // Actualizar los permisos a remover (los no seleccionados)
    setRemove(
      permisos
        .filter((permiso) => !selectedPermisos.includes(permiso.id) && permiso.id !== id)
        .map((permiso) => permiso.id)
    )
  }

  const handleSubmit = () => {
    // Actualizar la lista de permisos a remover antes de mostrar la confirmación
    setRemove(
      permisos
        .filter((permiso) => !selectedPermisos.includes(permiso.id))
        .map((permiso) => permiso.id)
    )
    setShowConfirmation(true)
  }

  const confirmChanges = async () => {
    try {
      // const token = authService.getToken()

      // Enviar cada permiso seleccionado al backend para agregar
      for (const permisoId of selectedPermisos) {
        // await fetch(`http://localhost:5028/api/${roleId}/add-permission`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`
        //   },
        //   body: JSON.stringify({ permisoId })
        // })
        console.log(`Agregando permiso: ${permisoId}`)
      }

      // Eliminar los permisos no seleccionados
      for (const permisoId of remove) {
        // await fetch(`http://localhost:5028/api/${roleId}/remove-permission/${permisoId}`, {
        //   method: 'DELETE',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`
        //   }
        // })
        console.log(`Eliminando permiso: ${permisoId}`)
      }

      setShowConfirmation(false)
      setModifyForm(false)
    } catch (error) {
      console.error('Error al guardar permisos:', error)
    }
  }

  const cancelChanges = () => {
    setShowConfirmation(false)
  }

  // Filtrar permisos según término de búsqueda
  const filteredPermisos = permisos.filter((permiso) =>
    permiso.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <div>Cargando permisos...</div>

  return (
    <>
      <div className="floating-form-container">
        <Form
          formName="Modificación de permisos del rol"
          className="floating-form"
          size="large"
          setModifyForm={setModifyForm}
        >
          <FormCard
            cardTitle="Seleccione permisos para el rol"
            text="Por favor selecciona los permisos deseados para el rol"
          />

          <div className="Form-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar permisos..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>

            <div className="permisos-list">
              {filteredPermisos.length > 0 ? (
                filteredPermisos.map((permiso) => (
                  <div key={permiso.id} className="permiso-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedPermisos.includes(permiso.id)}
                        onChange={() => togglePermiso(permiso.id)}
                      />
                      <span className="permiso-nombre">{permiso.nombre}</span>
                    </label>
                  </div>
                ))
              ) : (
                <p>No se encontraron permisos</p>
              )}
            </div>
          </div>

          <div className="buttons-footer">
            <FormButton text="Guardar Cambios" handle={handleSubmit} />
          </div>
        </Form>
      </div>

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <h4>¿Confirmar cambios?</h4>
            <br />
            <p>¿Estás seguro de que deseas actualizar los permisos del Rol?</p>
            <div className="confirmation-buttons">
              <FormButton text="Confirmar" handle={confirmChanges} />
              <FormButton text="Cancelar" handle={cancelChanges} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
