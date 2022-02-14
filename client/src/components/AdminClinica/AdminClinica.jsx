import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from './NavClinica.jsx'
import {get_clinica,turno_clinica} from '../../actions';
import Turnos from './Turnos'


import Cookies from 'universal-cookie';
import "./AdminClinicaStyle.css";


export default function AdminClinica(){
    
    const cookies = new Cookies();
    const dispatch = useDispatch();

    const clinica = useSelector((state)=> state.clinica);
    // const turnos = useSelector((state)=> state.turnosClinica);
    //control se dession
    let session=false;
    if(cookies.get('clinica_id')) session = true;
    const [loggeado,setLoggeado] = useState(session);

    // const [turn,setTurn] = useState(turnos);
    

    async function dispa (){
        if(loggeado){
            dispatch(get_clinica(cookies.get('clinica_id')))            
        }
    }
    // async function dispa2 (){
    // dispatch(turno_clinica(cookies.get('clinica_id')))
    //     if(loggeado){
    //         if(turnos.length<1){
    //             dispatch(turno_clinica(cookies.get('clinica_id')))
    //         }
    //         setTurn(turnos)
    //     }
    // }

    useEffect(() => {dispatch(get_clinica(cookies.get('clinica_id')))},[])
    // useEffect(() => {
    //     console.log(turnos.length)
    //     if(turnos.length >0){
    //         setTurn(turnos)
    //     }
    // },[turnos])
    

    if(loggeado){
        return(
            <div >
                <div className="contenedor_adminClinica">
                    <NavClinica/>
                    <h1>Bienvenido {clinica[0]?.nombre}</h1>
                    <h4>Administacion de Clinica</h4>
                    <h3>Proximos Turnos</h3>
                    <button data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Ver Turnos</button>
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                            <div class="card card-body">
                                <Turnos/>
                            </div>
                        </div>

                
                </div>

                <Footer />
    
            </div>
        )
    }else{
        window.location.href='/loginClinica';
    }
}