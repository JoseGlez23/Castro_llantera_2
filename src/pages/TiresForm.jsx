// src/pages/TiresForm.jsx
import React, { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Sidebar from "../components/Sidebar";
import { SidebarProvider } from "../context/SidebarContext"; // Importar el proveedor
import SuperiorBar from "../components/SuperiorBar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import "../TiresForm.css";

// Validación del formulario
const TireSchema = Yup.object().shape({
  marca: Yup.string().required("La marca es obligatoria"),
  modelo: Yup.string().required("El modelo es obligatorio"),
  alto: Yup.number().required("El alto es obligatorio"),
  ancho: Yup.number().required("El ancho es obligatorio"),
  pulgada: Yup.number().required("La pulgada es obligatoria"),
  cantidad: Yup.number().required("La cantidad es obligatoria"),
  precio: Yup.number().required("El precio es obligatorio"),
  condicion: Yup.string().required("La condición es obligatoria"),
});

export const TiresForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [condition, setCondition] = useState("Nuevo");
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleConditionDropdown = () => setIsConditionOpen((prev) => !prev);

  const handleSelect = (value, setFieldValue) => {
    setCondition(value);
    setFieldValue("condicion", value);
    setIsConditionOpen(false);
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFieldValue("imagen", file);
    } else {
      setFileName("");
      setFieldValue("imagen", null);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("marca", values.marca);
      formData.append("modelo", values.modelo);
      formData.append("alto", values.alto);
      formData.append("ancho", values.ancho);
      formData.append("pulgada", values.pulgada);
      formData.append("cantidad", values.cantidad);
      formData.append("precio", values.precio);
      formData.append("condicion", values.condicion);
      formData.append("imagen", values.imagen);

      const response = await axios.post(
        "http://localhost:3000/api/neumaticos",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        alert("Neumático agregado exitosamente.");
        resetForm();
        setCondition("Nuevo");
        setFileName("");
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      }
    } catch (error) {
      console.error("Error al agregar el neumático:", error);
      alert("Hubo un error al agregar el neumático.");
    }
  };

  return (
    <SidebarProvider>
      {" "}
      {/* Envolver en el contexto */}
      <div className="tires-form">
        <SuperiorBar />
        <div className="container">
          <Sidebar />
          <div className="background">
            <div className="form-container">
              <Formik
                initialValues={{
                  marca: "",
                  modelo: "",
                  alto: "",
                  ancho: "",
                  pulgada: "",
                  cantidad: "",
                  precio: "",
                  condicion: condition,
                  imagen: null,
                }}
                validationSchema={TireSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <div className="form-grid">
                      <div className="column">
                        <div className="form-group">
                          <label htmlFor="marca">MARCA</label>
                          <Field
                            name="marca"
                            placeholder="Introduce la marca de la llanta"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="modelo">MODELO</label>
                          <Field
                            name="modelo"
                            placeholder="Introduce el modelo de la llanta"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="medidas">MEDIDAS</label>
                          <div className="custom-dropdown">
                            <div
                              className="dropdown-header"
                              onClick={toggleDropdown}
                            >
                              <span>
                                {!isOpen ? "EXTENDER AQUÍ" : "\u00A0"}
                              </span>
                              <span className="icon-container">
                                {isOpen ? (
                                  <KeyboardArrowUpIcon
                                    style={{ fontSize: "80px" }}
                                  />
                                ) : (
                                  <KeyboardArrowDownIcon
                                    style={{ fontSize: "80px" }}
                                  />
                                )}
                              </span>
                            </div>
                            {isOpen && (
                              <div
                                className="dropdown-body"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="dropdown-row">
                                  <label htmlFor="alto" className="small-label">
                                    ALTO
                                  </label>
                                  <Field
                                    name="alto"
                                    type="number"
                                    placeholder="Introduzca el alto"
                                  />
                                </div>
                                <div className="dropdown-row">
                                  <label
                                    htmlFor="ancho"
                                    className="small-label"
                                  >
                                    ANCHO
                                  </label>
                                  <Field
                                    name="ancho"
                                    type="number"
                                    placeholder="Introduzca el ancho"
                                  />
                                </div>
                                <div className="dropdown-row">
                                  <label
                                    htmlFor="pulgada"
                                    className="small-label"
                                  >
                                    PULGADA
                                  </label>
                                  <Field
                                    name="pulgada"
                                    type="number"
                                    placeholder="Introduzca la pulgada"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="column">
                        <div className="form-group">
                          <label htmlFor="cantidad">CANTIDAD</label>
                          <Field
                            type="number"
                            name="cantidad"
                            placeholder="Introduce la cantidad de llantas"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="precio">PRECIO</label>
                          <Field
                            type="number"
                            name="precio"
                            placeholder="Introduce el precio de las llantas"
                            step="0.01"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="condicion">CONDICIÓN</label>
                          <div
                            className="condition-dropdown"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div
                              className="dropdown-header"
                              onClick={toggleConditionDropdown}
                            >
                              <span>{condition}</span>
                              <span className="icon-container">
                                {isConditionOpen ? (
                                  <KeyboardArrowUpIcon
                                    style={{ fontSize: "80px" }}
                                  />
                                ) : (
                                  <KeyboardArrowDownIcon
                                    style={{ fontSize: "80px" }}
                                  />
                                )}
                              </span>
                            </div>
                            {isConditionOpen && (
                              <div className="body-condition-dropdown">
                                <div
                                  className="condition-option"
                                  onClick={() =>
                                    handleSelect("Nuevo", setFieldValue)
                                  }
                                >
                                  Nuevo
                                </div>
                                <div
                                  className="condition-option"
                                  onClick={() =>
                                    handleSelect("Usado", setFieldValue)
                                  }
                                >
                                  Usado
                                </div>
                              </div>
                            )}
                          </div>
                          <Field
                            type="hidden"
                            name="condicion"
                            value={condition}
                          />
                        </div>
                      </div>
                      <div className="column">
                        <div className="form-group">
                          <label htmlFor="foto">AGREGAR FOTO</label>
                          <div
                            onClick={() => fileInputRef.current.click()}
                            className="photo-input-container"
                          >
                            <span className="file-name">
                              {fileName || "Seleccionar imagen"}
                            </span>
                            <AddAPhotoIcon />
                            <input
                              id="foto"
                              name="imagen"
                              type="file"
                              accept="image/*"
                              className="photo-input-hidden"
                              ref={fileInputRef}
                              onChange={(event) =>
                                handleFileChange(event, setFieldValue)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn-bottom-right">
                        AGREGAR LLANTA
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
