import React from "react";
import './Estadisticas.css'
//import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Footer from "../Home/Footer";
//import swal from "sweetalert";
import NavClinica from "../AdminClinica/NavClinica.jsx";
import { getResenia, getTurnosClinica, get_All_Doctor } from "../../actions";

//import logo from "../../components/utils/images-landing/logo.png";

import Cookies from "universal-cookie";
import "../AdminClinica/AdminClinicaStyle.css";

export default function AddDoctor() {

  const cookies = new Cookies();
  const dispatch = useDispatch();
  const resenia = useSelector((state) => state.resenia);
  const turnosClinica = useSelector((state) => state.turnosClinica);
  const allDoctores = useSelector((state) => state.doctores);
  let doctores = allDoctores;
  let idTurnos = [];
  let promedioDoctor = 0;
  let promedioClinica = 0;

  //control se de session
  let session = false;
  if (cookies.get("clinica_id") && cookies.get("clinica_codigo"))
    session = true;
  const [loggeado, setLoggeado] = useState(session);


  useEffect(() => {
    dispatch(getResenia());
    dispatch(getTurnosClinica(cookies.get("clinica_id")));
    dispatch(get_All_Doctor(cookies.get("clinica_id")));
  }, []);


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// resenias 
// doctores

// const turnosClinica = [{
//     "id": "2beaf02a-8bcb-4952-9c59-cd93d06bf29a",
//     "fecha": "15-2-2022",
//     "hora": 10,
//     "idClinica": "deaae5fc-b0fd-4d25-925e-8f9661f9f5f4",
//     "dniCliente": "39482681",
//     "idDoctor": "f002d0d6-c9ec-4548-a50a-bb87ffbc6437",
//     "idEspecialidad": 1,
//     "status": "concretado",
//     "createdAt": "2022-02-22T19:22:34.345Z",
//     "updatedAt": "2022-02-22T19:22:34.345Z"
//   },
//   {
//     "id": "2beaf02a-8bcb-4952-9c59-cd93d06bf29b",
//     "fecha": "15-2-2022",
//     "hora": 10,
//     "idClinica": "deaae5fc-b0fd-4d25-925e-8f9661f9f5f4",
//     "dniCliente": "39482681",
//     "idDoctor": "f002d0d6-c9ec-4548-a50a-bb87ffbc6437",
//     "idEspecialidad": 1,
//     "status": "concretado",
//     "createdAt": "2022-02-22T19:22:34.345Z",
//     "updatedAt": "2022-02-22T19:22:34.345Z"
//   },
//   {
//     "id": "2beaf02a-8bcb-4952-9c59-cd93d06bf29c",
//     "fecha": "15-2-2022",
//     "hora": 10,
//     "idClinica": "deaae5fc-b0fd-4d25-925e-8f9661f9f5f4",
//     "dniCliente": "39482681",
//     "idDoctor": "f002d0d6-c9ec-4548-a50a-bb87ffbc6437",
//     "idEspecialidad": 1,
//     "status": "pendiconcretadoente",
//     "createdAt": "2022-02-22T19:22:34.345Z",
//     "updatedAt": "2022-02-22T19:22:34.345Z"
//   },
//   {
//     "id": "2beaf02a-8bcb-4952-9c59-cd93d06bf29d",
//     "fecha": "15-2-2022",
//     "hora": 10,
//     "idClinica": "deaae5fc-b0fd-4d25-925e-8f9661f9f5f4",
//     "dniCliente": "39482681",
//     "idDoctor": "611d8854-5a63-4e12-8c83-3783c1a38333",
//     "idEspecialidad": 1,
//     "status": "pendiente",
//     "createdAt": "2022-02-22T19:22:34.345Z",
//     "updatedAt": "2022-02-22T19:22:34.345Z"
//   },
// ]

// const resenia = [
//     {
//       "id": 1,
//       "comentario": "asdasdasd",
//       "calificacionDoctor": 3,
//       "calificacionClinica": 4,
//       "calificacionClinno": 3,
//       "reviewed": true,
//       "idTurno": "2beaf02a-8bcb-4952-9c59-cd93d06bf29a",
//       "createdAt": "2022-02-22T21:22:20.435Z",
//       "updatedAt": "2022-02-22T22:33:36.217Z"
//     },
//     {
//       "id": 2,
//       "comentario": "sdasdasda",
//       "calificacionDoctor": 3,
//       "calificacionClinica": 4,
//       "calificacionClinno": 5,
//       "reviewed": true,
//       "idTurno": "2beaf02a-8bcb-4952-9c59-cd93d06bf29b",
//       "createdAt": "2022-02-23T03:50:00.654Z",
//       "updatedAt": "2022-02-23T03:59:43.353Z"
//     },
//     {
//         "id": 3,
//         "comentario": "holahola",
//         "calificacionDoctor": 4,
//         "calificacionClinica": 2,
//         "calificacionClinno": 4,
//         "reviewed": true,
//         "idTurno": "2beaf02a-8bcb-4952-9c59-cd93d06bf29d",
//         "createdAt": "2022-02-23T04:00:40.620Z",
//         "updatedAt": "2022-02-23T04:00:40.620Z"
//       },
//     {
//       "id": 3,
//       "comentario": null,
//       "calificacionDoctor": null,
//       "calificacionClinica": null,
//       "calificacionClinno": null,
//       "reviewed": false,
//       "idTurno": "2beaf02a-8bcb-4952-9c59-cd93d06bf29c",
//       "createdAt": "2022-02-23T04:00:40.620Z",
//       "updatedAt": "2022-02-23T04:00:40.620Z"
//     }
//   ]




//   console.log(resenia)//2
//   console.log(turnosClinica)//7
 //  console.log(allDoctores)//3

    const turnosTotales = parseInt(turnosClinica.length);
    let turnosConcretados = []
    let turnosCancelados = []
    let turnosPendientes = []

    turnosTotales?.map((t) => {
      if(t.status === "concretado"){
        turnosConcretados.push(t)
      }
      if(t.status === "cancelado"){
        turnosCancelados.push(t)
      }
      if(t.status === "pendiente"){
        turnosPendientes.push(t)
      }
    })
  
    let calificacionClinica = [];
    let reseniasTrue = [];

    turnosClinica?.map((turnos) => {
        idTurnos.push(turnos.id);
    })

    idTurnos?.map((id) => {
        resenia?.map((r) => {
            if (r.idTurno === id && r.reviewed === true) {
                reseniasTrue.push(r);
              }
        })
    })

//    console.log(reseniasTrue)
    
    reseniasTrue?.map((r) => {
        calificacionClinica.push(r?.calificacionClinica);
    })

    let contador = reseniasTrue?.length
    let resultado = 0

    calificacionClinica?.map((c) => {
        resultado += c
    })

    // console.log(parseInt(resultado))
    // console.log(parseInt(contador))
    // console.log(resultado/contador)
    function round(num) {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    }
    promedioClinica = ((resultado)/(contador)) //set del promedio de la clinica
    promedioClinica = round(promedioClinica)

  //  console.log(promedioClinica)
    

    doctores?.map((d) => {
        let cont = 0;
        let promedio = 0;

        turnosClinica?.map((t) => {
            
            if(d.id === t.idDoctor){
                
                reseniasTrue?.map((r) => {
                    if(r.idTurno === t.id){
                    cont++;
                    promedio += r?.calificacionDoctor

                }})
            }
        })

         promedioDoctor = promedio/cont
         promedioDoctor = round(promedioDoctor)
         

        d.promedio = `${promedioDoctor}`
       // console.log(d.promedio + "doctor " + d.id)
        // agregar el valor del promedio al atributo promedio del doctor
         })
  
  if (loggeado) {
    return (
      <div>
        <div className="contenedor_adminClinica">
          <NavClinica />
          <h2>Estadisticas de {cookies.get("clinica_nombre")}</h2>
          <div>
            <div className="container_table_verDoc">
              <div className="grid_doctor_table">
                <span>
                  <strong>Doctor</strong>
                </span>
                <span>
                  <strong>Especialidad</strong>
                </span>
                <span>
                  <strong>Calificacion</strong>
                </span>
              </div>
               {doctores && doctores?.map(d=>(
                            <div key={d.id} className="grid_doctor_table">
                                <span className="tesx_nombre">{d.nombre}</span>
                                <span> {d.especialidad?.map(esp=>{
                                    return <p className="tesx_esp">{esp.nombre}</p>
                                })}</span>
                                <span className="tesx_nombre">{ isNaN(d.promedio) ?  "No tiene turnos calificados" : d.promedio}</span>
                            </div>
                        ))}
            </div>
          </div>
          <div>calificacion de la clinica</div>
          <div>{promedioClinica}</div>
          <div>Turnos totales</div>
          <div>{turnosTotales}</div>
          <div>Turnos Cancelados</div>
          <div>{turnosCancelados.length}</div>
          <div>Turnos Concretados</div>
          <div>{turnosConcretados.length}</div>
          <div>Turnos Pendientes</div>
          <div>{turnosPendientes.length}</div>
        </div>
        <Footer />
      </div>
    );
  } else {
    cookies.get("clinica_codigo")
      ? (window.location.href = "/loginClinica")
      : (window.location.href = "/adminClinica");
  }
}
