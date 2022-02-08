import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';


import Cookies from 'universal-cookie';


export default function LoginClinica(){
    
    const cookies = new Cookies()

    let session=false;
    // console.log("sesion iniciada por " + cookies.get('email'))  
    if(cookies.get('clinica_mail')){
        session = true;
    }
    const [loggeado,setLoggeado] = useState(session);

    const cerrarSesion=()=>{

        cookies.remove('clinica_mail');
        cookies.remove('clinica_nombre');
        cookies.remove('clinica_telefono');
        cookies.remove('clinica_direccion');
        cookies.remove('clinica_id');
        cookies.remove('clinica_nombreEn', );
        cookies.remove('clinica_apellidoEn');
        cookies.remove('clinica_DNIEn');
        cookies.remove('clinica_createdAt');

        setLoggeado(false);
        swal("Has cerrado la sesion con explito!!", "En instantes seras redirigido a Inicio", "success")

    }

    if(loggeado){
        return(
            <div>
                <h1>Hola Mundo</h1>
                <button className="btn btn-outline border-start " type="button" onClick={cerrarSesion}>Cerrar sesion</button>

                <Footer />
    
            </div>
        )
    }else{
        window.location.href='/loginClinica';
    }
}