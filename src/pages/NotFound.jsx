import { Formik, Form, Field } from "formik";
import "../LoginPage.css";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FotoLlantas from "../assets/img/PhotoTires.png";
import LogoLlantera from "../assets/img/LlanteraLogo.png";

export const NotFound = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="form-section">
          <div>
            <img src={LogoLlantera} alt="Logo" className="logo" />
          </div>
          <Formik
            initialValues={{ username: "", password: "" }}
          >
              <Form className="login-form">
                <div className="input-container">
                  <AccountCircleIcon className="icon"/>
                  <Field
                    type="text"
                    name="username"
                    placeholder="ESCRIBA SU USUARIO"
                    className="input-field"
                  />
                </div>

                <div className="input-container">
                  <LockIcon className="icon" />
                  <Field
                    type="password"
                    name="password"
                    placeholder="ESCRIBA SU CONTRASEÑA"
                    className="input-field"
                  />
                </div>

                <button
                  type="submit"
                  className="login-button"
                >
                  ACCEDER
                </button>
              </Form>

          </Formik>
        </div>
        <div className="image-section">
          <img src={FotoLlantas} alt="Neumáticos" className="tires-image" />
        </div>
      </div>
    </div>
  );
}
