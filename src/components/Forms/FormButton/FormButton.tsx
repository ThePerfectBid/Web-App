import './FormButton.css'

interface ButtonProps {
  handle: () => void
  text: string
  disabled?: boolean
}

export default function FormButton({ handle, text, disabled = false }: ButtonProps) {
  return (
    <button
      className={`button ${disabled ? 'button--disabled' : ''}`}
      onClick={handle}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
