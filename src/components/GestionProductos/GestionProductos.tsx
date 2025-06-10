import { useState } from "react";
import "./GestionProductos.css";
import Producto, { type ProductoI } from "./Producto/Producto";
import ProductModifyForm from "./ProductModifyForm/ProductModifyForm";

export default function GestionProductos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modifyForm, setModifyForm] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const voidProducto: ProductoI = {
    name: "",
    category: "",
    cost: "",
    description: "",
    image: "",
  };
  const [marked, setMarked] = useState(voidProducto);
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const categories = [
    "Todas",
    "Hogar",
    "Tecnología",
    "Personal",
    "Arte y Entretenimiento",
    "Utilidades",
  ];

  const productos = [
    {
      id: 1,
      name: "Vehiculo",
      cost: "100",
      image: "https://picsum.photos/200/300",
      category: "Hogar",
      description: "Un vehiculo automotriz",
    },
    {
      id: 2,
      name: "Laptop",
      cost: "500",
      image: "https://picsum.photos/200/301",
      category: "Tecnología",
      description: "Una laptop de alta gama",
    },
    {
      id: 3,
      name: "Mueble",
      cost: "200",
      image: "https://picsum.photos/200/302",
      category: "Hogar",
      description: "Un mueble de diseño",
    },
    {
      id: 4,
      name: "Tableta",
      cost: "300",
      image: "https://picsum.photos/200/303",
      category: "Tecnología",
      description: "Una tableta de alta resolución",
    },
    {
      id: 5,
      name: "Pintura",
      cost: "150",
      image: "https://picsum.photos/200/304",
      category: "Arte y Entretenimiento",
      description: "Una pintura de arte",
    },
  ];

  const filteredProductos = productos.filter((producto) => {
    if (selectedCategory === "Todas") {
      return producto.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        producto.category === selectedCategory &&
        producto.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  const handleAddProduct = () => {
    setIsAddMode(true);
    console.log(modifyForm);
  };

  return (
    <div className="gestion-productos-container">
      <div className="header-container">
        <h2>Productos</h2>
        <button className="add-button" onClick={handleAddProduct}>
          + Agregar Producto
        </button>
      </div>

      <div className="filters-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="productos-grid">
        {filteredProductos.map((producto) => (
          <Producto
            key={producto.id}
            name={producto.name}
            cost={producto.cost}
            image={producto.image}
            category={producto.category}
            description={producto.description}
            setModifyForm={setModifyForm}
            modifyForm={modifyForm}
            setMarked={(a: ProductoI) => {
              setMarked(a);
            }}
          />
        ))}
      </div>

      {modifyForm && (
        <ProductModifyForm
          name={marked.name}
          category={marked.category}
          cost={marked.cost}
          description={marked.description}
          image={marked.image}
          setModifyForm={setModifyForm}
        />
      )}
      {isAddMode && (
        <ProductModifyForm
          name={""}
          category={""}
          cost={""}
          description={""}
          image={""}
          setModifyForm={setIsAddMode}
          isAddMode={true}
        />
      )}
    </div>
  );
}
