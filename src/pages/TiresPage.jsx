import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import BarWithFilter from "../components/BarWithFilter";
import TireCard from "../components/TireCard";
import { SidebarProvider } from "../context/SidebarContext"; // Importar el proveedor
import "../TiresPage.css"; // Archivo CSS para personalizar la disposición y el estilo de la página

export const TiresPage = () => {
  const [tires, setTires] = useState([]); // Estado para almacenar todos los neumáticos
  const [filteredTires, setFilteredTires] = useState([]); // Estado para almacenar neumáticos filtrados

  // Obtener los datos de los neumáticos desde la API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/neumaticos")
      .then((response) => {
        setTires(response.data);
        setFilteredTires(response.data); // Inicialmente, muestra todos los neumáticos
      })
      .catch((error) => console.error("Error al obtener neumáticos:", error));
  }, []);

  // Callback para manejar los resultados de búsqueda
  const handleSearchResults = (results) => {
    setFilteredTires(results);
  };

  // Funciones de edición y eliminación
  const handleEdit = (tire) => {
    console.log("Editar neumático:", tire);
    // Implementa la lógica de edición aquí
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/neumaticos/${id}`)
      .then(() => {
        setTires((prevTires) => prevTires.filter((tire) => tire.id !== id));
        setFilteredTires((prevFiltered) =>
          prevFiltered.filter((tire) => tire.id !== id)
        );
      })
      .catch((error) => console.error("Error al eliminar neumático:", error));
  };

  return (
    <SidebarProvider> {/* Envolver en el contexto */}
    <div>
      {/* Pasar handleSearchResults al componente BarWithFilter */}
      <BarWithFilter onSearchResults={handleSearchResults} />
      <div className="container_main">
        <Sidebar />
        <div className="background">
          <h1 style={{ marginTop: "120px", color: "white" }}>
            Stock de Llantas
          </h1>
          <div className="tires-grid">
            {filteredTires.length > 0 ? (
              filteredTires.map((tire) => (
                <TireCard
                  key={tire.id}
                  tire={tire}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p style={{ color: "white" }}>No se encontraron neumáticos.</p>
            )}
          </div>
        </div>
      </div>
    </div>
    </SidebarProvider>
  );
};
