// src/pages/LoginPage.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoLlantera from "../assets/img/LlanteraLogo.png";
import FotoLlantas from "../assets/img/PhotoTires.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import "../LoginPage.css";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        nombre: username,
        password: password,
      });
      if (response.status === 200) {
        login(response.data.admin.nombre);
        navigate("/Bienvenido");
      }
    } catch (error) {
      navigate("/Invalido");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="form-section">
          <img src={LogoLlantera} alt="Logo" className="logo" />
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-container">
              <AccountCircleIcon className="icon" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ESCRIBA SU USUARIO"
                className="input-field"
              />
            </div>
            <div className="input-container">
              <LockIcon className="icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ESCRIBA SU CONTRASEÑA"
                className="input-field"
              />
            </div>
            <button type="submit" className="login-button">
              ACCEDER
            </button>
          </form>
        </div>
        <div className="image-section">
          <img src={FotoLlantas} alt="Neumáticos" className="tires-image" />
        </div>
      </div>
    </div>
  );
}

