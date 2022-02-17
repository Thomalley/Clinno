import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import {get_clinica,turno_clinica} from '../../actions';
import icono from '../../components/utils/icono-clinica.png'
import { cerrarSesion } from "./CerrarSesion";

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

    return(
        <div className="background_doc">
                    <div className="row d-flex flex-column gap-3 contenedor_Doctor">
                        <div className="contedor_doc_but">
                            <Link to="/adminClinica"><img src={logo} alt="logo Clinno"  className="logo_clinno_navC"/></Link>
                            <form className="Form_doc" onSubmit={(e)=> handleSubmit(e)}>
                                <h3>Bienvenido a Administración.</h3>
                                <h4>Por favor ingrese su codigo :</h4>
                                <div className="d-flex flex-column gap-3">
                                    <input type='text' value={input.codigo }placeholder="Ingrese su Codigo aqui." onChange={(e)=>handleChange(e)}/>
                                    <button
                                        type="submit"
                                        className="btn btn-primary">Continuar</button>
                                </div>
                            </form>
                            <div>
                                <button >No Te Acordas tu Codigo?</button>
                                <div>
                                    <o>Falta codigo aqui, enviar mail</o>
                                </div>
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
                </div>
    )
}