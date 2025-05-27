import './Form.css'

export const Form = (params: any) => {
  let className
  if (!params.className) {
    className =
      params.size === 'small'
        ? 'form-small'
        : params.size === 'large'
        ? 'form-large'
        : 'form-middle'
  } else {
    className = params.className
  }

  const closeForm = () => {
    params.setModifyForm(false)
  }

  return (
    <form className={className} onSubmit={(e) => e.preventDefault()}>
      {params.className === 'floating-form' && (
        <button className="close-button" onClick={closeForm} type="button">
          ×
        </button>
      )}
      <h3>{params.formName}</h3>
      {params.children}
    </form>
  )
}
