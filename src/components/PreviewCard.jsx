// src/components/TireCard.jsx
import "../TireCard.css"; 
import styled from "styled-components";

const PreviewCard = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <img
          src=""
          alt="Neumático"
          className="card-image"
        />

        <div className="details">
          <label>Detalles de la Llanta</label>
          <p>
            <strong>Marca:</strong> 
            <br />
            <i>
              <strong>Modelo:</strong>
            </i>
            <br />
            <i>
              <strong>Alto:</strong> 
            </i>
            <br />
            <i>
              <strong>Ancho:</strong> 
            </i>
            <br />
            <i>
              <strong>Pulgada:</strong> 
            </i>
            <br />
            <i>
              <strong>Cantidad:</strong> 
            </i>
            <br />
            <i>
              <strong>Precio:</strong> 
            </i>
            <br />
            <i>
              <strong>Condición:</strong> 
            </i>
            <br />
          </p>
        </div>
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

export default PreviewCard;
