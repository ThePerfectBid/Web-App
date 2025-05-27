import { useNavigate } from 'react-router-dom'
import './ErrorPage.css'

export default function NotFound(params: any) {
  const navigate = useNavigate()

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">{params.code}</div>
        <h1 className="error-title">{params.title}</h1>
        <p className="error-message">{params.message}</p>
        <button className="home-button" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    </div>
  )
}
