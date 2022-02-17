import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { addDiagnostico,getTurnoId} from '../../actions'
import Footer from "../Home/Footer";
import NavClinica from '../AdminClinica/NavClinica.jsx';
import Turno from './TurnoConDiagnostico';
import logo from '../../components/utils/images-landing/logo.png'
import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";


const validate = values =>{
    const errors ={}

    // const vald = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
    // const valdEmail= /^\S+@\S+$/i;
    // const valdDNI = /^[0-9]+$/;

    // if(!values.nombre){
    //     errors.nombre = 'Agrege un nombre';
    // }else{
    //     if(values.nombre.length<5 || values.nombre.length>24){
    //         errors.nombre = 'El nombre no es valido';
    //     }
    // }
    // if(!(RegExp(vald).test(values.nombre))){
    //     errors.nombre = 'El nombre no es valido';
    // }
    
    // if(!values.email){
    //     errors.email = 'Agrege un email';
    // }else{
    //     if(values.nombre.length<5 || values.nombre.length>24){
    //         errors.email = 'El email no es valido';
    //     }
    // }
    // if(!(RegExp(valdEmail).test(values.email))){
    //     errors.email = 'El email no es valido';
    // }

    // if(!values.dni){
    //     errors.dni = 'Agrege un dni';
    // }else{
    //     if(values.dni.length<7 || values.dni.length>8){
    //         errors.dni = 'El dni no es valido';
    //     }
    // }
    // if(!(RegExp(valdDNI).test(values.dni))){
    //     errors.dni = 'El dni no es valido';
    // }
    
    // if(values.especialidad.length<1){
    //     errors.especialidad = 'Ingresa una Especialidad';
    // }else{
    //     if(values.especialidad.length>1){
    //         errors.especialidad = 'Solo 1 especialidad';
    //     }
    // }
    
    return errors;
}

export default function TurnosDelDia(){
    
      const turnoId = useSelector((state) => state.turnoById);

    let navigate = useNavigate();
    let { idTurno } = useParams();
    
    const cookies = new Cookies();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getTurnoId(idTurno));
    // }, []);

    console.log(idTurno);
    const [input,setInput] = useState({
        errors:{},
        sintomas: "",
        diagnostico: "",
        receta: "",
        indicaciones:"",
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
        // if(!Object.keys(result).length){
            // dispatch(addDoctor(input));
            // setAdd(true);
            dispatch(addDiagnostico(input))
        // }
    }
    
return(
    <>
        <h2>{turnoId?.fecha}</h2>
        <form className="formu_addDoctor" onSubmit={(e)=> handleSubmit(e)}>
            <input 
            type='text'
            placeholder="Sintomas"
            value={input.sintomas}
            name='sintomas'
            onChange={(e)=>handleChange(e)}
            />
            {/* {input.errors.nombre? <p className='errors_add'>{input.errors.nombre}</p>:<p className='errors_add'> </p>} */}
            <input 
                type='text'
                placeholder="Diagnostico"
                value={input.diagnostico}
                name='diagnostico'
                onChange={(e)=>handleChange(e)}
            />
            {/* {input.errors.dni? <p className='errors_add'>{input.errors.dni}</p>:<p className='errors_add'> </p>} */}
            <input 
                type='text'
                placeholder="Receta"
                value={input.receta}
                name='receta'
                onChange={(e)=>handleChange(e)}
            />
            <input 
                type='text'
                placeholder="indicaciones"
                value={input.indicaciones}
                name='indicaciones'
                onChange={(e)=>handleChange(e)}
            />
            {/* {input.errors.email? <p className='errors_add'>{input.errors.email}</p>:<p className='errors_add'> </p>} */}
            <div className="row">
                <div className="col-12 ">
                    <button type="submit" className="btn btn-primary " >Agregar Diagnostico</button>
                </div>
            </div>
        </form>
    </>
)
}