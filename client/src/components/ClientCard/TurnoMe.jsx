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
  getDisponibilidad,
  modifTurno,
  getClienteByEmail,
  addResenia,
  getDiagnostico
} from "../../actions/index";
import { useAuth0 } from '@auth0/auth0-react'


export default function TurnoMe() {

  const cookies = new Cookies();
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useAuth0();
  let turnos = useSelector((state) => state.turnosDni);
  const diagnosticos = useSelector((state) => state.diagnosticos);
  const doctores = useSelector((state) => state.allDoctoresInDB);
  const resenia = useSelector((state) => state.resenia);
  const horariosDispoDoc = useSelector((state) => state.horarioDisponibleParaTurno)
  const [dni_user, setdni_user] = useState()
  const dbUserDni = cookies.get("dni")
  let turnosPendientes = []
  let turnosPasados = []
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
  const puntaje = [1,2,3,4,5]
  const [input, setInput] = useState({
    comentario:"",
    calificacionDoctor:"",
    calificacionClinica:"",
    calificacionClinno:"",
    reviewed:true,
    idTurno:""
})
const [errors, setErrors] = useState({});

  useEffect(() => {
    if (dbUserDni) {
      dispatch(getTurnosByDni(dbUserDni));
      dispatch(getAllDoctores());
      dispatch(getResenia());
    } else if (isAuthenticated || isLoading || user) {
      dispatch(getClienteByEmail(user?.email)).then((data) => data?.payload?.dni)
        .then((data) => setdni_user(data))
      dispatch(getAllDoctores());
      dispatch(getResenia());
    }
    // dispatch(getTurnosByDni(dni_user))
  }, []);

  // useEffect(()=>{
  //   if(turnos.length === 0){
  //     dispatch(getTurnosByDni(dbUserDni));
  //   }
  // },[turnos])


  useEffect(()=>{
    dispatch(getTurnosByDni(dni_user))
    dispatch(getDiagnostico())
  },[dni_user])


  useEffect(() => {
    if (diag !== "") dispatch(getDiagnosticoByTurno(diag));
  }, [diag]);


  useEffect(() => {
    if (idTurno !== "") dispatch(getTurnoId(idTurno));
  }, [idTurno]);

  useEffect(() => {
    if(updateDate.fecha){
    dispatch(getDisponibilidad(updateDate.fecha, updateDate.idDoctor))
  }}, [updateDate.fecha])


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

  function handleFilterSelect(e) {}

  const handleSelectHora = (e) => {
    setupdateDate({
      ...updateDate,
      hora: e.target.value
    })
  }

  function validate() {
    let errors = {};
    if (!input.comentario || input.comentario === "" || input.comentario.length < 200) {
      errors.comentario = 'Comentario requerido, maximo 200 caracteres';
    }
    if (!input.calificacionDoctor || input.calificacionDoctor === "") {
      errors.calificacionDoctor = 'Calificacion requerida';
    }
    if (!input.calificacionClinica || input.calificacionClinica === "") {
      errors.calificacionClinica = 'Calificacion requerida';
    }
    if (!input.calificacionClinno || input.calificacionClinno === "") {
      errors.calificacionClinno = 'Calificacion requerida';
    }
    
    return errors;
  }

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
    setTimeout(() => window.location.href = '/me', 2000)
  }

  const handleCancelModal = () => {
    console.log(idTurno)
    dispatch(canTurno({ status: "cancelado", idTurno: idTurno }))
    swal("Listo", "Su turno ha sido cancelado con exito", "success")
    setTimeout(() => window.location.href = '/me', 2000)
  }

  function handleChange(e){
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })}

    function handleSelectDoctor(e){
      setInput({
        ...input,
        calificacionDoctor: input?.name?.includes(parseInt(e.target.value)) ? [...input.name] : [parseInt(e.target.value)]
    })}

    function handleSelectClinica(e){
      setInput({
        ...input,
        calificacionClinica: input?.name?.includes(parseInt(e.target.value)) ? [...input.name] : [parseInt(e.target.value)]
    })}

    function handleSelectClinno(e){
      setInput({
        ...input,
        calificacionClinno: input?.name?.includes(parseInt(e.target.value)) ? [...input.name] : [parseInt(e.target.value)]
    })}

    function handleClick(e){
      setInput({
        ...input,
        idTurno: e.target.value
    })}
    
  function handleSubmit(e){
    e.preventDefault()
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
    console.log(input)
    dispatch(addResenia(input))
  }

  for (let i = 0; i < turnos.length; i++) {
    if (turnos[i].status === "concretado") {
      turnosPasados.push(turnos[i])
    } else if (turnos[i].status === "pendiente") {
      turnosPendientes.push(turnos[i])
    }
  }

  turnosPasados.push({
    "id": "2beaf02a-8bcb-4952-9c59-cd93d06bf29b",
    "fecha": "15-2-2022",
    "hora": 10,
    "idClinica": "deaae5fc-b0fd-4d25-925e-8f9661f9f5f4",
    "dniCliente": "39482681",
    "idDoctor": "611d8854-5a63-4e12-8c83-3783c1a38333",
    "idEspecialidad": 1,
    "status": "concretado",
  })

  
  
