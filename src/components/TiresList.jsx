// src/components/TiresList.jsx
import React from "react";
import TireCard from "./TireCard";

const TiresList = ({ tires, onEdit, onDelete }) => {
  return (
    <div className="tires-list">
      {tires.length > 0 ? (
        tires.map((tire) => (
          <TireCard
            key={tire.id}
            tire={tire}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default TiresList;
