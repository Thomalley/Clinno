import "../ClientCard/TurnoMe.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import Navbar from "../../components/NavBar/NavBar";
import Footer from "../Home/Footer";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
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
  getDiagnostico,
} from "../../actions/index";
import { useAuth0 } from "@auth0/auth0-react";

export default function TurnoMe() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useAuth0();
  let turnos = useSelector((state) => state.turnosDni);
  const diagnosticos = useSelector((state) => state.diagnosticos);
  const doctores = useSelector((state) => state.allDoctoresInDB);
  const resenia = useSelector((state) => state.resenia);
  const horariosDispoDoc = useSelector(
    (state) => state.horarioDisponibleParaTurno
  );
  const dbUserDni = cookies.get("dni");
  const [turnoTotal, setTurnoTotal] = useState([]);
  const [diag, setDiag] = useState("");
  const [idTurno, setidTurno] = useState("");
  const [updateDate, setupdateDate] = useState({
    fecha: "",
    hora: "",
    idTurno: "",
  });
  const [date, setDate] = useState(new Date());
  const [jsdate, setjsDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  };
  const jsFinalDate = `${jsdate.getDate()}-${
    jsdate.getMonth() + 1
  }-${jsdate.getFullYear()}`;
  let diaTurno = undefined;
  let mesTurno = undefined;
  let yearTurno = undefined;
  const puntaje = [1, 2, 3, 4, 5];
  var [finalDate, setfinalDate] = useState();
  const [input, setInput] = useState({
    comentario: "",
    calificacionDoctor: "",
    calificacionClinica: "",
    calificacionClinno: "",
    reviewed: true,
    idTurno: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (dbUserDni) {
      dispatch(getTurnosByDni(dbUserDni)).then((data) =>
        setTurnoTotal(data?.payload)
      );
    } else if (isAuthenticated || user || isLoading) {
      dispatch(getClienteByEmail(user?.email))
        .then((data) => data?.payload?.dni)
        .then((data) => dispatch(getTurnosByDni(data)))
        .then((data) => setTurnoTotal(data?.payload));
    }
    dispatch(getAllDoctores());
    dispatch(getResenia());
    dispatch(getDiagnostico());
  }, []);

  useEffect(() => {
    if (diag !== "") dispatch(getDiagnosticoByTurno(diag));
  }, [diag]);

  useEffect(() => {
    if (idTurno !== "") dispatch(getTurnoId(idTurno));
  }, [idTurno]);

  useEffect(() => {
    if (updateDate.fecha) {
      dispatch(getDisponibilidad(updateDate.fecha, updateDate.idDoctor));
    }
  }, [updateDate.fecha]);

  function validateDate(value) {
    const data = value.toString("").split(" ");
    switch (data[1]) {
      case "Jan":
        mesTurno = 1;
        break;
      case "Feb":
        mesTurno = 2;
        break;
      case "Mar":
        mesTurno = 3;
        break;
      case "Apr":
        mesTurno = 4;
        break;
      case "May":
        mesTurno = 5;
        break;
      case "Jun":
        mesTurno = 6;
        break;
      case "Jul":
        mesTurno = 7;
        break;
      case "Aug":
        mesTurno = 8;
        break;
      case "Sep":
        mesTurno = 9;
        break;
      case "Oct":
        mesTurno = 10;
        break;
      case "Nov":
        mesTurno = 11;
        break;
      case "Dec":
        mesTurno = 12;
        break;
      default:
        break;
    }
    diaTurno = data[2];
    yearTurno = data[3];
    setfinalDate(diaTurno + "-" + mesTurno + "-" + yearTurno);
  }
  // console.log(turnoTotal);
  useEffect(() => {
    if (finalDate !== undefined) {
      const fdD = finalDate[0] + finalDate[1];
      const fdM = finalDate[3] + (finalDate[4] !== "-" ? finalDate[4] : "");
      const fdA =
        finalDate[finalDate.length - 4] +
        finalDate[finalDate.length - 3] +
        finalDate[finalDate.length - 2] +
        finalDate[finalDate.length - 1];
      const jsfdD = jsFinalDate[0] + jsFinalDate[1];
      const jsfdM =
        jsFinalDate[3] + (jsFinalDate[4] !== "-" ? finalDate[4] : "");
      const jsfdA =
        jsFinalDate[jsFinalDate.length - 4] +
        jsFinalDate[jsFinalDate.length - 3] +
        jsFinalDate[jsFinalDate.length - 2] +
        jsFinalDate[jsFinalDate.length - 1];
      if (fdA < jsfdA) {
        return swal(
          `Error al seleccionar dia ${fdD}/${fdM}/${fdA}`,
          "La fecha seleccionada no esta disponible (año acontecido)",
          "warning"
        );
      }
      if (fdM <= jsfdM && fdA < jsfdA) {
        return swal(
          `Error al seleccionar dia ${fdD}/${fdM}/${fdA}`,
          "La fecha seleccionada no esta disponible (año acontecido)",
          "warning"
        );
      }
      if ((fdD <= jsfdD || fdD >= jsfdD) && fdM < jsfdM && fdA <= jsfdA) {
        return swal(
          `Error al seleccionar dia ${fdD}/${fdM}`,
          "La fecha seleccionada no esta disponible (Mes acontecido)",
          "warning"
        );
      }
      if (fdD < jsfdD && fdM <= jsfdM && fdA <= jsfdA) {
        return swal(
          `Error al seleccionar dia ${fdD}/${fdM}`,
          "La fecha seleccionada no esta disponible (Dia acontecido)",
          "warning"
        );
      } else {
        setupdateDate({ ...updateDate, fecha: finalDate });
      }
    }
  }, [finalDate]);

  const [ascendente, setAscendente] = useState(false);

  function esFecha(finalDate){
    if (finalDate !== undefined) {
        const fdD = parseInt( finalDate[0] + finalDate[1],10)
        const fdM = parseInt( finalDate[3] + (finalDate[4] !== "-" ? finalDate[4] : ""),10)
        const fdA = parseInt( finalDate[finalDate.length - 4] + finalDate[finalDate.length - 3] + finalDate[finalDate.length - 2] + finalDate[finalDate.length - 1],10)
        // const jsfdD = jsFinalDate[0] + (jsFinalDate[1] !== "-")
        // const jsfdM = jsFinalDate[3] + (jsFinalDate[4] !== "-" ? finalDate[4] : "")
        // const jsfdA = parseInt( jsFinalDate[jsFinalDate.length - 4] + jsFinalDate[jsFinalDate.length - 3] + jsFinalDate[jsFinalDate.length - 2] + jsFinalDate[jsFinalDate.length - 1],10)
        const arr = jsFinalDate.split('-')
        const jsfdD = parseInt(arr[0],10)
        const jsfdM = parseInt(arr[1],10)
        const jsfdA = parseInt(arr[2],10)
        // console.log(jsFinalDate.split('-'))
        // console.log(finalDate)
        if ( fdA < jsfdA) {//2021 2022
            return true
        }
        if (fdM < jsfdM && fdA === jsfdA) {//02-2022  < 03-2022
            return true
        }
        if ( fdD < jsfdD && fdM === jsfdM && fdA === jsfdA) {//21-01-2022 > 18-02-2022
            return true
        }
        return false
    }else{
        return false
    }
}
  function handleOrderFecha(e) {
    e.preventDefault();
    if (e.target.value === "asc") {
      setAscendente(true);
    } else {
      setAscendente(false);
    }
  }

  function handleFilterSelect(e) {
    e.preventDefault();
  }
  const handleSelectHora = (e) => {
    setupdateDate({
      ...updateDate,
      hora: e.target.value,
    });
  };

  function validate() {
    let errors = {};
    // if (!input.comentario || input.comentario === "" || input.comentario.length < 200) {
    //   errors.comentario = 'Comentario requerido, maximo 200 caracteres';
    // }
    if (!input.calificacionDoctor || input.calificacionDoctor === "") {
      errors.calificacionDoctor = "Calificacion requerida";
    }
    if (!input.calificacionClinica || input.calificacionClinica === "") {
      errors.calificacionClinica = "Calificacion requerida";
    }
    if (!input.calificacionClinno || input.calificacionClinno === "") {
      errors.calificacionClinno = "Calificacion requerida";
    }

    return errors;
  }

  const handleCancelar = (e) => {
    e.preventDefault();
    setidTurno(e.target.value);
  };

  const handleModificar = (e) => {
    e.preventDefault();
    setupdateDate({
      ...updateDate,
      idDoctor: e.target.value,
    });
  };

  const handleSubmitModificar = (e) => {
    e.preventDefault();
    if (updateDate.fecha.length < 1 || updateDate.hora.length < 1) {
      return swal(
        "Error al modificar turno",
        "Seleccione un dia y horario para modificar su turno correctamente",
        "error"
      );
    } else {
      dispatch(
        modifTurno({
          nuevaFecha: updateDate.fecha,
          nuevaHora: updateDate.hora,
          idTurno: e.target.value,
        })
      );
      swal(
        "Listo",
        `Su turno ha sido modificado con exito para el dia ${updateDate.fecha} a las ${updateDate.hora}`,
        "success"
      );
      setTimeout(() => (window.location.href = "/me"), 2000);
    }
  };

  const handleCancelModal = () => {
    dispatch(canTurno({ status: "cancelado", idTurno: idTurno }));
    swal("Listo", "Su turno ha sido cancelado con exito", "success");
    setTimeout(() => (window.location.href = "/me"), 2000);
  };

  function handleChange(e) {
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelectDoctor(e) {
    setInput({
      ...input,
      calificacionDoctor: input?.name?.includes(parseInt(e.target.value))
        ? [...input.name]
        : [parseInt(e.target.value)],
    });
  }

  function handleSelectClinica(e) {
    setInput({
      ...input,
      calificacionClinica: input?.name?.includes(parseInt(e.target.value))
        ? [...input.name]
        : [parseInt(e.target.value)],
    });
  }

  function handleSelectClinno(e) {
    setInput({
      ...input,
      calificacionClinno: input?.name?.includes(parseInt(e.target.value))
        ? [...input.name]
        : [parseInt(e.target.value)],
    });
  }

  function handleClick(e) {
    setInput({
      ...input,
      idTurno: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    dispatch(addResenia(input));
  }

  return (
    <div className="elContenedor">
      <div className="container">
        <Navbar loggin={true} />
        <div style={{ "margin-top": "9pc" }}></div>

        {/* <Link class="btn btn-primary" to="/me">
        Volver a mi perfil
      </Link> */}

        <div className="row">
          <div className="col-4"></div>
          <h2 class="main_title_turno">Mis Turnos</h2>
          <div className="col-4"></div>
        </div>

        <div className="row">
          <div className="titulosTurno">
            <h3>Historial de Turnos</h3>
            <h3>Turnos Pendientes</h3>
          </div>
        </div>

          <div className="col-12">
        <div className="row">
            <div className="de_filters_me">
            <h4 className="del_h4_me" >Ordenar por fecha</h4>

          {/* </div> */}

            {/* <div className="col-9"> */}
            <select style={{"font-size":"10px"}} onChange={(e) => handleOrderFecha(e)}>
              <option disabled selected>
                Seleccione un Orden
              </option>
              <option value="asc">Fecha Ascendente</option>
              <option value="desc">Fecha Descendente</option>
            </select>

            </div>
            </div>
        </div>

        <div class="row containerTurno">
          <div class="col-6 mt-3">
            {turnoTotal.length !== 0 ? (
              turnoTotal
                ?.sort(function (a, b) {
                  //pendientes
                  if (a.fecha < b.fecha) return ascendente ? -1 : 1;
                  if (a.fecha > b.fecha) return ascendente ? 1 : -1;
                  return a.hora < b.hora ? (ascendente ? 1 : -1) : 1;
                })
                .map((turno) => {
                  if (turno.status === "concretado") {
                    return (
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
                              {"Turno el " + turno.fecha}
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
                                    doctores.find(
                                      (d) => d.id === turno.idDoctor
                                    )?.nombre}
                                </label>
                              </div>
                              <div class="card">
                                <label>Especialidad</label>
                                <label>
                                  {doctores &&
                                    doctores[0]?.especialidads[0]?.nombre}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* TURNO CONCRETADO CON RESENIA FALSE */}
                        {console.log( resenia.find(r=>r))}
                        {turno.status === "concretado" && 
                          (resenia.length ===0 ? true :
                         resenia?.find((r) => r.idTurno === turno.id)?.reviewed === false) ? 
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
                                    <h5
                                      class="modal-title"
                                      id="exampleModalLabel"
                                    >
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
                                        <textarea
                                          onChange={(e) => handleChange(e)}
                                          value={input.comentario}
                                          name="comentario"
                                          class="form-control"
                                          id="message-text"
                                        ></textarea>
                                      </div>
                                      {errors.comentario && (
                                        <p
                                          id="error_en_reg"
                                          className="errorNotWrtd"
                                        >
                                          {errors.comentario}
                                        </p>
                                      )}
                                      <div class="mb-3">
                                        <label
                                          for="message-text"
                                          class="col-form-label"
                                        >
                                          Su Calificacion al doctor:
                                        </label>
                                        <select
                                          onChange={(e) =>
                                            handleSelectDoctor(e)
                                          }
                                          class="form-control"
                                          id="message-text"
                                        >
                                          {puntaje?.map((p) => (
                                            <option value={p}>{p}</option>
                                          ))}
                                        </select>
                                      </div>
                                      {errors.calificacionDoctor && (
                                        <p
                                          id="error_en_reg"
                                          className="errorNotWrtd"
                                        >
                                          {errors.calificacionDoctor}
                                        </p>
                                      )}
                                      <div class="mb-3">
                                        <label
                                          for="message-text"
                                          class="col-form-label"
                                        >
                                          Su celificacion a la clinica:
                                        </label>
                                        <select
                                          onChange={(e) =>
                                            handleSelectClinica(e)
                                          }
                                          class="form-control"
                                          id="message-text"
                                        >
                                          {puntaje?.map((p) => (
                                            <option value={p}>{p}</option>
                                          ))}
                                        </select>
                                      </div>
                                      {errors.calificacionClinica && (
                                        <p
                                          id="error_en_reg"
                                          className="errorNotWrtd"
                                        >
                                          {errors.calificacionClinica}
                                        </p>
                                      )}
                                      <div class="mb-3">
                                        <label
                                          for="message-text"
                                          class="col-form-label"
                                        >
                                          Su calificacion a clinno:
                                        </label>
                                        <select
                                          onChange={(e) =>
                                            handleSelectClinno(e)
                                          }
                                          class="form-control"
                                          id="message-text"
                                        >
                                          {puntaje?.map((p) => (
                                            <option value={p}>{p}</option>
                                          ))}
                                        </select>
                                      </div>
                                      {errors.calificacionClinno && (
                                        <p
                                          id="error_en_reg"
                                          className="errorNotWrtd"
                                        >
                                          {errors.calificacionClinno}
                                        </p>
                                      )}
                                      <div class="modal-footer">
                                        <button
                                          type="submit"
                                          class="btn btn-primary"
                                          value={turno.id}
                                          onClick={(e) => handleClick(e)}
                                        >
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
                                    <h5
                                      class="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Diagnostico del turno de la fecha{" "}
                                      {turno.fecha}
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
                                        <label
                                          class="form-control"
                                          id="message-text"
                                        >
                                          {
                                            diagnosticos?.find(
                                              (diag) =>
                                                diag.idTurno === turno.id
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
                                        <label
                                          class="form-control"
                                          id="message-text"
                                        >
                                          {
                                            diagnosticos?.find(
                                              (diag) =>
                                                diag.idTurno === turno.id
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
                                        <label
                                          class="form-control"
                                          id="message-text"
                                        >
                                          {
                                            diagnosticos?.find(
                                              (diag) =>
                                                diag.idTurno === turno.id
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
                                        <label
                                          class="form-control"
                                          id="message-text"
                                        >
                                          {
                                            diagnosticos?.find(
                                              (diag) =>
                                                diag.idTurno === turno.id
                                            )?.diagnostico
                                          }
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                         : 
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
                                    <h5
                                      class="modal-title"
                                      id="exampleModalLabel"
                                    >
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
                                      <label
                                        for="message-text"
                                        class="col-form-label"
                                      >
                                        Su Comentario
                                      </label>
                                      <label
                                        class="form-control"
                                        id="message-text"
                                      >
                                        {
                                          resenia?.find(
                                            (res) => res.idTurno === turno.id
                                          )?.comentario
                                        }
                                      </label>
                                      <label
                                        for="message-text"
                                        class="col-form-label"
                                      >
                                        Su Calificacion al doctor
                                      </label>
                                      <label
                                        class="form-control"
                                        id="message-text"
                                      >
                                        {
                                          resenia?.find(
                                            (res) => res.idTurno === turno.id
                                          )?.calificacionDoctor
                                        }
                                      </label>
                                      <label
                                        for="message-text"
                                        class="col-form-label"
                                      >
                                        Su Calificacion a la clinica
                                      </label>
                                      <label
                                        class="form-control"
                                        id="message-text"
                                      >
                                        {
                                          resenia?.find(
                                            (res) => res.idTurno === turno.id
                                          )?.calificacionClinica
                                        }
                                      </label>
                                      <label
                                        for="message-text"
                                        class="col-form-label"
                                      >
                                        Su Calificacion a clinno
                                      </label>
                                      <label
                                        class="form-control"
                                        id="message-text"
                                      >
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
                                    <h5
                                      class="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Diagnostico del turno de la fecha{" "}
                                      {turno.fecha}
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
                                        <label
                                          class="form-control"
                                          id="message-text"
                                        >
                                          {
                                            diagnosticos?.find(
                                              (diag) =>
                                                diag.idTurno === turno.id
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
                                        <label
                                          class="form-control"
                                          id="message-text"
                                        >
                                          {
                                            diagnosticos?.find(
                                              (diag) =>
                                                diag.idTurno === turno.id
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
                                        <label
                                          class="form-control"
                                          id="message-text"
                                        >
                                          {
                                            diagnosticos?.find(
                                              (diag) =>
                                                diag.idTurno === turno.id
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
                                        <label
                                          class="form-control"
                                          id="message-text"
                                        >
                                          {
                                            diagnosticos?.find(
                                              (diag) =>
                                                diag.idTurno === turno.id
                                            )?.diagnostico
                                          }
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    );
                  }
                })
            ) : (
              <p className="turnoP">No hay turnos pasados</p>
            )}
          </div>

          <div class="col-6 mt-3">
            {turnoTotal?.map((turno) => {
              //Pendientes 
              if (turno.status !== 'concretado' && !esFecha(turno.fecha) ) {
                return (
                  <div class="bigContainer">
                    <div class="accordion-item col-6 ">
                      <h2 class="accordion-header" id="headingOne">
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={"#collapseTwo" + turno.id}
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          {"Turno el " + turno.fecha}
                        </button>
                      </h2>
                      <div
                        id={"collapseTwo" + turno.id}
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
                              {doctores &&
                                doctores[0]?.especialidads[0]?.nombre}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div class="botonRes">
                <div className="botonRes"> */}

                    <button
                      type="button"
                      id="botonesTurno"
                      value={turno.idDoctor}
                      onClick={handleModificar}
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target={"#exampleModal" + turno.id}
                    >
                      Modificar
                    </button>

                    <div
                      class="modal fade"
                      id={"exampleModal" + turno.id}
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog" id="elCartelodeme_">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Estas a punto de <strong>reagendar</strong> el turno
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <h3 className="elh3DelMe">Elige la fecha </h3>
                            <div className="el_calendar_me">
                            <Calendar
                              onChange={onChange}
                              value={date}
                              onClickDay={(value) => validateDate(value)}
                            />
                            </div>
                          </div>
                          <h3 className="display-6" id="elh3_deHoraMe">
                            Horario:{" "}
                          </h3>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            onChange={(e) => handleSelectHora(e)}
                          >
                            <option
                              value=""
                              disabled
                              selected
                            >{`Horarios disponibles ${updateDate.fecha.replace(
                              "-",
                              "/"
                            )}`}</option>
                            {horariosDispoDoc &&
                              horariosDispoDoc.map((e) => (
                                <option value={e}>{e}</option>
                              ))}
                          </select>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Volver atras
                            </button>
                            <button
                              value={turno.id}
                              onClick={handleSubmitModificar}
                              type="button"
                              class="btn btn-primary"
                            >
                              Continuar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      id="botonesTurno"
                      value={turno.id}
                      onClick={handleCancelar}
                      class="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target={"#exampleModal2" + turno.id}
                    >
                      cancelar
                    </button>
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
                              Estas a punto de <strong>cancelar</strong> el turno
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            Si cancelas el turno, no podras volver atras, estas
                            seguro?
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={handleCancelModal}
                              type="button"
                              class="btn btn-danger"
                            >
                              Si borrar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* </div>
              </div> */}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div class="footerTurno"></div>
      </div>
      <Footer />
    </div>
  );
}
