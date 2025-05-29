import { useState } from 'react'
import { Form } from '../../Forms/Form/Form'
import FormCard from '../../Forms/FormCard/FormCard'
import Field from '../../Forms/Field/Field'
import FormButton from '../../Forms/FormButton/FormButton'
import './ModifyForm.css'

interface ProfileData {
  nombre: string
  apellido: string
  fechaNacimiento: string
  correo: string
  telefono: string
  direccion: string
  fechaIngreso: string
}

interface FloatingFormProps {
  setModifyForm: (value: boolean) => void
  nombre: string
  apellido: string
  fechaNacimiento: string
  correo: string
  telefono: string
  direccion: string
  fechaIngreso: string
}

export default function ModifyForm({
  setModifyForm,
  nombre,
  apellido,
  fechaNacimiento,
  correo,
  telefono,
  direccion,
  fechaIngreso,
}: FloatingFormProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    nombre: nombre,
    apellido: apellido,
    fechaNacimiento: fechaNacimiento,
    correo: correo,
    telefono: telefono,
    direccion: direccion,
    fechaIngreso: fechaIngreso,
  })

  const handleInputChange = (field: keyof ProfileData) => (value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    setShowConfirmation(true)
  }

  const confirmChanges = async () => {
    try {
      /*const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Enviar todos los permisos seleccionados en una sola petición POST
    const responseAdd = await fetch(`http://localhost:5028/api/update/${userId}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        permissionsToAdd: selectedPermisos,
        permissionsToRemove: remove
      })
    });

    if (!responseAdd.ok) {
      throw new Error('Error al actualizar los permisos');
    }

    const result = await responseAdd.json();
    console.log('Permisos actualizados correctamente:', result);
*/
      setShowConfirmation(false)
      setModifyForm(false)
    } catch (error) {
      console.error('Error al guardar permisos:', error)
    }
  }
  const cancelChanges = () => {
    setShowConfirmation(false)
  }

  return (
    <>
      <div className="floating-form-container">
        <Form
          formName="Modificación de Perfil"
          className="floating-form"
          size="large"
          setModifyForm={setModifyForm}
        >
          <FormCard
            cardTitle="Información Personal"
            text="Por favor actualiza tus datos personales"
          />

          <div className="Form-content">
            <Field
              name="Nombre completo"
              placeHolder="tu nombre"
              value={profileData.nombre}
              setValue={handleInputChange('nombre')}
            />
            <Field
              name="Apellido"
              placeHolder="Tu apellido"
              value={profileData.apellido}
              setValue={handleInputChange('apellido')}
            />
            <Field
              name="Fecha de nacimiento"
              placeHolder="fecha de nacimiento (DD/MM/AAAA)"
              value={profileData.fechaNacimiento}
              setValue={handleInputChange('fechaNacimiento')}
            />

            <Field
              name="Correo electrónico"
              placeHolder="correo electrónico"
              value={profileData.correo}
              setValue={handleInputChange('correo')}
            />

            <Field
              name="Teléfono"
              placeHolder="teléfono"
              value={profileData.telefono}
              setValue={handleInputChange('telefono')}
            />

            <Field
              name="Dirección"
              placeHolder="dirección"
              value={profileData.direccion}
              setValue={handleInputChange('direccion')}
            />
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
            <p>¿Estás seguro de que deseas actualizar tu información de perfil?</p>
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
