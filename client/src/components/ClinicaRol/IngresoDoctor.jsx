import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { get_doctor_id,validate_doctor} from '../../actions'

import icono from '../../components/utils/icono-clinica.png'

import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
// import "./AdminClinicaStyle.css";


export default function IngresoDoctor(){

    const cookies = new Cookies();
    const dispatch = useDispatch();
    const doctor = useSelector((state)=> state.doctor);


    const [input, setInput] = useState({
        password : '',
        idClinica:cookies.get('clinica_id')
    });

    function handleSubmit(e){
        e.preventDefault();
        dispatch(validate_doctor(input))
        logear()
    }
    function logear(){
        if( doctor.length >0){
            const data = doctor[0];
            cookies.set('doctor_id', data.id, {path: '/'});
            cookies.set('doctor_nombre', data.nombre, {path: '/'});
            cookies.set('doctor_codigo', data.codigo, {path: '/'});
            cookies.set('doctor_especialidades', data.especialidades, {path: '/'});
            setInput({password : ''})
            dispatch(get_doctor_id(cookies.get('doctor_codigo')));
            swal("Bienvenido!", "Hola Doc", "success")
            //redict
        }
        else{
            swal({
                title: "El código ingresado no corresponde a ningun doctor",
                text: "Verifique los datos e intente nuevamente",
                icon: "warning",
                dangerMode: true,
            })          
        }
    }
    
    useEffect(() => {
        if(!cookies.get('doctor_id')){
            dispatch(validate_doctor(input));
        }
    },[input])
    
    
    function handleChange(e){
        setInput({
            ...input,
            password : e.target.value,
            idClinica:cookies.get('clinica_id')
        });
    }

    return(
        <div>
            <div className="">
                    <div className=" ">
                        <div className="">
                            <Link to="/adminClinica"><img src={logo} alt="logo Clinno"  className="logo_clinno_navC"/></Link>
                            <form className="Form_doc" onSubmit={(e)=> handleSubmit(e)}>
                                <h3>Bienvenido Doctor</h3>
                                <h4>Por favor ingrese su codigo:</h4>
                                <div className="d-flex flex-column gap-3">
                                    <input type='text' value={input.password }placeholder="Ingrese su Codigo aqui." onChange={(e)=>handleChange(e)} />
                                    <button
                                        type="submit"
                                        className="btn btn-primary">Continuar</button>
                                </div>
                            </form>
                            <button className="btn_clinic" data-bs-toggle="collapse" 
                                        href="#multiCollapseExample1" role="button" aria-expanded="false" 
                                        aria-controls="multiCollapseExample1">No Te Acordas tu Codigo de Doctor?</button>
                            <div class="collapse multi-collapse" id="multiCollapseExample1">
                                <div class="card card-body render_turno">

                                {/* Codigo Doctor */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
    )
}