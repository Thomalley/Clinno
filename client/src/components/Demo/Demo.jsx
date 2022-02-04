import React from "react";
import { Link } from "react-router-dom";

import "./demo.css";
import mockup from "../utils/images-landing/clinno-app.png";

export default function Demo() {
  return (
      <div className="demo-container">
    <div className="live">

      <div className="text-live">
        <h2>Más que un sistema de reserva de citas </h2>
        <h2>un sistema que mejora la relación con tus pacientes</h2>
      </div>

      <div className="text-container2">
        <h4>Ve a nuestra Demo Virtual:</h4>

        <div class="d-grid gap-2 col-12 mx-auto">
          <Link to="/home">
            <button class="btn btn-primary" type="button">
              LIVE DEMO
            </button>
          </Link>
        </div>
      </div>
    </div>
    <div className="img-container">

        <img src={mockup} alt="mockup" />
    </div>
    </div>
  );
}
