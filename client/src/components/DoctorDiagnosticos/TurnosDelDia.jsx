import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { getTurnosDoctor,getClients,getEspecialidad,getClinicas,getDiagnostico} from '../../actions'
import Footer from "../Home/Footer";
import NavClinica from '../AdminClinica/NavClinica.jsx';
import Turno from './TurnoConDiagnostico';

import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";



export default function TurnosDelDia(){
    
    const cookies = new Cookies();
    const dispatch = useDispatch();

    const [turn,setTurn] = useState([]);

    const turnos = useSelector((state)=> state.turnosDoctor);
    const especialidades = useSelector((state)=> state.especialidades);
    const diagDoc = useSelector((state)=> state.diagnosticos);
    const cliente = useSelector((state)=> state.clientes);

    // control de sesion
    let session=false;
    if(cookies.get('clinica_id')&&cookies.get('doctor_codigo')) session = true;
    const [loggeado,setLoggeado] = useState(session);

    useEffect(()=>{
        dispatch(getTurnosDoctor(cookies.get('doctor_id')))
        dispatch(getClinicas())
        dispatch(getClients())
        dispatch(getEspecialidad())
        dispatch(getDiagnostico())
        setTurn(turnos);
    },[])
    useEffect(()=>{
        if(turnos){
            setTurn(turnos);
        }else{
            dispatch(getTurnosDoctor(cookies.get('doctor_id')))
            dispatch(getClinicas())
            dispatch(getClients())
            dispatch(getEspecialidad())
            console.log('funca');
            setTurn(turnos);
        }
    },[turnos])
    
    const date = new Date();
    const finalDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    console.log(turn);
    if(loggeado){

    return (
        <>
            <div className="contenedor_adminClinica">
                <NavClinica/>
                <h3 className="">Turnos de {cookies.get('doctor_nombre')} del dia {finalDate}</h3>

                <div className="grid_turno_table text-white" >
                    <span>
                        <strong>Cliente</strong>
                    </span>
                    <span>
                        <strong>Fecha</strong>
                    </span>
                    <span>
                        <strong>Hora</strong>
                    </span>
                    <span>
                        <strong>Especialidad</strong>
                    </span>
                    <span>
                        <strong>Diagnostico</strong>
                    </span>
                </div>
                {turn &&turn?.sort(function(a, b) {
                        if (a.fecha < b.fecha) {
                            return -1;
                        }
                        if (a.fecha > b.fecha) {
                            return 1;
                        }
                        return (a.hora < b.hora)?  -1:1;

                    }).map(t=>{
                        if(finalDate===t.fecha){
                            console.log(t)
                            return ( 
                            // <Turno 
                            //     Cliente={(cliente?.find(el => el.id === parseInt(t.idCliente,10)))?.nombre}
                            // />
                            <div className="grid_turno_table text-white">
                                <span>{(cliente?.find(el => el.id === parseInt(t.idCliente,10)))?.nombre}</span>
                                <span>{t.fecha }</span>   
                                <span>{t.hora }</span>
                                <span>{(especialidades?.find(el => el.id === t.idEspecialidad))?.nombre }</span>
                                <span>{(diagDoc?.find(el => el.idTurno === t.id))?.diagnostico?
                                  <Link to={`/SoyDoctor/VerDiagnostico/${t.id}`}>Ver</Link>:
                                  <Link to={`/SoyDoctor/AgregarDiagnostico/${t.id}`}>Agregar</Link>  }</span>
                            </div>
                        )
                    }
                })} 

            </div>
            <Footer />
        </>
    )
    }else{
        cookies.get('clinica_codigo')?window.location.href='/loginClinica' :window.location.href='/soyDoctor';
    }
}