import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from '../AdminClinica/NavClinica.jsx';
import {get_clinica,darBajaEmail} from '../../actions';

import logo from '../../components/utils/images-landing/logo.png';

import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";
import './ClinicaCardStyle.css'

export default function ClinicaCard (){

    const dispatch = useDispatch();
    const cookies = new Cookies();

    useEffect(() => { dispatch(get_clinica(cookies.get('clinica_id'))); },[])
    const clinica = useSelector((state)=> state.clinica[0]);
    console.log(clinica);
    //control se de sesion
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
        setTimeout(()=> window.location.href='/', 2000) ;
    }
    function meVoy(){
        console.log(clinica);
            dispatch(darBajaEmail(clinica));
        cerrarSesion();
    }

    if(loggeado){
        return(
            <div >
                <div className="contenedor_adminClinica">
                    <NavClinica/>
                        
                        <img src={logo} className='logo_clinno_adminC' />
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="contenedor_me_clinic">
                                <h1>Perfil de {clinica?.nombre}</h1>
                                <hr/>
                                <h4>Nombre: {clinica?.nombre}</h4>
                                <h4>Direccion: {clinica?.direccion}</h4>
                                <h4>Telefono: {clinica?.telefono}</h4>
                                <h4>Mail: {clinica?.mail}</h4>
                                <h4>Nombre Titular:{clinica?.nombreEn}</h4>
                                <h4>Apellido Titular: {clinica?.apellidoEn}</h4>
                                <h4>Dni Titular: {clinica?.DNIEn}</h4>
                            </div>
                        </div>
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Dar de Baja
                        </button>
                </div>
                <Footer />
                {/* <!-- Modal --> */}
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Dar de Baja</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h1>Atencion!</h1>
                        <h4>Usted esta por informar la baja su clinica en Clinno</h4>
                        <p>Por razones de seguridad y servicio a nuestros usuarios, Clinno tomara la descision de dar la baja en unos dias,
                            para informar a nuestros usuarios de la suspension de su clinica en nuestra aplicación.</p>
                        <p>Usted debera informar a los usuario vinculados de su suspension, quedando las citas y los pagos pendientes bajo su responsabilidad.</p>
                        <p>Asi mismo, Clinno archivara los datos, para la mejor experiencia de nuestros usuarios, y en una posible reanudación
                            de nuestros servicios con usted.</p>
                        <p><strong>Clinno deja informado que a partir que usted de en aceptar, no se hace responsable de la situación aclarada,
                            ni en el futuro, de la informacion que la aplicacion brinde.</strong></p>
                        <h6>Si no esta seguro de esta decisión, aprete en cerrar.</h6>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-danger" onClick={meVoy}>Acepto</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>

        )
    }else{
        window.location.href='/loginClinica';
    }
}