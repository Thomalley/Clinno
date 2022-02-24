import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import {get_clinica,codigoClinicaEmail} from '../../actions';
// import icono from '../../components/utils/icono-clinica.png'

import logo from '../../components/utils/images-landing/logo.png'

import Cookies from 'universal-cookie';


export default function AdminClinica({setCheck}){

    const cookies = new Cookies();
    
    const dispatch = useDispatch();
    const clinica = useSelector((state)=> state.clinica);
   
    
    useEffect(() => {dispatch(get_clinica(cookies.get('clinica_id')))},[])

    const [input, setInput] = useState({codigo : '', });

    function handleSubmit(e){
        e.preventDefault();
        if(input.codigo === clinica[0].codigo ){
            setCheck()
        }else{
            swal({
                title: "El código ingresado no es valido",
                text: "Verifique los datos e intente nuevamente",
                icon: "warning",
                dangerMode: true,
            })
        }
    }
   
    function handleChange ({target}){
        const {value} = target;
        setInput({...input,codigo:value})
    }
    function mandarMail(){
        dispatch( codigoClinicaEmail(clinica[0]));
        swal("Correo enviado correctamente!", "Revise En su correo", "success");
        setTimeout(()=> cerrarSesion(),1000)
    }
    const cerrarSesion=()=>{
        const cookies = new Cookies();
    
    
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
    
        swal("Has cerrado la sesion con exito!!", "En instantes seras redirigido a Inicio", "success");
        setTimeout(()=> window.location.href='/', 2000) ;
    }
    return(
        <div className="background_doc">
                    <div className="row d-flex flex-column gap-3 contenedor_Doctor">
                        <div className="contedor_doc_but">
                            <Link to="/adminClinica"><img src={logo} alt="logo Clinno"  className="logo_clinno_navC"/></Link>
                            <form className="Form_doc" onSubmit={(e)=> handleSubmit(e)}>
                                <h3>Bienvenido a Administración.</h3>
                                <h4>Por favor ingrese su codigo :</h4>
                                <div className="d-flex flex-column gap-3">
                                    <input className="input_doctorceto" type='text' value={input.codigo }placeholder="Ingrese su Codigo aqui." onChange={(e)=>handleChange(e)}/>
                                    <button
                                        type="submit"
                                        className="btn btn-primary">Continuar</button>
                                </div>
                            </form>
                            <div>
                                <button  className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">No Te Acordas tu Codigo?</button>
                            </div>
                                <div className="d-flex gap-2">
                                    <Link  to={'/SoyDoctor'}>
                                        <button className="btnLoggin_back">Ir a SoyDoctor</button>
                                    </Link>
                                    <Link className="" to={'/'}>
                                        <button className="btnLoggin_back">Volver a Inicio</button>
                                    </Link>
                                </div>
                            <div>
                                <button className="btnLoggin_Cerrar" onClick={cerrarSesion}>Cerrar Sesion</button>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Modal --> */}
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Te olvidaste tu codigo?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Se enviara el codigo de administrador al Correo electronico de {cookies.get('clinica_mail')}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btnLoggin_Cerrar" onClick={mandarMail}>Enviar Correo</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
    )
}