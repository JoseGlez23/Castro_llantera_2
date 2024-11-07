import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSidebar } from "../context/SidebarContext"; // Importar contexto
import axios from "axios";
import "../Filter.css";

function BarWithFilter({ onSearchResults }) {
  const { adminName, logout } = useAuth();
  const { isSidebarCollapsed } = useSidebar(); // Obtener estado del contexto


  // Estados para cada filtro
  const [filters, setFilters] = useState({
    marca: "",
    modelo: "",
    alto: "",
    ancho: "",
    pulgada: "",
    cantidad: "",
    precio: "",
    condicion: "",
  });

  // Manejar cambios en los campos de filtro
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Enviar la búsqueda
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/api/neumaticos", {
        params: filters, // Enviar filtros como parámetros de consulta
      });
      onSearchResults(response.data); // Actualiza los resultados de búsqueda en el componente padre
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  return (
    <div className={`filter-bar ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <div className="filter-bar-header">
        <div className="filter-text">BIENVENIDO {adminName.toUpperCase()}</div>
        <button className="close-session" onClick={logout}>
          CERRAR SESIÓN
        </button>
      </div>

      <form className="filter-form" onSubmit={handleSearch}>
        <div className="filter-field">
          <label htmlFor="marca">Marca</label>
          <input
            type="text"
            id="marca"
            name="marca"
            placeholder="Escribe Marca"
            value={filters.marca}
            onChange={handleChange}
          />
        </div>

        <div className="filter-field">
          <label htmlFor="modelo">Modelo</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            placeholder="Escribe Modelo"
            value={filters.modelo}
            onChange={handleChange}
          />
        </div>

        <div className="filter-field">
          <label htmlFor="alto">Alto</label>
          <input
            type="number"
            id="alto"
            name="alto"
            placeholder="Escribe Alto"
            value={filters.alto}
            onChange={handleChange}
          />
        </div>

        <div className="filter-field">
          <label htmlFor="ancho">Ancho</label>
          <input
            type="number"
            id="ancho"
            name="ancho"
            placeholder="Escribe Ancho"
            value={filters.ancho}
            onChange={handleChange}
          />
        </div>

        <div className="filter-field">
          <label htmlFor="pulgada">Pulgada</label>
          <input
            type="number"
            id="pulgada"
            name="pulgada"
            placeholder="Escribe Pulgada"
            value={filters.pulgada}
            onChange={handleChange}
          />
        </div>

        <div className="filter-field">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            placeholder="Escribe Cantidad"
            value={filters.cantidad}
            onChange={handleChange}
          />
        </div>

        <div className="filter-field">
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            name="precio"
            placeholder="Escribe Precio"
            value={filters.precio}
            onChange={handleChange}
          />
        </div>

        <div className="filter-field">
          <label htmlFor="condicion">Condición</label>
          <select
            id="condicion"
            name="condicion"
            value={filters.condicion}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
          </select>
        </div>

        <button type="submit" className="search-button">
          BUSCAR
        </button>
      </form>
    </div>
  );
}

export default BarWithFilter;
