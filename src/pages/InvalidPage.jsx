// src/pages/InvalidPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FotoLlantas from "../assets/img/PhotoTires.png";
import LogoLlantera from "../assets/img/LlanteraLogo.png";
import RedCircleX from "../assets/img/RedCircle-x.png";

export const InvalidPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); 
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-page">
      <div className="square-container">
        <div className="text-section">
          <div>
            <img src={LogoLlantera} alt="Logo" className="logo" />
          </div>
          <div>
            <img src={RedCircleX} alt="Icono" className="MaterialIcon" />
          </div>
          <h1 style={{ color: "white", fontWeight: "bold", fontSize: "26px" }}>
            Contraseña Incorrecta <br /> Por favor vuelva a intentarlo
          </h1>
        </div>
        <div className="image-section">
          <img src={FotoLlantas} alt="Neumáticos" className="tires-image" />
        </div>
      </div>
    </div>
  );
}


