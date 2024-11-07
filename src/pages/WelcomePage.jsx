import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoLlantera from "../assets/img/LlanteraLogo.png";
import FotoLlantas from "../assets/img/PhotoTires.png";
import AccountCircleIcon from "../assets/img/AccountIcon.png";
import "../Welcome.css";

export const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/llantas"); 
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
            <img src={AccountCircleIcon} alt="Icono" className="MaterialIcon" />
          </div>
          <h1 style={{ color: "white", fontWeight:"bold", fontSize: "26px" }}>Bienvenido Administrador</h1>
        </div>
        <div className="image-section">
          <img src={FotoLlantas} alt="Neumáticos" className="tires-image" />
        </div>
      </div>
    </div>
  );
}

