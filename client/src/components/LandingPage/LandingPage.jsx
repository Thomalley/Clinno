import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import img_doc from "../utils/images-landing/doctora.png";
import logo from "../utils/images-landing/logo.png";
import services from "../utils/services.json";
import pp from "../utils/images-landing/pp.png";
import slide1 from "../utils/images-landing/slide1.png";
import slide2 from "../utils/images-landing/slide2.png";
import slide3 from "../utils/images-landing/slide3.png";
import Demo from "../Demo/Demo";
import NavLanding from "../NavLanding/NavLanding";
import footer from "../Home/Footer"
import Footer from "../Home/Footer";

export default function LandingPage() {
  return (
    <>
      <div className="container">
        <NavLanding component="Landing" />
        <div>
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={slide1} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <Link to="/home">
                    <button class="btn btn-primary btn_demo" type="button">
                      LIVE DEMO COMO CLINICA
                    </button>
                  </Link>
                </div>
              </div>
              <div className="carousel-item">
                <img src={slide2} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <Link to="/home">
                    <button class="btn btn-primary btn_demo" type="button">
                      LIVE DEMO COMO CLINICA
                    </button>
                  </Link>
                </div>
              </div>
              <div className="carousel-item">
                <img src={slide3} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <Link to="/home">
                    <button class="btn btn-primary btn_demo" type="button">
                      LIVE DEMO COMO CLINICA
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="mas-que">
          <h1>
            ¿Que puedo hacer en <img src={logo} alt="logo" /> ?
          </h1>
          <div className="services-content">
            {services.map((ser) => (
              <div className="servicios">
                <img src={pp} alt="pp"></img>
                <h4>{ser.name}</h4> <p>{ser.servicio}</p>{" "}
              </div>
            ))}
          </div>
        </div>
        <Demo />

        <div className="top-slice">
          <div className="text-conteiner1">
            <p>
              {" "}
              Clinno APP es la solución ideal para grupos médicos que desean
              utilizar un sistema de citas electrónico en linea,
              administrándolos eficientemente de forma colaborativa, ágil y
              sencilla.
            </p>
            <h3>¡Lleva un mejor control de los clientes de tu clínica!</h3>
          </div>
          <div className="image-doc">
            <img src={img_doc} alt="doc" />
          </div>
        </div>
      </div>
      <div className="que-hace">
        <Footer />
      </div>
    </>
  );
}
