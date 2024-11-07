// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  // Carga el estado de autenticación desde el almacenamiento local al inicio
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedName = localStorage.getItem("adminName");
    if (storedAuth) {
      setIsAuthenticated(true);
      setAdminName(storedName || "");
    }
  }, []);

  const login = (name) => {
    setIsAuthenticated(true);
    setAdminName(name);
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("adminName", name);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminName("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("adminName");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
