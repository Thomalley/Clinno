import React from "react";
import { Link } from "react-router-dom";
import "./navlandig.css";
import logo from "../utils/images-landing/logo.png";

export default function NavLanding({ component }) {
  return (
    <div className="logo-container">
      <div className="logo-container-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="logo-container-text">
        {component === "Landing" ? (
          <Link to="/aboutUs">
            <h5>Acerca de Nosotros </h5>
          </Link>
        ) : (
          <Link to="/">
            <h5>Volver a Clinno APP </h5>
          </Link>
        )}
      </div>
    </div>
  );
}
