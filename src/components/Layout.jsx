// src/components/Layout.jsx
import React from "react";
import SuperiorBar from "./SuperiorBar";

function Layout({ children }) {
  return (
    <div>
      <SuperiorBar /> {/* Barra superior visible en todas las rutas privadas */}
      <main>{children}</main> {/* Contenido principal de la página */}
    </div>
  );
}

export default Layout;
