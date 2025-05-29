import './Role.css'

export interface RoleI {
  id: string
  name: string
}

interface RoleProps {
  role: RoleI
  setEditRole: (value: boolean) => void
  setMarked: (role: RoleI) => void
}

export default function Role({ role, setEditRole, setMarked }: RoleProps) {
  const onClick = () => {
    setMarked(role)
    setEditRole(true)
  }

  return (
    <div className="role-card">
      <h4>{role.name}</h4>
      <div className="role-actions">
        <button onClick={onClick}>Editar</button>
      </div>
    </div>
  )
}
