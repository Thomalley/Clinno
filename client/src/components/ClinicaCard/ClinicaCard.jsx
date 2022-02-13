import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from '../AdminClinica/NavClinica.jsx';
import {get_clinica} from '../../actions';

import logo from '../../components/utils/images-landing/logo.png';

import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";


export default function ClinicaCard (){

    const dispatch = useDispatch();
    const cookies = new Cookies();

    useEffect(() => { dispatch(get_clinica(cookies.get('clinica_id'))); },[])
    const clinica = useSelector((state)=> state.clinica[0]);
    console.log(clinica);
    //control se dession
    let session=false;
    if(cookies.get('clinica_id')) session = true;
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

        swal("Has cerrado la sesion con explito!!", "En instantes seras redirigido a Inicio", "success");
        setTimeout(()=> window.location.href='/', 700) ;
    }

    if(loggeado){
        return(
            <div >
                <div className="contenedor_adminClinica">
                    <NavClinica/>
                        <button className="btn btn-danger " type="button" >Dar de Baja</button>
                        <button className="btn btn-primary " type="button" onClick={cerrarSesion} >Cerrar sesion</button>
                    <div>

                        <img src={logo} className='logo_clinno_navC' />
                        <h1>Perfil de {clinica?.nombre}</h1>
                        <h2>Nombre: {clinica?.nombre}</h2>
                        <h2>Direccion: {clinica?.direccion}</h2>
                        <h2>Telefono: {clinica?.telefono}</h2>
                        <h2>Mail: {clinica?.mail}</h2>
                        <h2>Nombre Titular:{clinica?.nombreEn}</h2>
                        <h2>Apellido Titular: {clinica?.apellidoEn}</h2>
                        <h2>Dni Titular: {clinica?.DNIEn}</h2>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }else{
        window.location.href='/loginClinica';
    }
}