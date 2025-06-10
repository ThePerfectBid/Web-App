import { useState } from "react";
import { Form } from "../../Forms/Form/Form";
import FormCard from "../../Forms/FormCard/FormCard";
import Field from "../../Forms/Field/Field";
import FormButton from "../../Forms/FormButton/FormButton";
import "../../Profile/ModifyForm/ModifyForm.css";
import "./SubastaEdit.css";
import { type SubastaI, type EstadoSubasta } from "../Subasta/Subasta";

interface SubastaFormProps {
  setModifyForm: (value: boolean) => void;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  base: number;
  duracion: number;
  incremento: number;
  precio_reserva: number;
  tipo_subasta: string;
  estado: EstadoSubasta;
  isAddMode?: boolean;
}

export default function SubastaModifyForm({
  setModifyForm,
  nombre,
  descripcion,
  imagen,
  precio,
  base,
  duracion,
  incremento,
  precio_reserva,
  tipo_subasta,
  estado,
  isAddMode = false,
}: SubastaFormProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [SubastaI, setSubastaI] = useState<SubastaI>({
    nombre,
    descripcion,
    imagen,
    precio,
    base,
    duracion,
    incremento,
    precio_reserva,
    tipo_subasta,
    estado,
  });

  const handleInputChange = (field: keyof SubastaI) => (value: string) => {
    setSubastaI((prev) => ({
      ...prev,
      [field]:
        field === "precio" ||
        field === "base" ||
        field === "incremento" ||
        field === "precio_reserva" ||
        field === "duracion"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const confirmChanges = () => {
    if (isAddMode) {
      //post
    } else {
      //put
    }
    setShowConfirmation(false);
    setModifyForm(false);
    console.log("Datos de subasta enviados al backend:", SubastaI);
  };

  const cancelChanges = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="floating-form-container">
        <Form
          formName={
            isAddMode ? "Agregar Nueva Subasta" : "Modificación de Subasta"
          }
          className="floating-form"
          size="large"
          setModifyForm={setModifyForm}
        >
          <FormCard
            cardTitle={
              isAddMode ? "Nueva Subasta" : "Información de la Subasta"
            }
            text={
              isAddMode
                ? "Por favor completa los datos de la nueva subasta"
                : "Por favor actualiza los datos de la subasta"
            }
          />

          <div className="Form-content">
            <Field
              name="Nombre de la subasta"
              placeHolder="nombre de la subasta"
              value={SubastaI.nombre}
              setValue={handleInputChange("nombre")}
            />

            <Field
              name="Descripción"
              placeHolder="descripción"
              value={SubastaI.descripcion}
              setValue={handleInputChange("descripcion")}
              textarea
            />

            <Field
              name="Imagen (URL)"
              placeHolder="URL de la imagen"
              value={SubastaI.imagen}
              setValue={handleInputChange("imagen")}
            />

            <Field
              name="Precio actual"
              placeHolder="precio actual"
              value={SubastaI.precio.toString()}
              setValue={handleInputChange("precio")}
              type="number"
            />

            <Field
              name="Precio base"
              placeHolder="precio base"
              value={SubastaI.base.toString()}
              setValue={handleInputChange("base")}
              type="number"
            />

            <Field
              name="Duración (horas)"
              placeHolder="duración en horas"
              value={SubastaI.duracion.toString()}
              setValue={handleInputChange("duracion")}
              type="number"
            />

            <Field
              name="Incremento mínimo"
              placeHolder="incremento mínimo"
              value={SubastaI.incremento.toString()}
              setValue={handleInputChange("incremento")}
              type="number"
            />

            <Field
              name="Precio de reserva"
              placeHolder="precio de reserva"
              value={SubastaI.precio_reserva.toString()}
              setValue={handleInputChange("precio_reserva")}
              type="number"
            />

            <Field
              name="Tipo de subasta"
              placeHolder="tipo de subasta"
              value={SubastaI.tipo_subasta}
              setValue={handleInputChange("tipo_subasta")}
            />

            <div className="input-options">
              <label>Estado</label>
              <select
                value={SubastaI.estado}
                onChange={(e) => handleInputChange("estado")(e.target.value)}
                className="form-select"
              >
                <option value="Pending">Pendiente</option>
                <option value="Active">Activa</option>
                <option value="Ended">Finalizada</option>
                <option value="Cancelled">Cancelada</option>
                <option value="Deserted">Desertada</option>
                <option value="Completed">Completada</option>
              </select>
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
            <p>
              {isAddMode
                ? "Confirma la creación de la subasta"
                : "¿Estás seguro de que deseas actualizar la información de la subasta?"}
            </p>
            <div className="confirmation-buttons">
              <FormButton text="Confirmar" handle={confirmChanges} />
              <FormButton text="Cancelar" handle={cancelChanges} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
