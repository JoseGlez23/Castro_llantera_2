// src/components/TireCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../TireCard.css";
import styled from "styled-components";

const TireCard = ({ tire, onDelete }) => {
  const navigate = useNavigate();

  // Función para manejar la redirección a la página de edición
  const handleEditClick = () => {
    navigate(`/Editar/${tire.id}`);
  };

  return (
    <StyledWrapper>
      <div className="card">
        {/* Mostrar imagen, si está disponible, o una imagen predeterminada */}
        <img
          src={
            tire.imagen
              ? tire.imagen // Ahora accedemos directamente a la URL de la imagen proporcionada por la API
              : "/default-tire.jpg" // Reemplaza esta ruta con la imagen predeterminada que desees
          }
          alt="Neumático"
          className="card-image"
        />

        <div className="details">
          <label>Detalles de la Llanta</label>
          <p>
            <strong>Marca:</strong> {tire.marca}
            <br />
            <i>
              <strong>Modelo:</strong> {tire.modelo}
            </i>
            <br />
            <i>
              <strong>Alto:</strong> {tire.alto}
            </i>
            <br />
            <i>
              <strong>Ancho:</strong> {tire.ancho}
            </i>
            <br />
            <i>
              <strong>Pulgada:</strong> {tire.pulgada}
            </i>
            <br />
            <i>
              <strong>Cantidad:</strong> {tire.cantidad}
            </i>
            <br />
            <i>
              <strong>Precio:</strong> ${tire.precio}
            </i>
            <br />
            <i>
              <strong>Condición:</strong> {tire.condicion || "No especificada"}
            </i>
            <br />
          </p>
        </div>
      </div>

      <div className="button-container">
        <button onClick={handleEditClick} className="edit-button">
          EDITAR
        </button>
        <button onClick={() => onDelete(tire.id)} className="delete-button">
          ELIMINAR
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 300px;
    height: 280px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    position: relative;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    overflow: hidden;
    font-family: "Open Sans", sans-serif;
  }

  .card-image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .details > p {
    font-size: 1.1em;
    margin-top: 0.7em;
  }

  .details > label {
    font-size: 1.2em;
    font-weight: bold;
  }

  .details {
    color: white;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
    height: 3.3em;
    transition: height 0.5s ease-in-out;
    padding: 0.6em;
    overflow: hidden;
  }

  .card:hover > .details {
    height: 13.9em;
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
  }

  .edit-button,
  .delete-button {
    font-family: "TT Commons Pro Expanded", sans-serif;
    width: 120px;
    background-color: #0d2d59;
    color: white;
    border: none;
    border-radius: 13px;
    padding: 8px 12px;
    font-size: 1.1em;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 20px;
  }

  .edit-button:hover {
    background-color: #1c3f7e;
  }

  .delete-button {
    background-color: #ff3131;
  }

  .delete-button:hover {
    background-color: #c82333;
  }
`;

export default TireCard;
