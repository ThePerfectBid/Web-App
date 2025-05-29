import './User.css'

export interface UserI {
  id: string
  email: string
}

interface UserProps {
  user: UserI
  setEditUser: (value: boolean) => void
  setMarkedUser: (user: UserI) => void
}

export default function User({ user, setEditUser, setMarkedUser }: UserProps) {
  const onClick = () => {
    setMarkedUser(user)
    setEditUser(true)
  }

  return (
    <div className="user-card">
      <h4>{user.email}</h4>
      <div className="user-actions">
        <button onClick={onClick}>Editar</button>
      </div>
    </div>
  )
}
