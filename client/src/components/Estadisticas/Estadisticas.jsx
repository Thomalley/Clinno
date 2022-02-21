import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from '../AdminClinica/NavClinica.jsx';
import {get_clinica} from '../../actions';


import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";

export default function AddDoctor(){

    const dispatch = useDispatch();

    const cookies = new Cookies();

    //control se de session
    let session=false;
    if(cookies.get('clinica_id')&&cookies.get('clinica_codigo')) session = true;
    const [loggeado,setLoggeado] = useState(session);


    if(loggeado){
        return(
            
            <div >
                <div className="contenedor_adminClinica">
                        <NavClinica/>
                        <h2>Estadisticas de {cookies.get('clinica_nombre')}</h2>
                </div>
                <Footer />
    
            </div>
        )
    }else{
        cookies.get('clinica_codigo')?window.location.href='/loginClinica' :window.location.href='/adminClinica';
    }
}