import React from 'react'
import { addEspecialidad} from '../../actions';
import Cookies from 'universal-cookie';
import { useDispatch} from 'react-redux';
import { useState } from 'react';
// import { Link } from "react-router-dom";
import NavClinica from '../AdminClinica/NavClinica.jsx'
import Footer from "../Home/Footer";
import swal from 'sweetalert';

import "../AddDoctor/AddDoctorStyle.css"


const validate = values =>{
    const errors ={}

    const vald = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/
    if(!values.nombre){
        errors.nombre = 'Agrege un nombre';
    }else{
        if(values.nombre.length<5 || values.nombre.length>24){
            errors.nombre = 'El nombre no es valido';
        } 
    }
    if(!(RegExp(vald).test(values.nombre))){
        errors.nombre = 'El nombre no es valido';
    }
    return errors;
}

function AddEspecialidades() {
    const dispatch = useDispatch();
    const cookies = new Cookies();

   

    // control de sesion
    let session=false;
    if(cookies.get('clinica_id')&&cookies.get('clinica_codigo')) session = true;
    const [loggeado] = useState(session);

    const [input,setInput] = useState({
        errors:{},
        nombre: "",
    });

    function handleChange(e){
        const {errors,...sinErrors} = input;
        const result = validate(sinErrors);
        setInput({
            ...input,
            nombre : e.target.value,
            clinica : cookies.get('clinica_id'),
            errors: result
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        const {errors,...sinErrors} = input;
        const result = validate(sinErrors);
        if(!Object.keys(result).length){
            dispatch(addEspecialidad(input));
            swal("Especialidad Agregada!", "En instantes seras redirigido nuevamente a Agregar Doctor", "success")
            setTimeout(()=> window.location.href='/adminClinica/addDoctor', 2400);
        }
    }


    if(loggeado){
        return(
            <div >
                <NavClinica/>
                <div className="contenedor_adminClinica">
                    
                    <div className="row d-flex flex-column gap-3 add_especialidad ">
                        <div className="col-12 d-flex flex-column align-items-center ">
                            <h3 className="agrega_nueva">Agrega una nueva especialidad!</h3>
                            <form className="formu_addespecialidad" onSubmit={(e)=> handleSubmit(e)}>
                                <h4>Por favor ingrese su especialidad:</h4>
                                <p className="textito">Ingrese un nombre</p>
                                <p className="textito"> (Primera Letra Mayuscula)</p>
                                <input className='inputcitos' type='text' name="nombre" value={input.nombre }placeholder="Ingrese su especialidad aqui." onChange={(e)=>handleChange(e)} />
                                {input.errors.nombre? <p className='errors_add'>{input.errors.nombre}</p>:<p className='errors_add'> </p>}
                                <button
                                    type="submit"
                                    className="bontoncitis">Continuar</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }else{
        cookies.get('clinica_codigo')?window.location.href='/loginClinica' :window.location.href='/adminClinica';
    }
}

export default AddEspecialidades