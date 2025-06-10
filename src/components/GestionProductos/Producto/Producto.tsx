import { useState } from "react";
import "./Producto.css";
import FormButton from "../../Forms/FormButton/FormButton";

export interface ProductoI {
  name: string;
  category: string;
  cost: string;
  description: string;
  image: string;
}

export default function Producto(params: any) {
  const onClick = () => {
    const actualProduct: ProductoI = {
      name: params.name,
      category: params.category,
      cost: params.cost,
      description: params.description,
      image: params.image,
    };

    params.setMarked(actualProduct);
    params.setModifyForm(!params.modifyForm);
  };

  const [deleteP, setDeleteP] = useState(false);
  const confirmChanges = () => {
    setDeleteP(false);
  };

  const cancelChanges = () => {
    setDeleteP(false);
  };

  return (
    <>
      <div className="producto-compact">
        <div className="producto-header">
          <div className="producto-image">
            <img src={params.image} alt={params.name} />
          </div>
          <h3>{params.name}</h3>
        </div>

        <div className="producto-body">
          <p className="descripcion">{params.description}</p>

          <div className="price-info">
            <div className="price-current">
              <span>Precio:</span>
              <strong>${params.cost}</strong>
            </div>
          </div>

          <div className="producto-meta">
            <span className="category">{params.category}</span>
          </div>
        </div>

        <div className="edit-buttons">
          <button
            className="delete-button"
            onClick={() => {
              setDeleteP(true);
            }}
          >
            Eliminar
          </button>
          <button className="edit-button-product" onClick={onClick}>
            Editar
          </button>
        </div>
      </div>

      {deleteP && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <h4>¿Confirmar eliminacion?</h4>
            <br />
            <p>Estas seguro de que deseas eliminar este producto? </p>
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
