import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from './NavClinica.jsx'
import {get_clinica} from '../../actions';


import Cookies from 'universal-cookie';
import "./AdminClinicaStyle.css";


export default function LoginClinica(){

    const dispatch = useDispatch();

    const cookies = new Cookies();
    const clinica = useSelector((state)=> state.clinica[0]);

    useEffect(() => {
        dispatch(get_clinica(cookies.get('clinica_id')));
    },[])

    let session=false;

    //control se dession
    useEffect(() => {
        console.log('workin')
        if(cookies.get('clinica_id')) {
            setLoggeado(true)
        }else{
            setLoggeado(false)
        }
    },[cookies.get('clinica_id')])

    if(cookies.get('clinica_id')){
        session = true;
    }
    const [loggeado,setLoggeado] = useState(session);

    

    if(loggeado){
        return(
            <div >
                <div className="contenedor_adminClinica">
                    <NavClinica/>
                    <h1>Bienvenido {clinica?.nombre}</h1>
                    <h1>Welcome to cookis {cookies.get('clinica_nombre')}</h1>                 
                    


                </div>

                <Footer />
    
            </div>
        )
    }else{
        window.location.href='/loginClinica';
    }
}