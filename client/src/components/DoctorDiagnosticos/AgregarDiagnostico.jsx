import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import { addDiagnostico,getTurnoId,getClienteByDni} from '../../actions'

import Footer from "../Home/Footer";
import NavClinica from '../AdminClinica/NavClinica.jsx';
import logo from '../../components/utils/images-landing/logo.png'
import Cookies from 'universal-cookie';

import "../AdminClinica/AdminClinicaStyle.css";
import './Diagnosticos.css';

const validate = values =>{
    const errors ={}

    // const vald = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
    // const valdEmail= /^\S+@\S+$/i;
    // const valdDNI = /^[0-9]+$/;
    
    if(!values.sintomas){
        errors.sintomas = 'Agrege los Sintomas';
    }else{
        if(values.sintomas.length<5 || values.sintomas.length>128){
            errors.sintomas = 'Los sintomas no son valido';
        }
    }
    if(!values.diagnostico){
        errors.diagnostico = 'Agrege el diagnostico';
    }else{
        if(values.diagnostico.length<5 || values.diagnostico.length>128){
            errors.diagnostico = 'El diagnostico no es valido';
        }
    }
    
    return errors;
}

export default function TurnosDelDia(){
    
    
    const turnoId = useSelector((state) => state.turnoById);
    const cliente = useSelector((state) => state.clienteByDni);

    // let navigate = useNavigate();
    let { idTurno } = useParams();
    
    const cookies = new Cookies();
    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(getTurnoId(idTurno));
    }, []);

    useEffect(() => { 
        if(turnoId.length !==0) dispatch(getClienteByDni(turnoId.dniCliente))
    }, [turnoId]);
    
    const [complete,setComplete] = useState(false)

    const [input,setInput] = useState({
        errors:{},
        sintomas: "",
        diagnostico: "",
        estudio: "",
        indicaciones:"",
        status: "concretado",
        idTurno: idTurno,
    });

    

    function handleChange(e){
        const {name,value} = e.target;
        const {errors,...sinErrors} = input;
        const result = validate(sinErrors);
        setInput({
            ...input,
            [name] : value,
            errors: result
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        const {errors,...sinErrors} = input;
        const result = validate(sinErrors);
        if(!Object.keys(result).length){
            // dispatch(addDoctor(input));
            setComplete(true);
            dispatch(addDiagnostico(input))
        }
    }
    // control de sesion
    let session=false;
    if(cookies.get('clinica_id')&&cookies.get('doctor_codigo')) session = true;
    const [loggeado] = useState(session);

    if(loggeado){
    return(
        <>
        <div className="contenedor_adminClinica">
            <NavClinica/>
            {!complete?
                <div className="conteinerTotalitus">
                    <h2>{turnoId?.fecha}</h2>
                    <h3>Formulario de Diagnóstico</h3>
                    <form className="formu_addDiag" onSubmit={(e)=> handleSubmit(e)} autoComplete='off'>
                        <h4>Datos del Paciente:</h4>
                        <div className="d-flex  justify-content-center gap-3">
                            <div>
                                <p><strong>Nombre: </strong></p>
                                <p>{cliente[0]?.nombre } {cliente[0]?.apellido}</p>
                            </div>
                            <div>
                                <p><strong>Dni: </strong></p>
                                <p>{cliente[0]?.dni }</p>
                            </div>
                                                       
                        </div>
                        <div>
                            <h3>Ingrese los datos del diagnóstico: </h3>
                        </div>
                        <div>
                            <h6>Sintomas*:</h6>
                            <textarea className="inputente maxi_inpt" type='text' placeholder="Sintomas" value={input.sintomas} name='sintomas' onChange={(e)=>handleChange(e)} />
                            {input.errors.sintomas? <p className='errors_add'>{input.errors.sintomas}</p>:<p className='errors_add'> </p>}
                        </div>
                        <div>
                            <h6>Diagnostico*:</h6>
                            <textarea className="inputente maxi_inpt" type='text' placeholder="Diagnostico" value={input.diagnostico} name='diagnostico' onChange={(e)=>handleChange(e)} />
                            {input.errors.diagnostico? <p className='errors_add'>{input.errors.diagnostico}</p>:<p className='errors_add'> </p>}
                        </div>
                        <div>
                            <h6>Indicaciones:</h6>
                            <input className="inputente" type='text' placeholder="Indicaciones" value={input.indicaciones} name='indicaciones' onChange={(e)=>handleChange(e)} />
                        </div>
                        <div>
                            <h6>Estudios:</h6>
                            <input className="inputente" type='text' placeholder="Estudio" value={input.estudio} name='estudio' onChange={(e)=>handleChange(e)} />
                        </div>
                        <p>*Campos Obligatorios</p>
                        <div className="row">
                            <div className="col-12 ">
                                <button type="submit" className="btn btn-primary " >Agregar Diagnostico</button>
                            </div>
                        </div>
                    </form>
                </div>
                :
                <div className="contenedor_diag_compl" >
                    <div className="formu_complete_diag">
                        <img src={logo} alt="imagen" className='logo_clinno_navC' />
                        <h4>Formulario Completado!</h4>
                        <h6>El Diagnostico ya fue enviado</h6>
                        <p>Podras ver el diagnostico </p>
                        <Link className="botoncito_verD" to={`/SoyDoctor/verDiagnostico/${idTurno}`}>VER DIAGNOSTICO</Link>
                    </div>                    
                </div>
            }
            </div>
            <Footer />
        </>
    )
    }else{
        cookies.get('clinica_codigo')?window.location.href='/loginClinica' :window.location.href='/soyDoctor';
    }
}