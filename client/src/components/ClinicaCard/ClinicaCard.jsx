import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from '../AdminClinica/NavClinica.jsx';
import {get_clinica,darBajaEmail,deshabilitar_clinica,validate_clinica} from '../../actions';

import logo from '../../components/utils/images-landing/logo.png';

import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";
import './ClinicaCardStyle.css'

export default function ClinicaCard (){

    const dispatch = useDispatch();
    const cookies = new Cookies();

    useEffect(() => { dispatch(get_clinica(cookies.get('clinica_id'))); },[])
    const clinica = useSelector((state)=> state.clinica[0]);

    //control se de sesion
    let session=false;
    if(cookies.get('clinica_id')&&cookies.get('clinica_codigo')) session = true;
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
        cookies.remove('clinica_codigo');
        cookies.remove('clinica_createdAt');
        cookies.remove('doctor_nombre');
        cookies.remove('doctor_id');
        cookies.remove('doctor_codigo');
        cookies.remove('doctor_especialidades');

        swal("Has cerrado la sesion con explito!!", "En instantes seras redirigido a Inicio", "success");
        setTimeout(()=> window.location.href='/', 3700) ;
    }
    function meVoy(){
        dispatch(darBajaEmail(clinica));
        cerrarSesion();
    }
    function meSuspendo(){
        dispatch(deshabilitar_clinica(clinica.id));
        cerrarSesion();
    }
    function meHabilito(){
        dispatch(validate_clinica(clinica.id));
        swal("Ha habilitado su clinica!!", "Ahora podra usar todas las funcionalidades de Clinno! Bienvenido!", "success");
        setTimeout(()=> window.location.href='./', 3700) ;

    }
    console.log(clinica)
    

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
                                <h4>Codigo de Ingreso: {clinica?.codigo}</h4>
                            </div>
                        </div>
                <button type="button" class="btn btn-danger mt-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Dar de Baja
                </button>

                { clinica?.habilitada? 
                    <button type="button" class="btn btn-info mt-5 text-white" data-bs-toggle="modal" data-bs-target="#staticBackdrops" >
                        Suspender servicio
                    </button>
                    :
                    <button type="button" class="btn btn-primary mt-5 text-white" onClick={meHabilito}>Habilitar</button>
                }
                
                </div>
                <Footer />
                {/* <!-- Modal baja --> */}
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
                {/* <!-- Modal suspension --> */}
                <div class="modal fade" id="staticBackdrops" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Suspensión de Clinno</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h1>Atencion!</h1>
                        <h4>Usted esta por suspender los servicios de su clinica en Clinno</h4>
                        <p>La suspension de {cookies.get('clinica_mail')} en Clinno, implica que los usuarios no podran sacar nuevos turnos en su clinica, </p>
                        <p>la suspension de los pagos, y no se mostrar información de su clinica en la aplicación.  </p>
                        <p>El ingreso a la administración de la clinica, como las funciones de la misma, exeptuando la posibilidad de sacar turnos por dni,</p>
                        <p>no seran suspendidas, asi como los turnos ya dados seguiran activos. En caso de querer suspenderlos, debera hacerlo atravez de la aplicación </p>
                        <p>Si usted no esta seguro de esta decisión, de en cerrar, sino ya fue informado de lo que implica la suspensión</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" onClick={meSuspendo}>Suspender</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>

        )
    }else{
        cookies.get('clinica_codigo')?window.location.href='/loginClinica' :window.location.href='/adminClinica';
    }
}