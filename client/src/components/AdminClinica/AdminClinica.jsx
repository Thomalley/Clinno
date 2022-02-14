import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from './NavClinica.jsx'
import {get_clinica,turno_clinica} from '../../actions';
import Turnos from './Turnos'
import icono from '../../components/utils/icono-clinica.png'


import Cookies from 'universal-cookie';
import "./AdminClinicaStyle.css";


export default function AdminClinica(){
    
    const cookies = new Cookies();
    const dispatch = useDispatch();

    const clinica = useSelector((state)=> state.clinica);
    //control se dession
    let session=false;
    if(cookies.get('clinica_id')) session = true;
    const [loggeado,setLoggeado] = useState(session);

    

    async function dispa (){
        if(loggeado){
            dispatch(get_clinica(cookies.get('clinica_id')))            
        }
    }

    useEffect(() => {dispatch(get_clinica(cookies.get('clinica_id')))},[])

    if(loggeado){
        return(
            <div >
                <div className="contenedor_adminClinica">
                    <NavClinica/>
                    <div className="adminClinica_presentacion">
                        <img src={icono} alt="hospital" className="logo_hospi_clinic"/>
                        <h1>Bienvenido {clinica[0]?.nombre}</h1>
                        <h4>Administacion de Clinica</h4>
                    </div>
                    <hr/>
                    <h3>Proximos Turnos</h3>
                    <button className="btn_clinic"
                        data-bs-toggle="collapse" 
                        href="#multiCollapseExample1"
                        role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Ver Turnos</button>
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                            <div class="card card-body render_turno">
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