import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from './NavClinica.jsx'
import {get_clinica,turno_clinica} from '../../actions';


import Cookies from 'universal-cookie';
import "./AdminClinicaStyle.css";


export default function LoginClinica(){
    
    const cookies = new Cookies();
    const dispatch = useDispatch();

    const clinica = useSelector((state)=> state.clinica);
    const turnos = useSelector((state)=> state.turnosClinica);
    //control se dession
    let session=false;
    if(cookies.get('clinica_id')) session = true;
    const [loggeado,setLoggeado] = useState(session);

    const [turn,setTurn] = useState(turnos);
    

    async function dispa (){
        if(loggeado){
            dispatch(get_clinica(cookies.get('clinica_id')))            
        }
    }
    async function dispa2 (){
    dispatch(turno_clinica(cookies.get('clinica_id')))
        if(loggeado){
            if(turnos.length<1){
                dispatch(turno_clinica(cookies.get('clinica_id')))
            }
            setTurn(turnos)
        }
    }

    useEffect(() => {
        setTimeout(()=>{dispa2()},1000)
        dispa()
    },[])
    useEffect(() => {
        console.log(turnos.length)
        if(turnos.length >0){
            setTurn(turnos)
        }
    },[turnos])
    
    
    console.log("turno:",turn)
    console.log("turnos Redux:",turnos)

    if(loggeado){
        return(
            <div >
                <div className="contenedor_adminClinica">
                    <NavClinica/>
                    <h1>Bienvenido {clinica[0]?.nombre}</h1>
                    <h3>Proximos Turnos</h3>

                    <div className="grid_turno_table">
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
                            <strong>Doctor</strong>
                        </span>
                        <span>
                            <strong>Especialidad</strong>
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
                        return <div className="grid_turno_table">
                            <span>{t.cliente }</span>
                            <span>{t.fecha }</span>   
                            <span>{t.hora }</span>
                            <span>{t.doctor }</span>
                            <span>{t.especialidad}</span>
                        </div>
                    })}
                </div>

                <Footer />
    
            </div>
        )
    }else{
        window.location.href='/loginClinica';
    }
}