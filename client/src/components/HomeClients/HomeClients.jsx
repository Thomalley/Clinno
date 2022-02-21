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
} from "../../actions";
import { useAuth0 } from "@auth0/auth0-react";
import pp from "../utils/images-landing/pp.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import logo from "../utils/favicon.png";
import Bot from '../Bot/Bot'

export default function HomeHospitals() {
  const dispatch = useDispatch();
  // const clinicas = useSelector((state) => state.clinicas)
  const especialidades = useSelector((state) => state.especialidades);
  const clinicas = useSelector((state) => state.clinicasByEspec);
  const [idValue, setidValue] = useState({
    idEspecialidad: "",
    idClinica: "",
  });
  const cookies = new Cookies();

  const { isAuthenticated, isLoading } = useAuth0();

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

  // const clin = clinicas?.map(e => e.clinicas)
  // const icas = clin?.map(e => e.nombre)



  useEffect(() => {
    dispatch(getEspecialidad());
  }, []);

  // useEffect(() => {
  //   dispatch(getClinicas())
  // }, []);
  useEffect(() => {
    dispatch(getClinicasByEspec(idValue.idEspecialidad));
  }, [idValue.idEspecialidad]);

  // function handleSelectClinica(e) {
  //   setidValue({
  //     ...idValue,
  //     idClinica: e.target.value,
  //   });
  // }

  function handleSelectEspec(e) {
    setidValue({
      ...idValue,
      idEspecialidad: e.target.value,
    });
  }

  return (
    <>
      <Bot></Bot>
      <NavBar loggin={loggeado} />+
      <div className="home-hospitals">
        <div className="big-box">
          <div className="left-box">
            <div>
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
                {/* boton handlesumint */}
              </div>
            </div>

            {/* <div className="button-allclinics-box">
                <button value="all" onClick={(e) => handleClinicas(e)}>
                  {" "}
                  Ver todas las clinicas{" "}
                </button>
              </div> */}

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

          <div className="clinics">
        
            {clinicas?.clinicas?.map((c) => (
              c.hablitada?
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
                :
                <></>
            )
            )}

            {/* {idValue.idEspecialidad?.map((clinica) =>
              clinica.hospitales.map((e) => (
                <div className="card-clinic">
                  <h5>{e.nombre} </h5>
                  <div className="img-logo-clinics">
                    <img src={e.logo} alt={e.nombre} />
                  </div>

                  <div className="datos-box">
                    <div>
                      <h6>Dirección:</h6>
                    </div>
                    <div>
                      <p>"aca va la direccion"</p>
                    </div>

                    <div>
                      <Link to={`/Home/clinica/hospital 1`}>
                        <button className="btn-go">Ir a clinica</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )} */}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
