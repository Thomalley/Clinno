import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from '../AdminClinica/NavClinica.jsx';
import {get_clinica,getEspecialidad,addDoctor,getAllDoctores} from '../../actions';
import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";
import "./AddDoctorStyle.css";

const validate = values =>{
    const errors ={}

    const vald = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
    const valdEmail= /^\S+@\S+$/i;
    const valdDNI = /^[0-9]+$/;

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
    
    if(!values.email){
        errors.email = 'Agrege un email';
    }else{
        if(values.nombre.length<5 || values.nombre.length>24){
            errors.email = 'El email no es valido';
        }
    }
    if(!(RegExp(valdEmail).test(values.email))){
        errors.email = 'El email no es valido';
    }

    if(!values.dni){
        errors.dni = 'Agrege un dni';
    }else{
        if(values.dni.length<7 || values.dni.length>8){
            errors.dni = 'El dni no es valido';
        }
    }
    if(!(RegExp(valdDNI).test(values.dni))){
        errors.dni = 'El dni no es valido';
    }
    
    if(values.especialidad.length<1){
        errors.especialidad = 'Ingresa una Especialidad';
    }else{
        if(values.especialidad.length>1){
            errors.especialidad = 'Solo 1 especialidad';
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
    const doctoresDb = useSelector((state)=> state.allDoctoresInDB);


    // const clinica = useSelector((state)=> state.clinica[0]);
    const especialidades = useSelector((state)=> state.especialidades);
    
    useEffect(() => { 
        dispatch(get_clinica(cookies.get('clinica_id')));
        dispatch(getEspecialidad());
        dispatch(getAllDoctores());
    },[])
    
    //control se de session
    let session=false;
    if(cookies.get('clinica_id')&&cookies.get('clinica_codigo')) session = true;
    const [loggeado] = useState(session);

    const [input,setInput] = useState({
        errors:{},
        nombre: "",
        email: "",
        especialidad: [],
        clinica: [],
    });
    
    function handleChange(e){
        const {name,value} = e.target;
        const {errors,...sinErrors} = input;
        const result = validate(sinErrors);
        setInput({
            ...input,
            [name] : value,
            clinica : cookies.get('clinica_id'),
            errors: result
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        const {errors,...sinErrors} = input;
        const result = validate(sinErrors);
        if(!Object.keys(result).length){
            const arr = doctoresDb.filter( d => d.email===input.email)
            if(arr.length!==0){
                swal("Email Incorrecto!", "Este Email no es valido.", "warning");
            }else{
                dispatch(addDoctor(input));
                setAdd(true);
            }
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
                        <h2>Su codigo sera enviado al Email Ingresado </h2> 
                        
                    </div>
                    :
                        <div className="contenedor_addDoctor">
                            <h4 className="text-white mt-5">Agregar un Doctor</h4>

                            <form className="formu_addDoctor" onSubmit={(e)=> handleSubmit(e)}>
                                <h4>Formulario de Doctor</h4>

                                <select className="form-select" aria-label="Default select example" onChange={(e) => handleSelect(e)}>
                                    <option  disabled selected>Selecione sus especialidades</option>
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
                                <Link to='/adminClinica/AddEspecialidad'>Deseas Agregar una nueva especialidad?</Link>
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
                                {input.errors.especialidad? <p className='errors_add'>{input.errors.especialidad}</p>:<p className='errors_add'> </p>}
                                <div>
                                    <p>Ingrese un nombre</p>
                                    <p> (Primera Letra Mayuscula)</p>
                                    <input 
                                        type='text'
                                        placeholder="Nombre Doctor"
                                        value={input.nombre}
                                        name='nombre'
                                        onChange={(e)=>handleChange(e)}
                                    />
                                    {input.errors.nombre? <p className='errors_add'>{input.errors.nombre}</p>:<p className='errors_add'> </p>}
                                </div>
                                
                                <div>
                                    <p>Ingrese El DNI del doctor</p>
                                    <input 
                                        type='number'
                                        placeholder="DNI Doctor"
                                        value={input.dni}
                                        name='dni'
                                        onChange={(e)=>handleChange(e)}
                                    />
                                    {input.errors.dni? <p className='errors_add'>{input.errors.dni}</p>:<p className='errors_add'> </p>}
                                </div>

                                <div>
                                    <p>Ingrese Email del doctor</p>
                                    <p> (No debe estar registrado en Clinno como doctor)</p>
                                    <input 
                                        type='text'
                                        placeholder="Email Doctor"
                                        value={input.email}
                                        name='email'
                                        onChange={(e)=>handleChange(e)}
                                    />
                                    {input.errors.email? <p className='errors_add'>{input.errors.email}</p>:<p className='errors_add'> </p>}
                                </div>

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
        cookies.get('clinica_codigo')?window.location.href='/loginClinica' :window.location.href='/adminClinica';
    }
}