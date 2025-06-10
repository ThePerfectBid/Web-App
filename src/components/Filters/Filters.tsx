import './Filters.css';



const Filters = (params:any) => {
  // Estado para el término de búsqueda

  // Manejador de cambio en la barra de búsqueda
  const handleSearchChange = (e:any) => {
    params.setSearchTerm(e.target.value);
  };

  // Manejador de cambio en los filtros
  const handleCategoryChange = (category: any) => {
    params.setSelectedCategory(category);
  };

  return (
    <div className="search-filter-container">
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar..."
          value={params.valueNavBar}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      {/* Filtros por categoría */}
      <div className="filter-buttons">
        {params.filters.map((category:string) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`filter-button ${params.valueFilter === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;