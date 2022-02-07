import React from "react";
import { Link } from "react-router-dom";
import NavLanding from "../NavLanding/NavLanding";
import "./homeClients.css";
// import clinics from "../utils/hospitals.json"
import especial from "../utils/especialidades.json"
import { useState } from "react";
import doc from "../utils/hipertencion.gif"
import Footer from "../Home/Footer";


import pp from "../utils/images-landing/pp.png"

export default function HomeHospitals() {
  const [input, setInput] = useState({
    // clinic: [],
    especialidad: [],
  });

  // function handleSelectClinic(e) {

  //   if (e.target.value){

  //     let busqueda =clinics.find( c=> c.nombre === e.target.value)

  //     setInput({
  //       ...input,

  //       clinic: [busqueda],
  //     });
  //   }

  // }

  

  function handleSelectEscpecial(e) {
    if (e.target.value) {
      let busqueda = especial.find((c) => c.nombre === e.target.value);

      setInput({
        ...input,

        especialidad: [busqueda],
      });
    }
  }

  console.log(input.especialidad);

  return (
    <>
      <NavLanding component="HomeClients" />
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

            <div className="selet-container">
              {/* <div>
            <h5>Busca por clinica</h5>
            <select
              className="select"
              key="select"
              onChange={(e) => handleSelectClinic(e)}
            >
              {clinics.map((esp) => (
                <option value={esp.nombre}>{esp.nombre}</option>
              ))}

             
            </select>
          </div> */}

              <div>
                <h5>Buscar clinicas por especialidad</h5>
                <div>
                  <select
                    className="select"
                    key="select"
                    onChange={(e) => handleSelectEscpecial(e)}
                  >
                    {especial.map((esp) => (
                      <option value={esp.nombre}>{esp.nombre}</option>
                    ))}
                  </select>
                  {/* boton handlesumint */}
                </div>
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
          <div className="clinics">
            {input.especialidad.map((clinica) =>
              clinica.hospitales.map((e) => (
                <div className="card-clinic">
                  <h5>{e.nombre} </h5>
                  <div className="img-logo-clinics">
                    <img src={e.logo} alt={e.name} />
                  </div>

                  <div className="datos-box">
                    <div>
                      <h6>Dirección:</h6>
                    </div>
                    <div>
                      <p>{e.direccion}</p>
                    </div>

                    <div>
                      <Link to="/Home">
                        <button className="btn-go">Ir a Clinica</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* {input.clinic.map((clinica) => (
          
            <div className="card-clinic">
              <h5>Busqueda por clinica:</h5>
              <h5>{clinica.nombre} </h5>
              <div className="img-logo-clinics"><img src={clinica.logo} alt={clinica.name} /></div>

              <div className="esp-box">
                {clinica.especialidades.map((especialidades) => (
                  <button>{especialidades}</button>
                ))}
              </div>

             
            </div>
          ))}

           */}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}