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
  filtroTurnoFecha
} from "../../actions/index";

export default function TurnoMe() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  let turnos = useSelector((state) => state.turnosDni);
  const doctores = useSelector((state) => state.allDoctoresInDB);
  const resenia = useSelector((state) => state.resenia);
  const diagnostico = useSelector((state) => state.diagDoctor);
  const dni_user = cookies.get("dni");
  const turnosPendientes = [];
  const turnosPasados = [];
  const turnosOriginales = turnos
  let turnosFiltrados = turnosOriginales;

  useEffect(() => {
    dispatch(getTurnosByDni(dni_user));
    dispatch(getAllDoctores());
    dispatch(getResenia());
  },[turnos]);

  const [diag, setDiag] = useState("");

  const handleSelect = (e) => {
    setDiag(e.target.value);
    e.preventDefault();
  };

  function handleFilterSelect(e){
    e.preventDefault();
    console.log(turnos)
    if(e.target.value === "desc" && turnosFiltrados[0].id === turnosOriginales[0].id){
      turnosFiltrados = turnos.reverse()
    } else if(e.target.value === "desc" && turnosFiltrados[0].id !== turnosOriginales[0].id){
      turnosFiltrados = turnosOriginales
    }

    if(e.target.value === "asc" && turnosFiltrados[0].id === turnosOriginales[0].id){
      turnosFiltrados = turnos.reverse()
    } else if(e.target.value === "asc" && turnosFiltrados[0].id !== turnosOriginales[0].id){
      turnosFiltrados = turnosOriginales
    }

    turnos = turnosFiltrados;
    dispatch(filtroTurnoFecha(turnos))
  }


  function handleCancel(e){
    e.preventDefault()
    console.log(e.target.value)
    //swal para cancelar el turno
    //avisa que confirme la cancelacion y se cambia el estado de turno de pendiente a cancelado
  }

  function handleReprogram(e){
    e.preventDefault()
    console.log(e.target.value)
    //swal para reprogramar
    //avisa que confirme la cancelacion del turno
    //redirige a sacar turno y fin
  }

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

  const turnoConcretado = {
    id: "95734532-29a5-4aae-995d-5ec180de1318",
    fecha: "18-2-2022",
    hora: 16,
    idClinica: "4ca34fa9-0436-420b-832a-2bc372eb8909",
    dniCliente: "35678987",
    idDoctor: "0d96509e-0d6b-4e7c-b768-df7d8f1d6da8",
    idEspecialidad: 1,
    status: "concretado",
    name: "consulta",
    description: "Descripción vacía",
    price: 2000,
    stock: 1,
    img: "0",
    createdAt: "2022-02-17T04:18:10.137Z",
    updatedAt: "2022-02-17T04:18:10.137Z",
  };

  const turnoConcretado2 = {
    id: "95734532-29a5-4aae-995d-5ec180de1319",
    fecha: "18-2-2022",
    hora: 20,
    idClinica: "4ca34fa9-0436-420b-832a-2bc372eb8909",
    dniCliente: "35678987",
    idDoctor: "0d96509e-0d6b-4e7c-b768-df7d8f1d6da8",
    idEspecialidad: 1,
    status: "concretado",
    name: "consulta",
    description: "Descripción vacía",
    price: 2000,
    stock: 1,
    img: "0",
    createdAt: "2022-02-17T04:18:10.137Z",
    updatedAt: "2022-02-17T04:18:10.137Z",
  };

  const diagnosticoConcretado = {
    id: 1,
    sintomas: "TIENE COVICHO",
    diagnostico: "LA PORONGA LE MIDE UN METRO",
    indicaciones: "usar un metro industrial",
    estudio: "tu vieja",
    idTurno: "95734532-29a5-4aae-995d-5ec180de1318",
    updatedAt: "2022-02-18T05:04:56.376Z",
    createdAt: "2022-02-18T05:04:56.376Z",
  };

  const diagnosticoConcretado2 = {
    id: 2,
    sintomas: "TIENE COVIIIIIIIIIIIIICHO",
    diagnostico: "LA PORONGA LE MIDE UN METROOOOOOOOOOOOO",
    indicaciones: "usar un metro industrialllllllllllllll",
    estudio: "tu viejaaaaaaaaaaa",
    idTurno: "95734532-29a5-4aae-995d-5ec180de1319",
    updatedAt: "2022-02-18T05:04:56.376Z",
    createdAt: "2022-02-18T05:04:56.376Z",
  };

  const reseniaConcretada2 = {
    reviewed: true,
    id: 2,
    calificacion: 4,
    comentario: "servicio pesimo",
    idTurno: "95734532-29a5-4aae-995d-5ec180de1319",
    updatedAt: "2022-02-18T04:52:04.936Z",
    createdAt: "2022-02-18T04:52:04.936Z",
  };

  const reseniaConcretada = {
    reviewed: true,
    id: 2,
    calificacion: 4,
    comentario: "servicio pesimo",
    idTurno: "95734532-29a5-4aae-995d-5ec180de1318",
    updatedAt: "2022-02-18T04:52:04.936Z",
    createdAt: "2022-02-18T04:52:04.936Z",
  };

  turnosPasados.push(turnoConcretado, turnoConcretado2);
  diagnostico.push(diagnosticoConcretado, diagnosticoConcretado2);
  resenia.push(reseniaConcretada2, reseniaConcretada);






  return (
    <div className="elContenedor">
      <NavLanding />
      <Link class="btn btn-primary" to="/me">
        Volver a mi perfil
      </Link>
      <div class="bigContainer justify-content-center">
          <div class="filtros">
          <h4>Filtrar por fecha</h4>
          <select onChange={(e) => handleFilterSelect(e)}>
            <option value="asc" >Fecha Ascendente</option>
            <option value="desc">Fecha Descendente</option>
          </select>
          </div >
          <div class="filtros">
          <h4>Filtrar por Especialidad</h4>
          <select onChange={(e) => handleFilterSelect(e)}>
            {/* MAP DE ESPECIALIDADES
            
            //busco todos los turno del paciente
            //de cada da turno del paciente saco el id de las clinicas a las que saco turno
            //meto los id de las clinicas en un array
            //busco con el id de clinica y me traigo todas las clinicas en las que saco turno
            //por cada turno del paciente busco la clinica y filtro las especialidades de esa clinica
            //para quedarme unicamente con las especialidades a las que saco turno ese paceinte
            //guardo las especialidades filtradas de la clinica (me quedo con las especialidades que saco turno el paciente)
            //dentro de un array por cada clinica
            //concateno las los array que tienen las especialidades de cada clinica a la q saco turno el paciente y las muestro
            
            
            */}
          </select>
          </div>
          </div>
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
                      {"Turno de la Fecha " + turno.fecha}
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

                {/* TURNO CONCRETADO CON RESENIA FALSE */}

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
                                  {
                                    diagnostico?.find(
                                      (diag) => diag.idTurno === turno.id
                                    )?.sintomas
                                  }
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
                                  {
                                    diagnostico?.find(
                                      (diag) => diag.idTurno === turno.id
                                    )?.indicaciones
                                  }
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
                                  {
                                    diagnostico?.find(
                                      (diag) => diag.idTurno === turno.id
                                    )?.estudio
                                  }
                                </label>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // TURNO CONCRETADO CON RESENIA TRUE
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
                                <label class="form-control" id="message-text">
                                  {
                                    diagnostico?.find(
                                      (diag) => diag.idTurno === turno.id
                                    )?.sintomas
                                  }
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
                                  {
                                    diagnostico?.find(
                                      (diag) => diag.idTurno === turno.id
                                    )?.indicaciones
                                  }
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
                                  {
                                    diagnostico?.find(
                                      (diag) => diag.idTurno === turno.id
                                    )?.estudio
                                  }
                                </label>
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
        <div class="col-6 mt-3">
          {turnosPendientes?.map((turno) => (
            <div class="bigContainer">
            <div class="accordion-item col-6 ">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#collapseOne" + turno.id}
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  {"Turno de la Fecha " + turno.fecha}
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
                        doctores.find((d) => d.id === turno.idDoctor)?.nombre}
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
            <div class="botonRes">
                <div className="botonRes">
                  <button
                    id="botonesTurno"
                    class="btn btn-primary"
                    value={turno.id}
                    onClick={(e) => handleCancel(e)}
                  >
                    Cancelar Turno
                  </button>
                  <button
                    id="botonesTurno"
                    class="btn btn-primary"
                    value={turno.id}
                    onClick={(e) => handleReprogram(e)}
                  >
                    Reagendar turno
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div class="footerTurno">
        <Footer />
      </div>
    </div>
  );
}

