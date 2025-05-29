import { useEffect, useState } from 'react'
import './EditRoles.css'
import Role from './Role/Role'
import { RoleI } from './Role/Role'
import { authService } from '../../services/authService'

interface EditRolesProps {
  setEditRole: (value: boolean) => void
  setMarked: (role: RoleI) => void
  marked: RoleI
  editRole: boolean
}

export default function EditRoles({ setEditRole, setMarked, marked, editRole }: EditRolesProps) {
  const [allRoles, setAllRoles] = useState<RoleI[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        /*const token = authService.getToken()
        if (!token) {
          throw new Error('No authentication token found')
        }

        const response = await fetch('http://localhost:5028/api/users/GetallRoles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Error al obtener roles')
        }

        const data = await response.json()*/
        //setAllRoles(data)
        const data: RoleI[] = [
          { id: '1', name: 'Administrador' },
          { id: '2', name: 'Postor' },
          { id: '3', name: 'Subastador' },
          { id: '4', name: 'Soporte' },
        ]
        setAllRoles(data)
      } catch (err) {
        console.error('Error fetching roles:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchRoles()
  }, [])

  if (loading) {
    return <div>Cargando roles...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }
  return (
    <div className="edit-roles">
      <h3>Editar Roles</h3>
      <div className="roles-map">
        {allRoles.map((role) => (
          <Role key={role.id} role={role} setEditRole={setEditRole} setMarked={setMarked} />
        ))}
      </div>
    </div>
  )
}
