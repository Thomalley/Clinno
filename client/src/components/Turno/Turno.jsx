/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import {
  getEspecialidad,
  getClinicasByEspec,
  getDoctoresByEspec,
  crearTurno,
  getDisponibilidad,
  getClienteByEmail,
} from "../../actions";
import swal from "sweetalert";
import NavBar from "../NavBar/NavBar";
import Footer from "../Home/Footer";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendario.css";
import "./turno.css";
import Bot from "../Bot/Bot";
import { useAuth0 } from "@auth0/auth0-react";

export default function Turno() {
  const especialidades = useSelector((state) => state.especialidades);
  const clinicasDeEspe = useSelector((state) => state.clinicasByEspec);
  const doctoresDeEspe = useSelector((state) => state.doctoresByEspec);
  const horariosDispoDoc = useSelector(
    (state) => state.horarioDisponibleParaTurno
  );
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [dniGoogle, setdniGoogle] = useState();
  const cookies = new Cookies();
  const [loggeado, setLoggeado] = useState();
  var userLog = cookies.get("email") ? cookies.get("email") : isAuthenticated;
  const idUser = cookies.get("dni") ? cookies.get("dni") : 0;
  const [idValue, setidValue] = useState({
    idEspecialidad: "",
    idClinica: "",
    horarioDoctor: [],
    idDoctor: "",
    fecha: "",
    hora: "",
    dniCliente: idUser,
  });
  const [date, setDate] = useState(new Date());
  const [jsdate, setjsDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  };
  let diaTurno = undefined;
  let mesTurno = undefined;
  let yearTurno = undefined;
  var [finalDate, setfinalDate] = useState();
  const [submit, setSubmit] = useState({ canSubmit: undefined });
  const [hasClinic, setHasClinic] = useState({ clinic: true });
  const [hasDoctor, setHasDoctor] = useState({ doctor: true });
  const [errors, setErrors] = useState({});
  var [progressTur, setProgressTur] = useState({ width: "0%" });
  const jsFinalDate = `${jsdate.getDate()}-${
    jsdate.getMonth() + 1
  }-${jsdate.getFullYear()}`;
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

//   let dispoHorarios = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
//     if (10 >= dispoHorarios[0] && 10 < 20) {
//       for (let i = 0; 10 >= dispoHorarios[i]; i++) {
//         dispoHorarios.shift();
//       }
//     }
//     console.log(dispoHorarios);

  const [actDay, setactDay] = useState()
  const [userDay, setuseractDay] = useState()

  useEffect(() => {
    if (finalDate !== undefined) {
      const fdD = finalDate[0] + finalDate[1];
      const fdM = finalDate[3] + (finalDate[4] !== "-" ? finalDate[4] : "");
      const fdA =
        finalDate[finalDate.length - 4] +
        finalDate[finalDate.length - 3] +
        finalDate[finalDate.length - 2] +
        finalDate[finalDate.length - 1];
        setuseractDay(fdD + "/" + fdM)
      const jsfdD = jsFinalDate[0] + jsFinalDate[1];
      const jsfdM =
        jsFinalDate[3] + (jsFinalDate[4] !== "-" ? finalDate[4] : "");
      const jsfdA =
        jsFinalDate[jsFinalDate.length - 4] +
        jsFinalDate[jsFinalDate.length - 3] +
        jsFinalDate[jsFinalDate.length - 2] +
        jsFinalDate[jsFinalDate.length - 1];
        setactDay(fdD + "/" + fdM)


      // console.log("dia elegido", fdD, fdM, fdA);

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
        setidValue({ ...idValue, fecha: finalDate });
        setProgressTur({
          ...setProgressTur,
          width: "80%",
        });
      }
    }
  }, [finalDate]);

  useEffect(() => {
    if (userLog.length > 1 || isAuthenticated || user) {
      setLoggeado(true);
    }
    if (!userLog) {
      setLoggeado(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated || isLoading || user)
      dispatch(getClienteByEmail(user?.email))
        .then((data) => data?.payload?.dni)
        .then((data) => setdniGoogle(data));
  }, []);

  useEffect(() => {
    if (idValue.fecha) {
      dispatch(getDisponibilidad(idValue.fecha, idValue.idDoctor));
      validateInfo();
    }
  }, [idValue.fecha]);

  useEffect(() => {
    userLog ? setLoggeado(true) : setLoggeado(false);
  }, []);

  useEffect(() => {
    dispatch(getEspecialidad());
  }, []);

  useEffect(() => {
    dispatch(getClinicasByEspec(idValue.idEspecialidad));
    if (clinicasDeEspe.clinicas && clinicasDeEspe.clinicas.length < 1) {
      setHasClinic({ clinic: false });
      setErrors({ ...errors, clinica: true });
    } else {
      setHasClinic({ clinic: true });
      setErrors({ ...errors, clinica: false });
    }
  }, [idValue.idEspecialidad]);

  useEffect(() => {
    dispatch(getDoctoresByEspec(idValue));
    if (idValue.idClinica && doctoresDeEspe.length < 1) {
      setHasDoctor({ doctor: false });
      setErrors({ ...errors, doc: true });
    } else {
      setHasDoctor({ doctor: true });
      setErrors({ ...errors, doc: false });
    }
  }, [idValue.idClinica]);

  function handleSelect(e) {
    setidValue({
      ...idValue,
      idEspecialidad: e.target.value,
    });
    setProgressTur({
      ...setProgressTur,
      width: "20%",
    });
  }

  function handleSelectClinica(e) {
    setidValue({
      ...idValue,
      idClinica: e.target.value,
    });
    setProgressTur({
      ...setProgressTur,
      width: "40%",
    });
  }

  function handleSelectDoc(e) {
    const value = e.target.value;
    const doc = doctoresDeEspe.filter((d) => d.nombre === value);
    var horario = doc[0].especialidads[0].horario;
    const docId = doc[0].id;
    setidValue({
      ...idValue,
      horarioDoctor: horario,
      idDoctor: docId,
    });
    setProgressTur({
      ...setProgressTur,
      width: "60%",
    });
  }

  function handleSelectHora(e) {
    setidValue({
      ...idValue,
      hora: e.target.value,
    });
    setProgressTur({
      ...setProgressTur,
      width: "100%",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isAuthenticated || user) {
      setidValue({ ...idValue, dniCliente: dniGoogle });
    }
    if (loggeado === false) {
      setErrors({ ...errors, login: false });
      return swal(
        "No estas Logueado!",
        "Por favor inicie sesion para registrar su turno",
        "warning"
      );
    }
    if (submit.canSubmit === true) {
      dispatch(crearTurno(idValue));
      return swal({
        title: "Turno confirmado!",
        text: `Su turno se agendo correctamente para el dia ${idValue.fecha}, a las ${idValue.hora}Hs `,
        icon: "success",
        buttons: {
          text: "Ver mis turnos",
          value: "Volver a inicio",
        },
      }).then((value) => {
        switch (value) {
          case "text":
            swal("En instantes seras redirigido a Mis turnos..", {});
            setTimeout(() => (window.location.href = "/me"), 2000);
            break;
          case "value":
            swal("En instantes seras redirigido a inicio..", {});
            setTimeout(() => (window.location.href = "/"), 2000);
            break;
          default:
            return;
        }
      });
    } else if (submit.canSubmit === false)
      return swal(
        "No se ha podido registrar su turno",
        "Por favor complete todos los campos e intente nuevamente",
        "warning"
      );
  }

  function validateInfo() {
    if (
      idValue.idEspecialidad.length < 1 ||
      idValue.idClinica.length < 1 ||
      idValue.horarioDoctor.length < 1 ||
      idValue.idDoctor.length < 1 ||
      idValue.fecha.length < 1 ||
      idValue.hora.length < 1
    ) {
      setSubmit({ canSubmit: false });
    } else setSubmit({ canSubmit: true });
  }

  let horariosDisponibles = []
  function disponibles (){
      const horaActual = jsdate.getHours()
      if (actDay === userDay && userDay){
          for (let i = 0 ; i < horariosDispoDoc.length ; i++){
              if (horaActual < horariosDispoDoc[i]) {
                  horariosDisponibles.push(horariosDispoDoc[i])
                }
                return horariosDisponibles
            }
        }
    return horariosDispoDoc
}

  return (
    <div className=".container">
      <form onSubmit={handleSubmit}>
        <Bot />
        <NavBar loggin={loggeado ? true : false} />

        <div class="progress" id="progressTurn" style={progressTur}>
          <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <div className="entre_nav_turno"></div>
        <div className="container">
          <div className="contenedor_turno">
            <div className="row">
              <div className="col-12">
                <div className="titleTurn">
                  <h2 className="display-4" id="title_turn_id">
                    Sacar turno Online
                  </h2>
                  <div className="row">
                    <small className="display-4" id="aboveTitle_turn_id">
                      Es tan solo 5 simples pasos
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="cont_tur_BG">
                  <h3 className="display-6" id="Cli_Tur_Crea">
                    {" "}
                    <p
                      style={{
                        "margin-right": "5px",
                        "color": "#01aac1",
                        "background-color": "white",
                        "width": "2pc",
                        "border-radius": "2pc",
                        "border-color": "#01aac1",
                        "border-top": "dashed",
                      }}
                    >
                      1
                    </p>
                    Elige la especialidad que buscas:
                  </h3>

                  <div className="row">
                    <select
                      className="col-lg-4 col-sm-1 col-md-1"
                      id="sel_tur_jaja"
                      aria-label="Default select example"
                      onChange={(e) => handleSelect(e)}
                    >
                      <option value="" disabled selected>
                        Especialidades
                      </option>
                      {especialidades.map((e) => (
                        <option value={e.id}> {e.nombre} </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {hasClinic.clinic === true ? (
              <div className="row">
                <div className="col-lg-12">
                  <div className="cont_tur_BG">
                    <h3 className="display-6" id="Cli_Tur_Crea">
                      {" "}
                      <p
                        style={{
                          "margin-right": "5px",
                          "color": "#01aac1",
                          "background-color": "white",
                          "width": "2pc",
                          "border-radius": "2pc",
                          "border-color": "#01aac1",
                          "border-top": "dashed",
                        }}
                      >
                        2
                      </p>
                      A que clinica asistiras?
                    </h3>

                    <div className="row">
                      <select
                        id="sel_tur_jaja"
                        className="col-lg-4 col-sm-1 col-md-1"
                        aria-label="Default select example"
                        onChange={(e) => handleSelectClinica(e)}
                      >
                        <option value="" disabled selected>
                          Clinicas
                        </option>
                        {clinicasDeEspe.clinicas &&
                          clinicasDeEspe.clinicas.map((e) =>
                            e.hablitada ? (
                              <option id="clinica_selected" value={e.id}>
                                {" "}
                                {e.nombre}{" "}
                              </option>
                            ) : (
                              <></>
                            )
                          )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-12">
                  <div className="cont_tur_BG">
                    <h3 className="display-6" id="Cli_Tur_Crea">
                      {" "}
                      <p
                        style={{
                          "margin-right": "5px",
                          "color": "#01aac1",
                          "background-color": "white",
                          "width": "2pc",
                          "border-radius": "2pc",
                          "border-color": "#01aac1",
                          "border-top": "dashed",
                        }}
                      >
                        2
                      </p>
                      A que clinica asistiras?
                    </h3>

                    <div className="row">
                      <select
                        id="sel_tur_jaja"
                        className="col-lg-4 col-sm-1 col-md-1"
                        aria-label="Default select example"
                        onChange={(e) => handleSelectClinica(e)}
                      >
                        <option value="" disabled selected>
                          Clinicas
                        </option>
                        {clinicasDeEspe.clinicas &&
                          clinicasDeEspe.clinicas.map((e) => (
                            <option id="clinica_selected" value={e.id}>
                              {" "}
                              {e.nombre}{" "}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {hasDoctor.doctor === true ? (
              <div className="row">
                <div className="col-12">
                  <div className="cont_tur_BG">
                    <h3 className="display-6" id="Cli_Tur_Crea">
                      {" "}
                      <p
                        style={{
                          "margin-right": "5px",
                          "color": "#01aac1",
                          "background-color": "white",
                          "width": "2pc",
                          "border-radius": "2pc",
                          "border-color": "#01aac1",
                          "border-top": "dashed",
                        }}
                      >
                        3
                      </p>
                      Selecciona el Doctor:{" "}
                    </h3>

                    <div className="row">
                      <select
                        id="sel_tur_jaja"
                        className="col-lg-4 col-sm-1 col-md-1"
                        aria-label="Default select example"
                        onChange={(e) => handleSelectDoc(e)}
                      >
                        <option value="" disabled selected>
                          Doctores
                        </option>
                        {doctoresDeEspe &&
                          doctoresDeEspe.map((e) =>
                            e.clinicas[0]?.hablitada ? (
                              <option id="doctor_selected" value={e.nombre}>
                                {" "}
                                {e.nombre}{" "}
                              </option>
                            ) : (
                              <></>
                            )
                          )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-12">
                  <div className="cont_tur_BG">
                    <h3 className="display-6" id="Cli_Tur_Crea">
                      {" "}
                      <p
                        style={{
                          "margin-right": "5px",
                          "color": "#01aac1",
                          "background-color": "white",
                          "width": "2pc",
                          "border-radius": "2pc",
                          "border-color": "#01aac1",
                          "border-top": "dashed",
                        }}
                      >
                        3
                      </p>
                      Selecciona el Doctor:{" "}
                    </h3>

                    <div className="row">
                      <select
                        id="sel_tur_jaja"
                        className="col-lg-4 col-sm-1 col-md-1"
                        aria-label="Default select example"
                        onChange={(e) => handleSelectDoc(e)}
                      >
                        <option value="" disabled selected>
                          Doctores
                        </option>
                        {doctoresDeEspe &&
                          doctoresDeEspe.map((e) => (
                            <option id="doctor_selected" value={e.nombre}>
                              {" "}
                              {e.nombre}{" "}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-12">
                <div className="cont_tur_BG">
                  <div>
                    <h3 className="display-6" id="Cli_Tur_Crea">
                      {" "}
                      <p
                        style={{
                          "margin-right": "5px",
                          "color": "#01aac1",
                          "background-color": "white",
                          "width": "2pc",
                          "border-radius": "2pc",
                          "border-color": "#01aac1",
                          "border-top": "dashed",
                        }}
                      >
                        4
                      </p>
                      Selecciona el dia:{" "}
                    </h3>

                    <div className="acordion_macana">
                      <div class="accordion accordion-flush" id="acordeao">
                        <div class="accordion-item" id="Sel_Tur_Crea_Dia">
                          <h2 class="accordion-header" id="flush-headingOne">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                            >
                              Abrir calendario
                            </button>
                          </h2>
                          <div
                            id="flush-collapseOne"
                            class="accordion-collapse collapse"
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="calendarioContainer">
                              <Calendar
                                onChange={onChange}
                                value={date}
                                onClickDay={(value, event) =>
                                  validateDate(value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="cont_tur_BG">
                  <h3 className="display-6" id="Cli_Tur_Crea">
                    {" "}
                    <p
                      style={{
                        "margin-right": "5px",
                        "color": "#01aac1",
                        "background-color": "white",
                        "width": "2pc",
                        "border-radius": "2pc",
                        "border-color": "#01aac1",
                        "border-top": "dashed",
                      }}
                    >
                      5
                    </p>
                    Horario:{" "}
                  </h3>

                  <div className="row">
                    <select
                      id="sel_tur_jaja"
                      className="col-lg-4 col-sm-1 col-md-1"
                      aria-label="Default select example"
                      onChange={(e) => handleSelectHora(e)}
                    >
                      <option
                        value=""
                        disabled
                        selected
                      >{`Horarios disponibles ${idValue?.fecha}`}</option>
                      {horariosDispoDoc &&
                        horariosDispoDoc.map((e) => (
                          <option value={e}>{e}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {errors.clinica || errors.doc ? (
              <div className="row">
                <div className="col-12">
                  <div>
                    <div class="alert alert-danger" role="alert">
                      Revisa los errores antes de continuar
                    </div>
                    <Link to={"/home"}>
                      <button id="But_bottom_Tur" className="btn btn-secondary">
                        Volver a inicio
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-12">
                  <div>
                    <button
                      onClick={() => validateInfo()}
                      style={{ "margin-top": "1pc" }}
                      id="But_bottom_Tur"
                      class="btn btn-primary"
                      type="submit"
                    >
                      Crear turno
                    </button>
                    <br />
                    <Link to={"/"}>
                      <button
                        id="But_bottom_Tur"
                        style={{ "margin-bottom": "3pc" }}
                        className="btn btn-secondary"
                      >
                        Volver a inicio
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="entre_nav_turno"></div>
        <div className="out_footer">
          <Footer />
        </div>
      </form>
    </div>
  );
}
