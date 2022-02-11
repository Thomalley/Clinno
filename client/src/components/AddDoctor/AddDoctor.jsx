import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from '../AdminClinica/NavClinica.jsx';
import {get_clinica,getEspecialidad,addDoctor} from '../../actions';


import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";
import "./AddDoctorStyle.css";

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
    
    if(values.especialidad.length<1){
        errors.especialidad = 'Ingresa una Especialidad';
    }else{
        if(values.especialidad.length>3){
            errors.especialidad = 'Maximo 2 especialidades';
        }
    }
    
    return errors;
}

export default function AddDoctor(){

    const dispatch = useDispatch();

    const cookies = new Cookies();
    const [showEsp,setShowEsp] = useState({ especialidad:[]});
    const [add,setAdd] = useState(false);
    const doctor = useSelector((state)=> state.doctor);

    const clinica = useSelector((state)=> state.clinica[0]);

    useEffect(() => { dispatch(get_clinica(cookies.get('clinica_id'))); },[])

    const especialidades =clinica?.especialidad;

    
    //control se dession
    let session=false;
    if(cookies.get('clinica_id')) session = true;    
    const [loggeado,setLoggeado] = useState(session);

    const [input,setInput] = useState({
        errors:{},
        nombre: "",
        especialidad: [],
        clinica: [],
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
            dispatch(addDoctor(input));
            setAdd(true);
        }
    }

    function handleSelect(e){
        const {value} =e.target;
        if(!input.especialidad.includes(value)){
            setInput({
                ...input,
                especialidad: [...input.especialidad,value]
            })
            const [name]= especialidades?.filter(e=> e.id === parseInt(value,10));
            setShowEsp({
                ...showEsp,
                especialidad: [...showEsp.especialidad,name.nombre]
            })
        }
    }
   
    const deleteEspecialidad = (e)=>{
        const {value} =e.target;
        const [id]=  especialidades?.filter(e=> e.nombre.toLowerCase() === value.toLowerCase());

        setInput({
            ...input,
            especialidad: input.especialidad.filter(e => parseInt(e,10) !== parseInt(id.id,10) )
        })  
        setShowEsp({
            ...showEsp,
            especialidad: showEsp.especialidad.filter(e => e.toLowerCase() !== value.toLowerCase() )
        })
        
    }

    if(loggeado){
        return(
            
            <div >
                <div className="contenedor_adminClinica">
                        <NavClinica/>
                {add?
                    <div >
                        <h2>Doctor agregado Con exito!</h2>
                        <h4>Fue agregado {doctor?.nombre} con exito en {cookies.get('clinica_nombre')}</h4>
                        <h2>Su codigo de doctor es: {doctor?.codigo}</h2> 
                        
                    </div>
                    :
                        <div className="contenedor_addDoctor">
                            <h4>Estas en add Doctor</h4>

                            <form onSubmit={(e)=> handleSubmit(e)}>
                                <select className="form-select" aria-label="Default select example" onChange={(e) => handleSelect(e)}>
                                    {
                                    especialidades?.sort(function (a, b) {
                                        if (a.nombre > b.nombre) {
                                            return 1;
                                        }
                                        if (a.nombre< b.nombre) {
                                            return -1;
                                        }
                                        return 0;
                                    }).map((el) => <option name={el.nombre} key={el.id} value={el.id}>{el.nombre}</option>)
                                    }
                                </select>
                                <Link to='/AddEspecialidad'>Deseas Agregar una nueva especialidad?</Link>
                                <div className="show_especialidades">
                                    {showEsp.especialidad?.sort().map(e =>(
                                        <div className="esp_Show" key ={e}>
                                            <p className="texto_esp" >{e}</p>
                                            <button className="delete_esp"
                                            onClick={deleteEspecialidad}
                                            value={e}>X</button>
                                        </div>
                                        ))
                                    }
                                </div>
                                {input.errors.especialidad? <p className='errors'>{input.errors.especialidad}</p>:<p> </p>}
                                <input 
                                    type='text'
                                    placeholder="Nombre Doctor"
                                    value={input.nombre}
                                    name='nombre'
                                    onChange={(e)=>handleChange(e)}
                                />
                                {input.errors.nombre? <p className='errors'>{input.errors.nombre}</p>:<p> </p>}
                                <div className="row">
                                    <div className="col-12 ">
                                        <button type="submit" className="btn btn-primary " >Continuar</button>
                                    </div>
                                </div>

                            </form>
                            
                            
                        </div>
                }

                </div>
                <Footer />
    
            </div>
        )
    }else{
        window.location.href='/loginClinica';
    }
}