console.log(diagnosticos)

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
          <h4>Filtrar por Clinica</h4>
          <select onChange={(e) => handleFilterSelect(e)}>
            {

            }
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
                {
                  
                }
                {turno.status === "concretado" && resenia?.find((r) => r.idTurno === turno.id)?.reviewed === false ? (
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
                              Reseña del turno de la fecha {turno.fecha}
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <form onSubmit={(e) => handleSubmit(e)}>
                              <div class="mb-3">
                                <label
                                  for="message-text"
                                  class="col-form-label"
                                >
                                  Su Comentario:
                                </label>
                                <textarea onChange={(e) => handleChange(e)} value={input.comentario} name="comentario"
                                  class="form-control"
                                  id="message-text"
                                ></textarea>
                              </div>
                              {
                                  errors.comentario && (
                                  <p id="error_en_reg" className='errorNotWrtd'>
                                  {errors.comentario}
                                  </p>
                                  )
                                }
                              <div class="mb-3">
                                <label
                                  for="message-text"
                                  class="col-form-label"
                                >
                                  Su Calificacion al doctor:
                                </label>
                                <select onChange={(e) => handleSelectDoctor(e)} class="form-control" id="message-text" >
                               {
                               puntaje?.map((p) => <option value={p}>{p}</option>)
                               }
                                </select>
                                </div>
                                {
                                  errors.calificacionDoctor && (
                                  <p id="error_en_reg" className='errorNotWrtd'>
                                  {errors.calificacionDoctor}
                                  </p>
                                  )
                                }
                                <div class="mb-3">
                                <label
                                  for="message-text"
                                  class="col-form-label"
                                >
                                  Su celificacion a la clinica:
                                </label>
                                <select onChange={(e) => handleSelectClinica(e)} class="form-control" id="message-text" >
                               {
                               puntaje?.map((p) => <option value={p}>{p}</option>)
                               }
                                </select>
                                </div>
                                {
                                  errors.calificacionClinica && (
                                  <p id="error_en_reg" className='errorNotWrtd'>
                                  {errors.calificacionClinica}
                                  </p>
                                  )
                                }
                                <div class="mb-3">
                                <label
                                  for="message-text"
                                  class="col-form-label"
                                >
                                  Su calificacion a clinno:
                                </label>
                                <select onChange={(e) => handleSelectClinno(e)} class="form-control" id="message-text" >
                               {
                               puntaje?.map((p) => <option value={p}>{p}</option>)
                               }
                                </select>
                              </div>
                              {
                                  errors.calificacionClinno && (
                                  <p id="error_en_reg" className='errorNotWrtd'>
                                  {errors.calificacionClinno}
                                  </p>
                                  )
                                }
                          <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" value={turno.id} onClick={(e) => handleClick(e)}>
                              Guardar Reseña
                            </button>
                          </div>
                          </form>
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
                              Diagnostico del turno de la fecha {turno.fecha}
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div>
                              <div class="mb-3">
                                <label
                                  for="message-text"
                                  class="col-form-label"
                                >
                                  Sintomas:
                                </label>
                                <label class="form-control" id="message-text">

                                  {
                                     diagnosticos?.find(
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
                                     diagnosticos?.find(
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
                                     diagnosticos?.find(
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
                                  {diagnosticos?.find(
                                       (diag) => diag.idTurno === turno.id
                                     )?.diagnostico}
                                </label>
                              </div>
                            </div>
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
                              Reseña del turno de la fecha {turno.fecha}
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
                                Su Comentario
                              </label>
                              <label class="form-control" id="message-text">
                                {
                                  resenia?.find(
                                    (res) => res.idTurno === turno.id
                                  )?.comentario
                                }
                              </label>
                              <label for="message-text" class="col-form-label">
                                Su Calificacion al doctor
                              </label>
                              <label class="form-control" id="message-text">
                                {
                                  resenia?.find(
                                    (res) => res.idTurno === turno.id
                                  )?.calificacionDoctor
                                }
                              </label>
                              <label for="message-text" class="col-form-label">
                                Su Calificacion a la clinica
                              </label>
                              <label class="form-control" id="message-text">
                                {
                                  resenia?.find(
                                    (res) => res.idTurno === turno.id
                                  )?.calificacionClinica
                                }
                              </label>
                              <label for="message-text" class="col-form-label">
                                Su Calificacion a clinno
                              </label>
                              <label class="form-control" id="message-text">
                                {
                                  resenia?.find(
                                    (res) => res.idTurno === turno.id
                                  )?.calificacionClinno
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
                              Diagnostico del turno de la fecha {turno.fecha}
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div>
                              <div class="mb-3">
                                <label
                                  for="message-text"
                                  class="col-form-label"
                                >
                                  Sintomas:
                                </label>
                                <label class="form-control" id="message-text">

                                  {
                                     diagnosticos?.find(
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
                                     diagnosticos?.find(
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
                                     diagnosticos?.find(
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
                                  {diagnosticos?.find(
                                       (diag) => diag.idTurno === turno.id
                                     )?.diagnostico}
                                </label>
                              </div>
                            </div>
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




              <button type="button" id="botonesTurno" value={turno.idDoctor} onClick={handleModificar} class="btn btn-success" data-bs-toggle="modal" data-bs-target={"#exampleModal" + turno.id}>
                Modificar
              </button>

              <div class="modal fade" id={"exampleModal" + turno.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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


              <button type="button" id="botonesTurno" value={turno.id} onClick={handleCancelar} class="btn btn-danger" data-bs-toggle="modal" data-bs-target={"#exampleModal2" + turno.id}>
                cancelar
              </button>
              <div class="modal fade" id={"exampleModal2" + turno.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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