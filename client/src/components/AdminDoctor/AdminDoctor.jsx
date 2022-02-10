import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from '../AdminClinica/NavClinica.jsx'
import { validate_doctor} from '../../actions'

import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";
import "./AdminDoctorStyle.css";



export default function AdminDoctor(){

    const dispatch = useDispatch();
    const doctor = useSelector((state)=> state.doctor);
    const cookies = new Cookies();

   
    let session=false;
    
    //control se dession
    useEffect(() => {
        if(cookies.get('clinica_id')) {
            setLoggeado(true)
        }else{
            setLoggeado(false)
        }
    },[cookies.get('clinica_id')])

    if(cookies.get('clinica_id')){
        session = true;
    }
    const [loggeado,setLoggeado] = useState(session);
    const [check,setCheck] = useState(false);
    const [input, setInput] = useState({
        password : ''
    });

    function handleSubmit(e){
        e.preventDefault();
        dispatch(validate_doctor(input));
        if( doctor.length > 0){
            setTimeout(()=> swal("Bienvenido!", "Hola Doc", "success"),200);
            setTimeout(()=> setCheck(true), 2000) ;
        }
        //else{
        //     if(!check){
        //     swal({
        //         title: "Usuario o contrasena incorrectos",
        //         text: "Ingrese los datos e intente nuevamente",
        //         icon: "warning",
        //         dangerMode: true,
        //       })
        //     }
        // }
    }
    useEffect(() => {
        dispatch(validate_doctor(input));
    },[input])

    function handleChange(e){
        setInput({
            ...input,
            password : e.target.value
        });
    }

    if(loggeado){
        return(
            <div >

                {  !check?
                <div className="container">
                    <div className="row d-flex flex-column gap-3 contenedor_Doctor">
                        <div className="col-12 ">
                            <h3>Bienvenido Doctor</h3>
                            <form onSubmit={(e)=> handleSubmit(e)}>
                                <h4>Por favor ingrese su codigo:</h4>
                                <input type='text' value={input.password }placeholder="Ingrese su Codigo aqui." onChange={(e)=>handleChange(e)} />
                                <button
                                    type="submit"
                                    className="btn btn-primary">Continuar</button>
                            </form>
                        </div>
                    </div>
                </div>
                
                    :
                <>
                    <div className="contenedor_adminClinica">
                        <NavClinica/>
                        <h1>Bienvenido Nombre Doctor</h1>

                    </div>

                    <Footer />
                </>
                }
    
            </div>
        )
    }else{
        window.location.href='/loginClinica';
    }
}