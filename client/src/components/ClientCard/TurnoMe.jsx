import "../ClientCard/TurnoMe.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import NavLanding from "../../components/NavLanding/NavLanding";
import Footer from "../Home/Footer";
import { Link, useParams } from "react-router-dom";
import {
  getTurnosByDni,
  getAllDoctores,
  getResenia,
  getDiagnosticoByTurno,
  getTurnoId,
  canTurno,
} from "../../actions/index";

export default function TurnoMe() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const turnos = useSelector((state) => state.turnosDni);
  const doctores = useSelector((state) => state.allDoctoresInDB);
  const resenia = useSelector((state) => state.resenia);
  const diagnostico = useSelector((state) => state.diagDoctor);
  const turnoId = useSelector((state) => state.turnoById)
  const dni_user = cookies.get("dni");
  const turnosPendientes = [];
  const turnosPasados = [];

  useEffect(() => {
    dispatch(getTurnosByDni(dni_user));
    dispatch(getAllDoctores());
    dispatch(getResenia());
    dispatch(canTurno({status:"cancelado", idTurno:idTurno}))
  }, []);

  const [diag, setDiag] = useState("");

  const [idTurno, setidTurno] = useState("");
  const handleSelect = (e) => {
    e.preventDefault();
    setDiag(e.target.value);
  };

  const handleCancelar = (e) => {
    e.preventDefault()
    setidTurno(e.target.value);
  };
console.log(turnosPendientes)
  useEffect(() => {
    if (idTurno !== "") dispatch(getTurnoId(idTurno));
  }, [idTurno]);
  
  useEffect(() => {
    if (diag !== "") dispatch(getDiagnosticoByTurno(diag));
  }, [diag]);


  for (let i = 0; i < turnos.length; i++) {
    if (turnos[i].status === "concretado") {
      turnosPasados.push(turnos[i]);
    } else if (turnos[i].status === "pendiente") {
      turnosPendientes.push(turnos[i]);
    }
  }

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
                      {"Reseña del turno " +
                        turno.id +
                        ", Fecha " +
                        turno.fecha}
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
                          {doctores && doctores[0]?.clinicas[0]?.nombre}
                        </label>
                      </div>
                      <div class="card">
                        <label>Doctor</label>
                        <label>
                          {doctores &&
                            doctores.find((d) => d.id === turno.idDoctor)
                              ?.nombre}
                        </label>
                      </div>
                      <div class="card">
                        <label>Especialidad</label>
                        <label>
                          {doctores && doctores[0]?.especialidads[0]?.nombre}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {turno.status === "concretado" &&
                resenia?.find((r) => r.idTurno === turno.id)?.reviewed ===
                  false ? (
                  <div class="botonRes">
                    <div className="botonRes">
                      <button
                        id="botonesTurno"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target={"#exampleModal1" + turno.id}
                        value={turno.id}
                        onClick={handleSelect}
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
                                <label class="form-control" id="message-text">
                                  {diagnostico[0]?.sintomas}
                                </label>
                              </div>
                              <div class="mb-3">
                                <label
                                  for="message-text"
                                  class="col-form-label"
                                >
                                  Indicaciones:
                                </label>
                                <label class="form-control" id="message-text">
                                  {diagnostico[0]?.indicaciones}
                                </label>
                              </div>
                              <div class="mb-3">
                                <label
                                  for="message-text"
                                  class="col-form-label"
                                >
                                  Estudios:
                                </label>
                                <label class="form-control" id="message-text">
                                  {diagnostico[0]?.estudio}
                                </label>
                              </div>
                              <div class="mb-3">
                                <label
                                  for="message-text"
                                  class="col-form-label"
                                >
                                  Diagnostico:
                                </label>
                                <label class="form-control" id="message-text">
                                  {diagnostico[0]?.diagnostico}
                                </label>
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
                              <label for="message-text" class="col-form-label">
                                Su Reseña:
                              </label>
                              <label class="form-control" id="message-text">
                                {
                                  resenia?.find(
                                    (res) => res.idTurno === turno.id
                                  )?.comentario
                                }
                              </label>
                              <label for="message-text" class="col-form-label">
                                Su Calificacion
                              </label>
                              <label class="form-control" id="message-text">
                                {
                                  resenia?.find(
                                    (res) => res.idTurno === turno.id
                                  )?.calificacion
                                }
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
                                  {diagnostico[0]?.sintomas}
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
                                  {diagnostico[0]?.indicaciones}
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
                                  {diagnostico[0]?.estudio}
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
                <label>{doctores && doctores[0]?.clinicas[0]?.nombre}</label>
              </div>
              <div class="card">
                <label>Doctor</label>
                <label>
                  {doctores &&
                    doctores.find((d) => d.id === turno.idDoctor)?.nombre}
                </label>
              </div>
              <div class="card">
                <label>Especialidad</label>
                <label>
                  {doctores && doctores[0]?.especialidads[0]?.nombre}
                </label>
              </div>
              {/* <button class="btn btn-primary" onClick={handleSelect} value={turno.id}> Modificar turno</button> */}
              <button
                class="btn btn-danger"
                onClick={handleCancelar}
                value={turno.id}
              >
                {" "}
                Cancelar turno
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
