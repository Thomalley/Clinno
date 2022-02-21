import "../ClientCard/TurnoMe.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import NavLanding from "../../components/NavLanding/NavLanding";
import Footer from "../Home/Footer";
import swal from 'sweetalert'
import { Link } from "react-router-dom";
import Calendar from 'react-calendar'
import {
  getTurnosByDni,
  getAllDoctores,
  getResenia,
  getDiagnosticoByTurno,
  getTurnoId,
  canTurno,
  filtroTurnoFecha,
  getDisponibilidad,
  modifTurno
} from "../../actions/index";


export default function TurnoMe() {

  const cookies = new Cookies();
  const dispatch = useDispatch();
  let turnos = useSelector((state) => state.turnosDni);
  const doctores = useSelector((state) => state.allDoctoresInDB);
  const resenia = useSelector((state) => state.resenia);
  const diagnostico = useSelector((state) => state.diagDoctor);
  // const turnoId = useSelector((state) => state.turnoById);
  const horariosDispoDoc = useSelector((state) => state.horarioDisponibleParaTurno)
  const dni_user = cookies.get("dni");
  const turnosPendientes = [];
  const turnosPasados = [];
  const turnosOriginales = turnos
  let turnosFiltrados = turnosOriginales;
  const [diag, setDiag] = useState("");
  const [idTurno, setidTurno] = useState("");
  const [updateDate, setupdateDate] = useState({ fecha: "", hora: "", idTurno: "" })
  const [date, setDate] = useState(new Date());
  const onChange = date => {
    setDate(date)
  }
  const jsFinalDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  let diaTurno = undefined;
  let mesTurno = undefined;
  let yearTurno = undefined;
  var finalDate = undefined;


  useEffect(() => {
    dispatch(getTurnosByDni(dni_user));
    dispatch(getAllDoctores());
    dispatch(getResenia());
  }, []);


  useEffect(() => {
    if (diag !== "") dispatch(getDiagnosticoByTurno(diag));
  }, [diag]);


  useEffect(() => {
    if (idTurno !== "") dispatch(getTurnoId(idTurno));
  }, [idTurno]);

  useEffect(() => {
    dispatch(getDisponibilidad(updateDate.fecha, updateDate.idDoctor))
  }, [updateDate.fecha])


  function validateDate(value) {
    const data = value.toString('').split(' ');
    switch (data[1]) {
      case "Jan":
        mesTurno = 1
        break
      case "Feb":
        mesTurno = 2
        break
      case "Mar":
        mesTurno = 3
        break
      case "Apr":
        mesTurno = 4
        break
      case "May":
        mesTurno = 5
        break
      case "Jun":
        mesTurno = 6
        break
      case "Jul":
        mesTurno = 7
        break
      case "Aug":
        mesTurno = 8
        break
      case "Sep":
        mesTurno = 9
        break
      case "Oct":
        mesTurno = 10
        break
      case "Nov":
        mesTurno = 11
        break
      case "Dec":
        mesTurno = 12
        break
      default:
        break;
    }
    diaTurno = data[2];
    yearTurno = data[3];
    finalDate = diaTurno + '-' + mesTurno + '-' + yearTurno;
    if (finalDate < jsFinalDate) {
      swal("Error al seleccionar dia", "La fecha seleccionada no esta disponible (Dia acontecido)", "warning")
      return
    }
    setupdateDate({
      ...updateDate,
      fecha: finalDate
    })

  }

  function handleFilterSelect(e) {
    e.preventDefault();
    console.log(turnos)
    if (e.target.value === "desc" && turnosFiltrados[0].id === turnosOriginales[0].id) {
      turnosFiltrados = turnos.reverse()
    } else if (e.target.value === "desc" && turnosFiltrados[0].id !== turnosOriginales[0].id) {
      turnosFiltrados = turnosOriginales
    }

    if (e.target.value === "asc" && turnosFiltrados[0].id === turnosOriginales[0].id) {
      turnosFiltrados = turnos.reverse()
    } else if (e.target.value === "asc" && turnosFiltrados[0].id !== turnosOriginales[0].id) {
      turnosFiltrados = turnosOriginales
    }

    turnos = turnosFiltrados;
    dispatch(filtroTurnoFecha(turnos))
  }

  const handleSelectHora = (e) => {
    setupdateDate({
      ...updateDate,
      hora: e.target.value
    })
  }


  const handleSelect = (e) => {
    setDiag(e.target.value);
    e.preventDefault();
  };

  const handleCancelar = (e) => {
    e.preventDefault()
    setidTurno(e.target.value)
  }

  const handleModificar = (e) => {
    e.preventDefault()
    setupdateDate({
      ...updateDate,
      idDoctor: e.target.value
    })

  }

  const handleSubmitModificar = (e) => {
    e.preventDefault()
    dispatch(modifTurno({ nuevaFecha: updateDate.fecha, nuevaHora: updateDate.hora, idTurno: e.target.value }))
    swal("Listo", `Su turno ha sido modificado con exito para el dia ${updateDate.fecha} a las ${updateDate.hora}`, "success")
    setTimeout(() => window.location.href = '/TurnoMe', 2000)
  }

  const handleCancelModal = () => {
    console.log(idTurno)
    dispatch(canTurno({ status: "cancelado", idTurno: idTurno }))
    swal("Listo", "Su turno ha sido cancelado con exito", "success")
    setTimeout(() => window.location.href = '/TurnoMe', 2000)
  }


  for (let i = 0; i < turnos.length; i++) {
    if (turnos[i].status === "concretado") {
      turnosPasados.push(turnos[i]);
    } else if (turnos[i].status === "pendiente") {
      turnosPendientes.push(turnos[i]);
    }
  }


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




              {/* <div class="botonRes">
                <div className="botonRes"> */}




              <button type="button" id="botonesTurno" value={turno.idDoctor} onClick={handleModificar} class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Modificar
              </button>

              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Estas a punto de reagendar el turno</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <h3>Elige la fecha </h3>
                      <Calendar
                        onChange={onChange}
                        value={date}
                        onClickDay={(value) => validateDate(value)}
                      />
                    </div>
                    <h3 className="display-6" id="Hor_Tur_Crea">Horario: </h3>
                    <select id="Sel_Tur_Crea_Hora" class="form-select" aria-label="Default select example" onChange={(e) => handleSelectHora(e)}>
                      <option value="" disabled selected>{`Horarios disponibles ${updateDate.fecha.replace('-', '/')}`}</option>
                      {horariosDispoDoc && horariosDispoDoc.map((e) => (
                        <option value={e}>{e}</option>
                      ))}
                    </select>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Volver atras</button>
                      <button value={turno.id} onClick={handleSubmitModificar} type="button" class="btn btn-primary">Continuar</button>
                    </div>
                  </div>
                </div>
              </div>


              <button type="button" id="botonesTurno" value={turno.id} onClick={handleCancelar} class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                cancelar
              </button>
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Estas a punto de cancelar el turno</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      Si cancelas el turno, no podras volver atras, estas seguro?
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                      <button onClick={handleCancelModal} type="button" class="btn btn-primary">Si borrar</button>
                    </div>
                  </div>
                </div>
              </div>




              {/* </div>
              </div> */}




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
