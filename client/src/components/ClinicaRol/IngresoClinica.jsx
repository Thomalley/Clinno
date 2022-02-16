import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import {getClinicaId} from '../../actions'

import icono from '../../components/utils/icono-clinica.png'

import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
// import "./AdminClinicaStyle.css";


export default function IngresoClinica(){

    const cookies = new Cookies();
    const dispatch = useDispatch();
    const clinica = useSelector((state)=> state.clinicaById);


    useEffect(()=>{
        dispatch(getClinicaId(cookies.get('clinica_id')));
    },[])
    const [input, setInput] = useState({
        codigo : '',
    });

    function handleSubmit(e){
        e.preventDefault();
        logear()
    }
    function logear(){
        if( input.codigo === clinica?.codigo){
            setInput({password : ''})
            cookies.set('clinica_codigo', input.codigo, {path: '/'});
            swal("Bienvenido!", "Que tengas un buen dia de trabajo!", "success")
            //redict
            setTimeout(()=> window.location.href='/adminClinica', 2000);
        }
        else{
            swal({
                title: "El código ingresado no corresponde a la clinica",
                text: "Verifique los datos e intente nuevamente",
                icon: "warning",
                dangerMode: true,
            })
        }
    }
    
    
    
    
    function handleChange(e){
        setInput({
            ...input,
            codigo : e.target.value,
        });
    }

    return(
        <div>
            <div className="">
                    <div className=" ">
                        <div className="">
                            <Link to="/adminClinica"><img src={logo} alt="logo Clinno"  className="logo_clinno_navC"/></Link>
                            <form className="Form_doc" onSubmit={(e)=> handleSubmit(e)}>
                                <h3>Bienvenido Señor</h3>
                                <h4>Por favor ingrese su codigo:</h4>
                                <div className="d-flex flex-column gap-3">
                                    <input type='text' value={input.codigo }placeholder="Ingrese su Codigo aqui." onChange={(e)=>handleChange(e)} />
                                    <button
                                        type="submit"
                                        className="btn btn-primary">Continuar</button>
                                    
                                </div>
                            </form>
                            <button className="btn_clinic" data-bs-toggle="collapse" 
                                        href="#multiCollapseExample2" role="button" aria-expanded="false" 
                                        aria-controls="multiCollapseExample2">No Te Acordas tu Codigo de Administacion?</button>
                            <div class="collapse multi-collapse" id="multiCollapseExample2">
                                <div class="card card-body render_turno">
                                    <p>{clinica?.codigo}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
    )
}