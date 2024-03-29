import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

import {getClinicaId} from '../../actions/index'
import logo from '../utils/images-landing/usuario-sin-foto.png'
import Cookies from "universal-cookie";

import { useAuth0 } from "@auth0/auth0-react";

import "./DetailClinicaStyle.css";
import Footer from "../Home/Footer";

const cookies = new Cookies();

export default function DetailClinica() {
  const clinic = useSelector((state) => state.clinicaById);

  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getClinicaId(id));
  }, []);

  // const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const { isAuthenticated, isLoading } = useAuth0();
  let session;
  // console.log("sesion iniciada por " + cookies.get('email'))
  if (cookies.get("email")) {
    session = true;
  } else {
    session = isLoading;
  }
  const [loggeado, setLoggeado] = useState(session);

  //control de sesion
  useEffect(() => {
    if (cookies.get("email")) {
      setLoggeado(true);
    } else {
      if (isAuthenticated) {
        setLoggeado(true);
      } else {
        setLoggeado(false);
      }
    }
  }, [isLoading, cookies.get("email")]);

  // const goToLogin = () => {
  //   navigate("/login");
  // };

  return (
    <>
      {clinic.length < 1 ? (
        <>
          <NavBar loggin={loggeado} />
          <div className="errorPagina">
            <Link to="/home">
              <div className="nombre_hospital">
                <img className="imgLogo_Clinno" src={logo} alt="Logo Clinno" />
              </div>
            </Link>
            <br />
            <div style={{"margin-top":"4pc"}}></div>
            <img src="https://thumbs.gfycat.com/PepperyMediumBrahmancow-size_restricted.gif" alt="loading.."/>
            <h2>
              Aguarde un instante....
            </h2>
            <h4>
              Por favor haz <Link to="/home">click aqui</Link> para regresar a inicio
            </h4>
          </div>
        </>
      ) : (
        <div className="container contenedor_home ">
          <NavBar loggin={loggeado} />

          <div className="nombre_hospital">
            {/* <img className="imglogo" src={clinic[0].logo} alt="nf" /> */}
          </div>
          <h1>{clinic.nombre}</h1>
          <div className="row mt-3 g-0 bg-light container_corrousel ">
            <div className="col-2 col-md-8 container_corrousel_col_I ">
              <div
                id="carouselExampleDark"
                className="carousel carousel-dark slide carrousel_slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active" data-bs-interval="5000">
                    <img
                      src="https://i.guim.co.uk/img/media/2c106a2e4ce6a0087fda31edeaf6176cd251ad51/0_229_6720_4032/master/6720.jpg?width=1200&quality=85&auto=format&fit=max&s=f43c5f01b3e500b432583d98cfd26013"
                      className="d-block w-100"
                      alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block carrousel_img">
                      <h5 className="blanco_carrousel">Clinno es tu app de citas medicas!</h5>
                      <p className="blanco_carrousel">Con Clinno podras acceder a +1000 citas medicas.</p>
                    </div>
                  </div>
                  <div className="carousel-item" data-bs-interval="3000">
                    <img
                      src="https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125_960_720.jpg"
                      className="d-block w-100"
                      alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block carrousel_img">
                      <h5 className="blanco_carrousel">
                        Tu salud es lo mas importante!
                      </h5>
                      <p className="blanco_carrousel">
                        Por eso brindamos el mejor servicio con los mejores
                        profesionales.
                      </p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://cdn.pixabay.com/photo/2015/02/26/15/40/doctor-650534_960_720.jpg"
                      className="d-block w-100"
                      alt="..."
                    />
                    <div className=" carousel-caption d-none d-md-block carrousel_img">
                      <h5 className="blanco_carrousel">
                        Clinno te da acceso a los mejores profesionales!
                      </h5>
                      <p className="blanco_carrousel">
                        Los mejores medicos estan al alcance de un click!.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleDark"
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
                  data-bs-target="#carouselExampleDark"
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

            <div className="col-8 col-sm-12 col-md-4 d-flex flex-column justify-content-center align-items-center  carrousel_home">
              <div className="col d-flex flex-column justify-content-end pb-3 mb-3 ">
                <h2 className="animation_carrousel">
                  Bienvenido a {clinic.nombre}!
                </h2>
                <h4 className="animation_carrousel">
                  Accede a un turno medico con Clinno!
                </h4>
                <div className="animation_carrousel">
                  {loggeado || cookies.get("clinica_id") ? (
                    <></>
                  ) : (
                    <>
                      <Link
                        to="/register"
                        type="button"
                        className="btn btn-outline-secondary me-3"
                      >
                        Registrate
                      </Link>
                      <Link
                        to="/login"
                        type="button"
                        className="btn btn-primary"
                      >
                        Ingresa
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="col animation_carrousel">
                <div className="d-flex flex-column ">
                  <div className="nombre_hospital">
                    {/* <img className="imglogo" src={clinic[0].logo} alt="nf" /> */}
                  </div>
                  <div className="nombre_hospital">
                  </div>
                    <Link to="/turno">
                      {!cookies.get("clinica_id") ?
                      <button type="button" className="btn btn-primary animation_carrousel" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Agendá tu cita medica!{" "}
                      </button>
                      : <Link   className="btn btn-primary animation_carrousel" to="/adminClinica"> Volver a administración</Link>

                      }
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            id="nosotros"
            className=" mt-2 border-top border-bottom  mt-5 row nosotros_home "
          >
            <h2 className="m-4 nosotros">Sobre nosotros</h2>
            <div className="d-flex justify-content-start gap-2 flex-warp-reverse row g-0">
              <div className="col shadow-lg p-3 mb-5 rounded nosotros_item none_item">
                <h2>{clinic.nombre}</h2>
                <p>
                  {" "}
                  En {clinic.nombre}, contamos con un staff de primer nivel para
                  brindar un servicio de excelencia, promoviendo un ambiente de
                  confort y atención personalizada para los pacientes.{" "}
                </p>
              </div>
              <div className="col shadow-lg p-3 mb-5  rounded nosotros_item none_item">
                <h2>¿Por qué elegirnos?</h2>
                <p>
                  {" "}
                  Nuestro interés sobre la salud del paciente es absoluta, buscamos
                  cuidar y mejorar nuestra atencion tanto médica como administrativa.{" "}
                </p>
              </div>
              <div className="col  shadow-lg p-3 mb-5  rounded nosotros_item">
                <h2>¿Qué te brindamos?</h2>
                <p>
                  {" "}
                  Usted podrá acceder de manera online a sus exámenes actuales y
                  previos, obtener citas médicas y administrar sus horarios todo desde el mismo lugar.
                </p>
              </div>
              <div className="col  shadow-lg p-3 mb-5  rounded nosotros_item none_item">
                <h2>¿Que hacer en caso de una URGENCIA?</h2>
                <p>
                  {" "}
                  Podras llevar toda la informacion de tu historial clinico en tu bolsillo,
                  para agilizar todo el proceso de atencion! Registrate, pedi y un turno y LISTO!.
                </p>
              </div>
              <div className="col  shadow-lg p-3 mb-5  rounded nosotros_item none_item">
                <h2>¿Nuestros especialistas?</h2>
                <p>
                  {" "}
                  Contamos con un plantel de profesionales de la salud altamente capacitados, calificados para despejar
                   todas tus dudas frente a cualquier caso presentado, no lo dudes, eleginos! {clinic.nombre}.
                </p>
              </div>
            </div>
          </div>
          {/*  //nosotros//*/}
          <div id="doctores" className=" doctores">
            <h2 className="m-4">Nuestra Clinica</h2>
          </div>
          <div className="accordion direccion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button d-flex justify-content-center"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Donde estamos?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show "
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body d-flex justify-content-start align-items-center acordeon_direccion">
                  <div className="nombre_hospital item_direccion">
                    {/* <img className="imglogo" src={clinic[0].logo} alt="nf" /> */}
                  </div>
                  <p className="item_direccion">
                    {" "}
                    Estamos en {clinic.direccion}, Buenos Aires, Capital Federal{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>          

          <div className="d-flex justify-content-center align-items-start ">
            <div>
              <h3 className="m-4">Quienes son nuestros doctores?</h3>
              <div className=" doctores_contenido">
                {/* {clinic.doctors.sort((a, b) => {
                    if (a < b) {
                      return -1;
                    }
                    if (a > b) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((e, i) => {
                    {console.log(e)} */}
                {clinic.doctors &&
                  clinic.doctors.map((e) => {
                    return (
                      <div className="doctor">
                        <h4>{e.nombre}</h4>
                        <img
                        alt="imagen"
                          className="imagen_medico"
                          style={{"width" : "10pc"}}
                          src={logo}
                          alt="nf"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div>
              <h3 className="m-4">Contamos con las especialidades:</h3>
              <div className=" especialidades_contenido">
                {/* {clinic.especialidades
                  .sort((a, b) => {
                    if (a < b) {
                      return -1;
                    }
                    if (a > b) {
                      return 1;
                    }
                    return 0;
                  })
                  ?.map((e, i) => { */}
                {clinic.especialidads &&
                  clinic.especialidads.map((e) => {
                    return (
                      <div className="especialidad">
                        <h4>{e.nombre}</h4>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* <!-- Modal --> */}
          {/* <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Inicio de sesion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            No has iniciado sesion , por favor ingresa.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  to='/login'  type="button"  className="btn btn-primary"  data-bs-dismiss="modal" onClick={goToLogin}>Ir a login</button>
                        </div>
                        </div>
                    </div>
                </div> */}
        </div>
      )}
      <div style={{"margin-top":"5pc"}}></div>
      <Footer />
    </>
  );
}
