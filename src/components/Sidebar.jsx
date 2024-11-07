// Sidebar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, AddCircle } from "@mui/icons-material";
import { useSidebar } from "../context/SidebarContext"; // Importar contexto
import "../Sidebar.css";
import LogoLlantera from "../assets/img/LlanteraLogo.png";
import '@fontsource/libre-baskerville';

function Sidebar() {
  const location = useLocation();
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  
  return (
    <>
      {/* Botón de colapso */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
      {isSidebarCollapsed ? "☰" : "✕"}
      </button>
      
      <div className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <div className="logo-container">
          <img src={LogoLlantera} alt="Logo" className="logo" />
        </div>
        <ul className="nav-links">
          <li>
            <Link
              to="/llantas"
              className={`nav-link ${location.pathname === "/llantas" ? "active" : ""}`}
            >
              <Home className="nav-icon" />
              {!isSidebarCollapsed && "INICIO"}
            </Link>
          </li>
          <li>
            <Link 
              to="/nuevallanta" 
              className={`nav-link ${location.pathname === '/nuevallanta' ? 'active' : ''}`}
            >
              <AddCircle className="nav-icon" />
              {!isSidebarCollapsed && "AGREGAR"}
            </Link>
          </li>
          <li>
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
              style={{display: "none"}}
            >
              EDITAR
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
