import React from "react";
import { Link } from "react-router-dom";
import "./navlandig.css";
import logo from "../utils/images-landing/logo.png";
import icono from"../utils/icono-clinica.png"

export default function NavLanding({ component }) {
  return (
    <div className="logo-container">
      <div className="logo-container-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="logo-container-text">
        {component === "Landing" ? (
         <div>
            {/* {<Link to="/register">
              <h5>|  Registrarme </h5> 
            </Link>

            <Link to="/login">
              <h5> |  Iniciar sesión   </h5>
            </Link>} */}

            <Link to="/">
              <h5>| Home   </h5>
            </Link>
          </div>
        ) : component === "HomeClients" ? (
          <Link to="/aboutClinno">
          <h5> <img src={icono} alt="logo" width="25px"/>   Soy una clinica </h5>
          </Link>
        ) : (
          <Link to="/aboutClinno">
            <h5>|   Volver a clinno   </h5>
          </Link>
        )}
      </div>
    </div>
  );
}
