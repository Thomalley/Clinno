import React from "react";
import { useState} from 'react';
import Footer from "../Home/Footer";
import NavClinica from '../AdminClinica/NavClinica.jsx';
import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";

export default function AddDoctor(){

    const cookies = new Cookies();

    //control se de session
    let session=false;
    if(cookies.get('clinica_id')&&cookies.get('clinica_codigo')) session = true;
    const [loggeado] = useState(session);


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