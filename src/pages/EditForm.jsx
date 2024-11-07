// src/pages/EditForm.jsx
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Sidebar from "../components/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";
import SuperiorBar from "../components/SuperiorBar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useParams, useNavigate } from "react-router-dom";
import "../EditForm.css";

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

export const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    marca: "",
    modelo: "",
    alto: "",
    ancho: "",
    pulgada: "",
    cantidad: "",
    precio: "",
    condicion: "Nuevo",
    imagen: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [fileName, setFileName] = useState(""); // Nombre de la imagen actual
  const fileInputRef = useRef(null);

  // Cargar datos del neumático al montar el componente
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/neumaticos/${id}`)
      .then((response) => {
        const data = response.data;
        setInitialValues({
          marca: data.marca,
          modelo: data.modelo,
          alto: data.alto,
          ancho: data.ancho,
          pulgada: data.pulgada,
          cantidad: data.cantidad,
          precio: data.precio,
          condicion: data.condicion,
          imagen: null,
        });
        setFileName(data.imagen ? data.imagen.split("/").pop() : ""); // Solo el nombre de la imagen sin URL
      })
      .catch((error) => {
        console.error("Error al cargar datos del neumático:", error);
      });
  }, [id]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleConditionDropdown = () => setIsConditionOpen((prev) => !prev);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Muestra solo el nombre del archivo
      setFieldValue("imagen", file);
    } else {
      setFileName("");
      setFieldValue("imagen", null);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      // Agregar todos los valores excepto la imagen
      Object.keys(values).forEach((key) => {
        if (key !== "imagen") {
          formData.append(key, values[key]);
        }
      });

      // Verificar si se seleccionó una nueva imagen
      if (values.imagen) {
        formData.append("imagen", values.imagen);
      } else if (fileName) {
        formData.append("imagen", fileName); // Si no hay nueva imagen, usa la existente
      }

      await axios.put(`http://localhost:3000/api/neumaticos/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Neumático actualizado exitosamente.");
      navigate("/llantas"); // Redirige a la página del stock después de la actualización
    } catch (error) {
      console.error("Error al actualizar el neumático:", error);
      alert("Hubo un error al actualizar el neumático.");
    }
  };

  return (
    <SidebarProvider>
      <div className="tires-form">
        <SuperiorBar />
        <div className="container">
          <Sidebar />
          <div className="background">
            <div className="Edit-container">
              <h2> Edición del Neumático</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={TireSchema}
                enableReinitialize={true}
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
                            placeholder="marca de la llanta"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="modelo">MODELO</label>
                          <Field
                            name="modelo"
                            placeholder="modelo de la llanta"
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
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
                              </span>
                            </div>
                            {isOpen && (
                              <div className="dropdown-body">
                                <div className="dropdown-row">
                                  <label htmlFor="alto" className="small-label">
                                    ALTO
                                  </label>
                                  <Field
                                    name="alto"
                                    type="number"
                                    placeholder="alto"
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
                                    placeholder="ancho"
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
                                    placeholder="pulgadas"
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
                            placeholder="cantidad de llantas"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="precio">PRECIO</label>
                          <Field
                            type="number"
                            name="precio"
                            placeholder="precio de las llantas"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="condicion">CONDICIÓN</label>
                          <div className="condition-dropdown">
                            <div
                              className="dropdown-header"
                              onClick={toggleConditionDropdown}
                            >
                              <span>{initialValues.condicion}</span>
                              <span className="icon-container">
                                {isConditionOpen ? (
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
                              </span>
                            </div>
                            {isConditionOpen && (
                              <div className="body-condition-dropdown">
                                <div
                                  className="condition-option"
                                  onClick={() =>
                                    setFieldValue("condicion", "Nuevo")
                                  }
                                >
                                  Nuevo
                                </div>
                                <div
                                  className="condition-option"
                                  onClick={() =>
                                    setFieldValue("condicion", "Usado")
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
                            value={initialValues.condicion}
                          />
                        </div>
                      </div>
                      <div className="column">
                        <div className="form-group">
                          <label htmlFor="foto">CAMBIAR FOTO</label>
                          <div
                            onClick={() => fileInputRef.current.click()}
                            className="photo-input-container"
                          >
                            {/* Aquí mostramos solo el nombre de archivo sin la URL completa */}
                            <span className="file-name">
                              {fileName || "Seleccionar nueva imagen"}
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
                        GUARDAR CAMBIOS
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
