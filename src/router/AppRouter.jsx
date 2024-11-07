// src/router/AppRouter.jsx
import { Route, Routes } from "react-router-dom";
import {
  LoginPage,
  InvalidPage,
  WelcomePage,
  NotFound,
  TiresForm,
  TiresPage,
  EditForm
} from "../pages";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => (
  <Routes>
    <Route index element={<LoginPage />} />
    <Route path="Bienvenido" element={<WelcomePage />} />
    <Route path="Invalido" element={<InvalidPage />} />
    <Route path="Error" element={<NotFound />} />
    <Route
      path="llantas"
      element={
        <PrivateRoute>
          <TiresPage />
        </PrivateRoute>
      }
    />
    <Route
      path="nuevallanta"
      element={
        <PrivateRoute>
          <TiresForm />
        </PrivateRoute>
      }
    />

    <Route
      path="/Editar/:id"
      element={
        <PrivateRoute>
          <EditForm />
        </PrivateRoute>
      }
    />

  </Routes>
);
