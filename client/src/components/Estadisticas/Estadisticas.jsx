import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Footer from "../Home/Footer";
import swal from "sweetalert";
import NavClinica from "../AdminClinica/NavClinica.jsx";
import { getResenia, getTurnosClinica, get_All_Doctor } from "../../actions";

import logo from "../../components/utils/images-landing/logo.png";

import Cookies from "universal-cookie";
import "../AdminClinica/AdminClinicaStyle.css";

export default function AddDoctor() {
  const dispatch = useDispatch();
  const resenia = useSelector((state) => state.resenia);
  const turnosClinica = useSelector((state) => state.turnosClinica);
  const allDoctores = useSelector((state) => state.doctores);
  let doctores = allDoctores;
  const cookies = new Cookies();
  let [reseniaByID, setReseniaByID] = useState([]);
  let idTurnos = [];

  let [promedioDoctor, setPromedioDoctor] = useState();

  let [promedioClinica, setPromedioClinica] = useState();

  //QUE HACEMOS CON LAS ESTADISTICAS DE CLINNO

  //control se de session
  let session = false;
  if (cookies.get("clinica_id") && cookies.get("clinica_codigo"))
    session = true;
  const [loggeado, setLoggeado] = useState(session);

  useEffect(() => {
    dispatch(getResenia());
    dispatch(getTurnosClinica(cookies.get("clinica_id")));
  }, []);

  useEffect(() => {
    dispatch(get_All_Doctor(cookies.get("clinica_id")));
  }, []);

  //console.log(resenia)//2
  //console.log(turnosClinica)//7
  //console.log(allDoctores)//3

  var turnosTotales = parseInt(turnosClinica.length);
  useEffect(() => {
    let calificacionClinica = 0;
    let newArray = [];

    for (let j = 0; j < turnosClinica.length; j++) {
      idTurnos.push(turnosClinica[j].id);
    } //id de todos los turnos de la clinica

    for (let j = 0; j < idTurnos.length; j++) {
      for (let i = 0; i < resenia.length; i++) {
        if (
          resenia[i].idTurno === idTurnos[j] &&
          resenia[i].reviewed === true
        ) {
          newArray.push(resenia[i]);
          console.log(newArray);
        }
      }
    } //reseñas de los turnos de la clinica

    for (let i = 0; i < newArray?.length; i++) {
      calificacionClinica += newArray[i]?.calificacionClinica;
      setPromedioClinica(calificacionClinica);
      //set state para setear la suma total de las votaciones de la clinica
    } //suma calificacion de la clinica
  }, []);

    console.log(promedioClinica)

    console.log(reseniaByID?.length)

    setPromedioClinica((promedioClinica)/(reseniaByID?.length)) //set del promedio de la clinica

    console.log(promedioClinica)
    

    for(let i = 0; i < doctores.length ; i++){
        let cont = 0;
        let promedio = 0;

        for(let j = 0; j < reseniaByID.length ; j++){
          if(doctores[i].id === reseniaByID[j].id){
              cont++;
              promedio += reseniaByID[j]?.calificacionDoctor
              setPromedioDoctor(promedio)
          //set promedio doctor con la suma de las resenias del doctgor
        }

      }

      console.log(promedioDoctor)

      setPromedioDoctor((promedioDoctor)/(cont))
      //calcular el promedio del doctor y setearlo

      console.log(promedioDoctor)

      doctores[i].promedio = `${promedioDoctor}`
      // agregar el valor del promedio al atributo promedio del doctor
  }
  
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
                                <span className="tesx_nombre">{d.promedio}</span>
                            </div>
                        ))}
            </div>
          </div>
          <div>calificacion de la clinica</div>
          <div>{promedioClinica}</div>
          <div>Turnos totales</div>
          <div>{turnosTotales}</div>
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
