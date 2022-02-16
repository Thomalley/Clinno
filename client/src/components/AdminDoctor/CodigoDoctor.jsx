import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import {get_All_Doctor,getClinicaId} from '../../actions'

import Cookies from 'universal-cookie';

export default function CodigoDoctor(){
    
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const doctores = useSelector((state)=> state.doctores);

    useEffect(()=>{
        dispatch(getClinicaId(cookies.get('clinica_id')));
    },[])
    const [input, setInput] = useState({
        nombre : '',
        email: ''
    });
    const [validate, setValidate] =useState(false);
    function handleSubmit(e){
        e.preventDefault();
        const arr = doctores.filter( doc =>{
            return (input.nombre === doctores.nombre && input.email === doctores.email)
        })
        if(arr){
            swal("Correo enviado correctamente!", "Revise En su correo", "success")
            setTimeout(()=> setValidate(true),2400);
        }
    }
    function handleChange(e){
        const {name,value} = e.target;
        setInput({
            ...input,
            [name] : value,
        });
    }

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

        swal("Has cerrado la sesion con explito!!", "En instantes seras redirigido a Inicio", "success");
        setTimeout(()=> window.location.href='/', 700) ;
    }

    return(
        <div>
            {!validate?
            <div className="container">
                <form className="form_codigo" onSubmit={(e)=> handleSubmit(e)}>
                    <div className="d-flex flex-column gap-3">
                        <p>Para obtener Su codigo, por favor ingrese su nombre,</p>
                        <p>y su email, alli podra resivir su nuevo codigo.</p>
                        <input type='text' name='nombre' value={input.nombre }placeholder="Ingrese su Nombre." onChange={(e)=>handleChange(e)} />
                        <input type='text' name='email' value={input.email }placeholder="Ingrese su Email." onChange={(e)=>handleChange(e)} />
                        <button type="submit"className="btn btn-primary">Continuar</button>
                    </div>
                </form>
                <Link className="volver_inicio" to={'/'}>
                    <button className="btnLoggin_back">Volver a Home</button>
                </Link>                
                <button onClick={cerrarSesion} className="btnLoggin_back">Cerrar sesión</button>
            </div>      
                :<>
                    <p>Correo enviado correctamente a {input.email}</p>
                </>
            }
        </div>
    )
}
