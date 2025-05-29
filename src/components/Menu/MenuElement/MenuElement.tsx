import { Link } from 'react-router-dom'
import './MenuElement.css'

interface MenuElementProps {
  text: string
  icon: string
  route?: string // Hacemos la ruta opcional para mantener compatibilidad
}

export default function MenuElement({ text, icon, route }: MenuElementProps) {
  // Si no hay ruta, renderizamos un div normal
  if (!route) {
    return (
      <div className="menu-element">
        <div className="menu-icon">
          <img src={icon} alt={text} />
        </div>
        <h2>{text}</h2>
      </div>
    )
  }

  // Si hay ruta, usamos Link para la navegación
  return (
    <Link to={route} className="menu-link">
      <div className="menu-element">
        <div className="menu-icon">
          <img src={icon} alt={text} />
        </div>
        <h2>{text}</h2>
      </div>
    </Link>
  )
}
