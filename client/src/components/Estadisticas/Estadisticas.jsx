import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from '../AdminClinica/NavClinica.jsx';
import {getResenia, getTurnosClinica, get_All_Doctor} from '../../actions';


import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";

export default function AddDoctor(){

    const dispatch = useDispatch();
    const resenia = useSelector((state) => state.resenia);
    const turnosClinica = useSelector((state) => state.turnosClinica);
    const allDoctores = useSelector((state)=> state.doctores)
    let doctores = allDoctores; 
    const cookies = new Cookies();
    let reseniasByID =[]
    let idTurnos = []
    let promedioDoctor = 0;
    let calificacionClinica = 0;
    let promedioClinica = 0;
    let calificacionClinno = 0;
     //control se de session
     let session=false;
     if(cookies.get('clinica_id')&&cookies.get('clinica_codigo')) session = true;
     const [loggeado,setLoggeado] = useState(session);

    useEffect(()=>{
    dispatch(getResenia());
    dispatch(getTurnosClinica(cookies.get("clinica_id")))
      },[])

    useEffect(() => { 
        dispatch(get_All_Doctor(cookies.get('clinica_id')))
    },[])

    //console.log(resenia)//2
    //console.log(turnosClinica)//7
    //console.log(allDoctores)//3

      let turnosTotales = parseInt(turnosClinica.length)

      for(let j = 0; j<turnosClinica.length; j++){
        idTurnos.push(turnosClinica[j].id)
      }//id de todos los turnos de la clinica 

      for(let j=0; j < idTurnos.length; j++){
        for(let i=0; i < resenia.length; i++){
            if(resenia[i].idTurno ===  idTurnos[j] && resenia[i].reviewed === true)
                reseniasByID.push(resenia[i])
      }}//reseñas de los turnos de la clinica

      console.log(reseniasByID)//1

      let contPromClinica = 0;

      for(let i = 0; i<reseniasByID.length; i++){
        calificacionClinica = calificacionClinica + reseniasByID[i]?.calificacionClinica
        console.log(calificacionClinica)
        contPromClinica++
      }//suma calificacion de la clinica

     

      promedioClinica = ((calificacionClinica)/(calificacionClinica?.length))

      console.log(promedioClinica)

      //promedio de la clinica
     
      for(let i = 0; i < doctores.length ; i++){
          let cont = 0;
          let promedioDoctor = 0;
        for(let j = 0; j < reseniasByID.length ; j++){
          if(doctores[i].id === reseniasByID[j].id){
            cont++;
            promedioDoctor = ((promedioDoctor) + (parseInt(reseniasByID[j]?.calificacionDoctor)) )         
          }
        }

        console.log(promedioDoctor)

        promedioDoctor = ((promedioDoctor)/(cont))
        //console.log(promedioDoctor)

        console.log(promedioDoctor)

        doctores[i].promedio = `${promedioDoctor}`
    }      //por cada doctor creo un contador y un sumador
          //bosco por cada doctor en la lista de objetos resenias de la clinica las resenias de cada doctor
          //las que pertenezcan al doctor de la iteracion que estoy haciendo, sumo sus calificaciones y cuento cuantas son
          //termino de iterar todos las resenias de ese doctor y creo el promedio y lo agrego como atributo del doctor q estoy iterando
          //finaliza la iteracion


    if(loggeado){
        return(
            
            <div >
                <div className="contenedor_adminClinica">
                        <NavClinica/>
                        <h2>Estadisticas de {cookies.get('clinica_nombre')}</h2>
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
                        <div>
                            calificacion de la clinica
                        </div>
                        <div>
                          {promedioClinica}
                        </div>
                        <div>
                            Turnos totales
                        </div>
                        <div>
                          {turnosTotales}
                        </div>
                </div>
                <Footer />
    
            </div>
        )
    }else{
        cookies.get('clinica_codigo')?window.location.href='/loginClinica' :window.location.href='/adminClinica';
    }

}