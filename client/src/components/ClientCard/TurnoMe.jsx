import "../ClientCard/TurnoMe.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDoctoresByEspec,
  getEspecialidad,
  getTurnos,
  getClinicas,
} from "../../actions/index";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import NavLanding from "../../components/NavLanding/NavLanding";
import Footer from "../Home/Footer";
import { Link } from "react-router-dom";

export default function TurnoMe() {
  useEffect(() => {
    dispatch(getTurnos());
    dispatch(getClinicas());
    dispatch(getDoctoresByEspec(dataDoctor));
    dispatch(getEspecialidad());
  }, []);

  const dispatch = useDispatch();

  const turnos = useSelector((state) => state.turnos);
  const clinicas = useSelector((state) => state.clinicas);
  const doctores = useSelector((state) => state.doctoresByEspec);
  const especialidades = useSelector((state) => state.especialidades);

  const cookies = new Cookies();

  let dni = cookies.get("dni");

  let turnosDelCliente = [];
  let turnosPendientes = [];
  let turnosPasados = [];
  let turnosCancelados = [];

  let dataDoctor = {
    idEspecialidad: "",
    idClinica: "",
  };

  let turno = {
    idCliente: "1",
    id: "123",
    fecha: "12-2-2022",
    hora: 14,
    idClinica: "4ca34fa9-0436-420b-832a-2bc372eb8909",
    idDoctor: "0d96509e-0d6b-4e7c-b768-df7d8f1d6da8",
    idEspecialidad: 1,
    status: "concretado",
    reseña: {
      comentario: "atencion pesima",
      calificacion: 2,
      reviewed: true,
    },
    diagnostico: {
      sintomas: "tiene hipo",
      indicaciones: "aguantar la respiracion",
      estudios: "resonancia magnetica",
    },
  };

  let turno2 = {
    idCliente: "1",
    id: "124",
    fecha: "12-2-2022",
    hora: 16,
    idClinica: "4ca34fa9-0436-420b-832a-2bc372eb8909",
    idDoctor: "0d96509e-0d6b-4e7c-b768-df7d8f1d6da8",
    idEspecialidad: 1,
    status: "concretado",
    reseña: {
      comentario: null,
      calificacion: null,
      reviewed: false,
    },
    diagnostico: {
      sintomas: "tiene covid",
      indicaciones: "resposo",
      estudios: "pcr",
    },
  };

  let turno3 = {
    idCliente: "1",
    id: "125",
    fecha: "12-2-2022",
    hora: 16,
    idClinica: "4ca34fa9-0436-420b-832a-2bc372eb8909",
    idDoctor: "0d96509e-0d6b-4e7c-b768-df7d8f1d6da8",
    idEspecialidad: 1,
    status: "concretado",
    reseña: {
      comentario: null,
      calificacion: null,
      reviewed: false,
    },
    diagnostico: {
      sintomas: "tiene coviiiiiiiichi",
      indicaciones: "resposo",
      estudios: "pcr",
    },
  };

  let turno4 = {
    idCliente: "1",
    id: "126",
    fecha: "12-2-2022",
    hora: 16,
    idClinica: "4ca34fa9-0436-420b-832a-2bc372eb8909",
    idDoctor: "0d96509e-0d6b-4e7c-b768-df7d8f1d6da8",
    idEspecialidad: 1,
    status: "concretado",
    reseña: {
      comentario: "muy buen servicio",
      calificacion: 4,
      reviewed: true,
    },
    diagnostico: {
      sintomas: "esta perfecto",
      indicaciones: "sin indicaciones",
      estudios: "sin estudios",
    },
  };

  turnosDelCliente.push(turno, turno2, turno3, turno4);

  //FILTRO LOS TURNOS GENERALES Y ME QUEDO CON LOS TURNOS DE MI CLIENTE
  for (let i = 0; i < turnos.length; i++) {
    if (turnos[i]?.dniCliente === dni) {
      turnosDelCliente.push(turnos[i]);
    }
  }

  //SEPARO TURNOS PENDIENTES, CONCRETADOS, Y CANCELADOS
  for (let i = 0; i < turnosDelCliente.length; i++) {
    if (turnosDelCliente[i]?.status === "concretado") {
      turnosPasados.push(turnosDelCliente[i]);
    } else if (turnosDelCliente[i]?.status === "pendiente") {
      turnosPendientes.push(turnosDelCliente[i]);
    }
  }

  console.log(doctores);
  return (
    <div>
      <NavLanding />
      <Link class="btn btn-primary" to="/me">
        Volver a mi perfil
      </Link>
      <h2 class="h2-turnos col-10 m-auto">Mis Turnos</h2>
      <div className="titulosTurno">
        <h3>Historial de Turnos</h3>
        <h3>Turnos Pendientes</h3>
      </div>
      <div class="row containerTurno">
        <div class="col-6 mt-3">
          {turnosPasados.length !== 0 ? (
            turnosPasados?.map((turno) => (
            
              <div class="col-8" className="bigContainer">
                  <div class="accordion-item col-6">
                    <h2 class="accordion-header" id="headingOne">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#collapseOne" + turno.id}
                        aria-expanded="false"
                        aria-controls="collapseOne"
                      >
                        {"Reseña del turno " + turno.id + ", Fecha " + turno.fecha}
                      </button>
                    </h2>
                    <div
                      id={"collapseOne" + turno.id}
                      class="accordion-collapse collapse card"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                      <div class="card">
                    <label>Fecha</label>
                    <label>{turno.fecha}</label>
                  </div>
                  <div class="card">
                    <label>Hora</label>
                    <label>{turno.hora}</label>
                  </div>
                  <div class="card">
                    <label>Clinica</label>
                    <label>
                      {
                        clinicas?.find((el) => el.id === turno.idClinica)
                          ?.nombre
                      }
                    </label>
                  </div>
                  <div class="card">
                    <label>Doctor</label>
                    <label>
                      {doctores?.find((el) => el.id === turno.idDoctor)?.nombre}
                    </label>
                  </div>
                  <div class="card">
                    <label>Especialidad</label>
                    <label>
                      {
                        especialidades?.find(
                          (el) => el.id === turno.idEspecialidad
                        )?.nombre
                      }
                    </label>
                  </div>
                      </div>
                    </div>
                  </div>
                  {turno.status === "concretado" &&
                  turno.reseña.reviewed === false ? (
                    <div class="botonRes">
                      <div className="botonRes">
                        <button
                          id="botonesTurno"
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target={"#exampleModal1" + turno.id}
                        >
                          Ver Diagnostico
                        </button>
                        <button
                          id="botonesTurno"
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target={"#exampleModal2" + turno.id}
                        >
                          Aagregar Reseña
                        </button>
                      </div>
                      <div
                        class="modal fade"
                        id={"exampleModal2" + turno.id}
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Reseña del turno {turno.id}
                              </h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <form>
                                <div class="mb-3">
                                  <label
                                    for="message-text"
                                    class="col-form-label"
                                  >
                                    Su Reseña:
                                  </label>
                                  <textarea
                                    class="form-control"
                                    id="message-text"
                                  ></textarea>
                                </div>
                              </form>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-primary">
                                Guardar Reseña
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="modal fade"
                        id={"exampleModal1" + turno.id}
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Diagnostico del turno {turno.id}
                              </h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <form>
                                <div class="mb-3">
                                  <label
                                    for="message-text"
                                    class="col-form-label"
                                  >
                                    Sintomas:
                                  </label>
                                  <textarea
                                    class="form-control"
                                    id="message-text"
                                  >
                                    {turno.diagnostico.sintomas}
                                  </textarea>
                                </div>
                                <div class="mb-3">
                                  <label
                                    for="message-text"
                                    class="col-form-label"
                                  >
                                    Indicaciones:
                                  </label>
                                  <textarea
                                    class="form-control"
                                    id="message-text"
                                  >
                                    {turno.diagnostico.indicaciones}
                                  </textarea>
                                </div>
                                <div class="mb-3">
                                  <label
                                    for="message-text"
                                    class="col-form-label"
                                  >
                                    Estudios:
                                  </label>
                                  <textarea
                                    class="form-control"
                                    id="message-text"
                                  >
                                    {turno.diagnostico.estudios}
                                  </textarea>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    //SI EL TURNO ESTA EN PENDIENTE // FALTA CON TURNO CANCELADO VER QUE HACER
                    <div class="botonRes">
                      <div class="botonRes">
                        <button
                          id="botonesTurno"
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target={"#exampleModal2" + turno.id}
                        >
                          Ver Diagnostico
                        </button>
                        <button
                          id="botonesTurno"
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target={"#exampleModal1" + turno.id}
                        >
                          Ver Reseña
                        </button>
                      </div>
                      <div
                        class="modal fade"
                        id={"exampleModal1" + turno.id}
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Reseña del turno {turno.id}
                              </h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <div class="mb-3">
                                <label
                                  for="message-text"
                                  class="col-form-label"
                                >
                                  Su Reseña:
                                </label>
                                <label class="form-control" id="message-text">
                                  {turno.reseña.comentario}
                                </label>
                                <label
                                  for="message-text"
                                  class="col-form-label"
                                >
                                  Su Calificacion
                                </label>
                                <label class="form-control" id="message-text">
                                  {turno.reseña.calificacion}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="modal fade"
                        id={"exampleModal2" + turno.id}
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Diagnostico del turno {turno.id}
                              </h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <form>
                                <div class="mb-3">
                                  <label
                                    for="message-text"
                                    class="col-form-label"
                                  >
                                    Sintomas:
                                  </label>
                                  <textarea
                                    class="form-control"
                                    id="message-text"
                                  >
                                    {turno.diagnostico.sintomas}
                                  </textarea>
                                </div>
                                <div class="mb-3">
                                  <label
                                    for="message-text"
                                    class="col-form-label"
                                  >
                                    Indicaciones:
                                  </label>
                                  <textarea
                                    class="form-control"
                                    id="message-text"
                                  >
                                    {turno.diagnostico.indicaciones}
                                  </textarea>
                                </div>
                                <div class="mb-3">
                                  <label
                                    for="message-text"
                                    class="col-form-label"
                                  >
                                    Estudios:
                                  </label>
                                  <textarea
                                    class="form-control"
                                    id="message-text"
                                  >
                                    {turno.diagnostico.estudios}
                                  </textarea>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                
              </div>
              
            ))
          ) : (
            <p className="turnoP">No hay turnos pasados</p>
          )}
        </div>
        
        {turnosPendientes?.map((turno) => (
          <div class="col">
            <div id="turnopendiente" className="detailCard container6">
              <div class="card">
                <label>Fecha</label>
                <label>{turno.fecha}</label>
              </div>
              <div class="card">
                <label>Hora</label>
                <label>{turno.hora}</label>
              </div>
              <div class="card">
                <label>Clinica</label>
                <label>
                  {clinicas?.find((el) => el.id === turno.idClinica)?.nombre}
                </label>
              </div>
              <div class="card">
                <label>Doctor</label>
                <label>
                  {doctores?.find((el) => el.id === turno.idDoctor)?.nombre}
                </label>
              </div>
              <div class="card">
                <label>Especialidad</label>
                <label>
                  {
                    especialidades?.find((el) => el.id === turno.idEspecialidad)
                      ?.nombre
                  }
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
