import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import icono from '../../components/utils/icono-clinica.png';
import IngresoDoctor from './IngresoDoctor';
import IngresoClinica from './IngresoClinica';
// import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
// import "../AdminClinica/AdminClinicaStyle.css";
// import "../AdminDoctor/AdminDoctorStyle.css";


export default function ClinicaRol(){

    const cookies = new Cookies();
    const dispatch = useDispatch();
    
    //control se de sesion Clinica
    let session=false;
    if(cookies.get('clinica_id')) session = true; 
    const [loggeado,setLoggeado] = useState(session);

    if(loggeado){
        return(
            <div className="container">
                <div className="d-flex ">
                    <div>
                        <IngresoDoctor/>
                    </div>
                    <div>
                        <IngresoClinica/>
                    </div>
                </div>
            </div>
        )

    }else{
        window.location.href='/loginClinica';
    }
}