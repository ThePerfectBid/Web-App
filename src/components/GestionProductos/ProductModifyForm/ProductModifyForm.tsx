import { useState } from "react";
import { Form } from "../../Forms/Form/Form";
import FormCard from "../../Forms/FormCard/FormCard";
import Field from "../../Forms/Field/Field";
import FormButton from "../../Forms/FormButton/FormButton";
import "../../Profile/ModifyForm/ModifyForm.css";

interface ProductData {
  name: string;
  category: string;
  cost: string;
  description: string;
  image: string;
}

interface ProductFormProps {
  setModifyForm: (value: boolean) => void;
  name: string;
  category: string;
  cost: string;
  description: string;
  image: string;
  isAddMode?: boolean;
}

export default function ProductModifyForm({
  setModifyForm,
  name,
  category,
  cost,
  description,
  image,
  isAddMode = false,
}: ProductFormProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productData, setProductData] = useState<ProductData>({
    name: name,
    category: category,
    cost: cost,
    description: description,
    image: image,
  });

  const handleInputChange = (field: keyof ProductData) => (value: string) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const confirmChanges = () => {
    setShowConfirmation(false);
    setModifyForm(false);
    // Aquí iría la petición al backend
    console.log("Datos del producto enviados al backend:", productData);
  };

  const cancelChanges = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="floating-form-container">
        <Form
          formName={isAddMode ? "Agregar Producto" : "Modificación de Producto"}
          className="floating-form"
          size="large"
          setModifyForm={setModifyForm}
        >
          <FormCard
            cardTitle="Información del Producto"
            text={
              isAddMode
                ? "Por favor ingresa los datos del producto"
                : "Por favor actualiza los datos del producto"
            }
          />

          <div className="Form-content-large">
            <Field
              name="Nombre del producto"
              placeHolder="nombre del producto"
              value={productData.name}
              setValue={handleInputChange("name")}
            />

            <Field
              name="Categoría"
              placeHolder="categoría"
              value={productData.category}
              setValue={handleInputChange("category")}
            />

            <Field
              name="Precio"
              placeHolder="precio"
              value={productData.cost}
              setValue={handleInputChange("cost")}
            />

            <Field
              name="Descripción"
              placeHolder="descripción"
              value={productData.description}
              setValue={handleInputChange("description")}
              textarea
            />

            <Field
              name="Imagen (URL)"
              placeHolder="URL de la imagen"
              value={productData.image}
              setValue={handleInputChange("image")}
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
            <p>
              {isAddMode
                ? "Confirma la creación del producto"
                : "¿Estás seguro de que deseas actualizar la información del producto?"}
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
