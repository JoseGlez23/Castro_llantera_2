// src/router/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // Verifica si el usuario está autenticado; de no estarlo, lo redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
