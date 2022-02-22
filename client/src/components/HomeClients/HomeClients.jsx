import React from "react";
import { Link } from "react-router-dom";
import "./homeClients.css";
import { useState, useEffect } from "react";
import doc from "../utils/hipertencion.gif";
import Footer from "../Home/Footer";
import NavBar from "../NavBar/NavBar";
import Cookies from "universal-cookie";
import {
  getEspecialidad,
  getClinicasByEspec,
  getClients,
  registrarCliente,
  getClienteByEmail,
  updateGoogleUser
} from "../../actions";
import { useAuth0 } from "@auth0/auth0-react";
import pp from "../utils/images-landing/pp.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import logo from "../utils/favicon.png";
import swal from 'sweetalert'


export default function HomeHospitals() {
  const dispatch = useDispatch();
  const especialidades = useSelector((state) => state.especialidades);
  const clinicas = useSelector((state) => state.clinicasByEspec);
  const [idValue, setidValue] = useState({
    idEspecialidad: "",
    idClinica: "",
  });

  const cookies = new Cookies();

  const { isAuthenticated, isLoading, user } = useAuth0();

  let session;

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

  useEffect(() => {
    dispatch(getEspecialidad());
  }, []);

  useEffect(() => {
    dispatch(getClinicasByEspec(idValue.idEspecialidad));
  }, [idValue.idEspecialidad]);

  function handleSelectEspec(e) {
    setidValue({
      ...idValue,
      idEspecialidad: e.target.value,
    });
  }

  useEffect(() => {
    cookies.set("userGoogle_nombre", user?.given_name, { path: "/" })
    cookies.set("userGoogle_apellido", user?.family_name, { path: "/" })
    cookies.set("userGoogle_email", user?.email, { path: "/" })
  }, [isAuthenticated])

  const googleEmail = cookies.get("userGoogle_email")
  const googleNombre = cookies.get("userGoogle_nombre")
  const googleApellido = cookies.get("userGoogle_apellido")
  let usuarioGoogle = {
    nombre: googleNombre && googleNombre,
    apellido: googleApellido && googleApellido,
    dni: 0,
    email: googleEmail && googleEmail,
    direccion: 'No brindado',
    datosCompletados: false
  }
  const [userGoogle, setuserGoogle] = useState(undefined)

  useEffect(() => {
    if (usuarioGoogle.nombre !== "undefined") {
      dispatch(getClients())
        .then((data) => data.payload.map((e => e.email !== googleEmail)) ?
          dispatch(registrarCliente(usuarioGoogle))
            .then((data) => setuserGoogle(data.payload.datosCompletados))
          :
          dispatch(getClienteByEmail(googleEmail))
            .then((data) => setuserGoogle(data.payload.datosCompletados))
        )
    }
  }, [googleEmail])

  const [input, setInput] = useState({
    dni: "",
    direccion: "",
    email: googleEmail && googleEmail,
    datosCompletados: true
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      email: cookies.get("userGoogle_email")
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.dni || !input.direccion) {
      return swal("Error", "Complete los campos para continuar con el registro", "error")
    }
    else {
      (dispatch(updateGoogleUser(input)))
      swal("Gracias", "Sus datos han sido correctamente registrados, aguarde un momento...", "success")
      setTimeout(() => window.location.href = "/", 2000)
    }
  }


  return (
    <>
      <NavBar loggin={loggeado} />
      {
        userGoogle === undefined || userGoogle === true ?
          <div className="home-hospitals">
            <div className="big-box">
              <div className="left-box">
                <div className="col-12">
                  <img src={doc} alt="img-home" />
                </div>
              </div>

              <div className="right-box">
                <div>
                  <h5 className="title">
                    <div> ENCUENTRA CLINICAS EN TODO MOMENTO</div>
                    <div>POR LA ESPECIALIDAD QUE NECESITES</div>
                  </h5>
                </div>

                <div>
                  <h5>Buscar clinicas por especialidad</h5>
                  <div>
                    <select
                      className="select"
                      key="select"
                      onChange={(e) => handleSelectEspec(e)}
                    >
                      <option value=" ">Selecciona una especiallidad</option>

                      {especialidades?.map((e) => (
                        <option value={e.id}>{e.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="steps-box">
                  <div>
                    <h5>1. HAZ TU BUSQUEDA </h5>
                    <p>
                      Busca las clinicas que tienen la especialidad que necesitas
                      para tu consulta
                    </p>
                  </div>
                  <div>
                    <h5>2. ELIGE UNA CLINICA</h5>
                    <p>Selecciona alguna de nuestras clinicas registradas</p>
                  </div>
                  <div>
                    <h5>3. RESERVA TU CITA EN LINEA </h5>
                    <p>
                      Registrate en tu clinica selecionada y disfruta de los
                      beneficios que te ofrecen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="clinics-conteiner">
              <div className="booking-date">
                <div>
                  <h5>
                    <img src={pp} alt=".." height="30px" /> Realiza tus citas en
                    linea
                  </h5>
                </div>
                <div>
                  <h5>
                    <img src={pp} alt=".." height="30px" /> Paga con Tarjeta desde
                    la plataforma
                  </h5>
                </div>
                <div>
                  <h5>
                    <img src={pp} alt=".." height="30px" /> Tu expediente digital
                    disponible 24/7
                  </h5>
                </div>
              </div>

              <div className="row">
                {clinicas?.clinicas?.map((c) => (
                  c.hablitada ?
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                      <div className="card-clinic">
                        <h5>{c.nombre} </h5>
                        <div className="img-logo-clinics">
                          <img src={logo} alt={c.nombre} />
                        </div>

                        <div className="datos-box">
                          <div>
                            <h6>Dirección:</h6>
                          </div>
                          <div>
                            <p>{c.direccion}</p>
                          </div>

                          <div>
                            <Link to={`/clinica/${c.id}`}>
                              <button className="btn-go">Ir a clinica</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    :
                    <></>
                )
                )}
              </div>


            </div>

            <Footer />
          </div>
          :
          <div>

            <div className="container">
              <div className="row">
                {/* <div className="col-3"></div> */}
                <div className="col-12">
                  {/* <div className="col-3"></div> */}
                  <div class="alert alert-warning" id="alert_first_login" role="alert">
                    Completa el siguiente formulario para continuar
                  </div>
                </div>
              </div>
            </div>

            <div className="cont_first_login">
              <div className="container">

                <div className="row">

                  <h2 className="h2_first_login">Por favor ingrese los siguientes datos<br /> para completar su registro:</h2>

                </div>

                <div className="row">
                  <div className="col-12">
                    <form autocomplete="off" onSubmit={handleSubmit}>
                      <div className="inf_cont_first_login">
                        <small className="small_first_login">Ingrese su <strong>Documento</strong></small>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <input type="number" name="dni" value={input.dni} placeholder="Numero de documento (solo numeros)" onChange={handleChange}>
                          </input>
                        </div>
                      </div>
                      <div className="inf_cont_first_login">
                        <small className="small_first_login">Ingrese su <strong>Direccion</strong></small>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <input type="text" name="direccion" value={input.direccion} placeholder="Escribe tu domicilio actual" onChange={handleChange}>
                          </input>
                        </div>
                      </div>
                      <div style={{ "margin-top": "2pc" }}>
                        <button type="submit" className="btn btn-primary btn-sm">
                          Actualizar informacion
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>

            <div style={{ "height": "15pc" }}></div>

          </div>
      }

    </>
  );
}
