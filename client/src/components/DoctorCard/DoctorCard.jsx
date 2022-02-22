import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from '../AdminClinica/NavClinica.jsx';
import {getClinicaId,getEspecialidad,getTurnosDoctor} from '../../actions';
import ResetPassDoctor from  "./DoctorResetPass.jsx"
import icono from '../../components/utils/icono-clinica.png'

import './DoctorCardStyle.css'

import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";

export default function DoctorCard(){

    const dispatch = useDispatch();
    const date = new Date();
    const finalDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    const doctor = useSelector((state)=> state.doctor);
    const clinica = useSelector((state)=> state.clinicaById);
    const especialidades = useSelector((state)=> state.especialidades);
    const initalState={
        nombre:'',
        trabaja:'',
        especialidad: '',
        codigo: '',
    }
    const [doc,setDoc] = useState(initalState);

    const cookies = new Cookies();
    useEffect(()=>{
        if(cookies.get('doctor_id')){
            dispatch(getTurnosDoctor(cookies.get('doctor_id')))
            dispatch(getEspecialidad())
            dispatch(getClinicaId(cookies.get('clinica_id')))
            setDoc({...doc,
            nombre: doctor[0]?.nombre,
            trabaja:clinica?.nombre,
            especialidad: cookies.get('doctor_especialidades')[0].nombre
        })
        }
    },[])
    useEffect(()=>{
        if(!clinica){
            dispatch(getTurnosDoctor(cookies.get('doctor_id')))
            dispatch(getEspecialidad())
            dispatch(getClinicaId(cookies.get('clinica_id')))
        }else{
            setDoc({...doc,
                nombre: cookies.get('doctor_nombre'),
                trabaja:clinica?.nombre,
                especialidad: cookies.get('doctor_especialidades')[0].nombre,
                codigo: cookies.get('doctor_codigo')
            })

        }
    },[clinica])

    
    
     // control de sesion
     let session=false;
     if(cookies.get('clinica_id')&&cookies.get('doctor_codigo')) session = true;
     const [loggeado,setLoggeado] = useState(session);

     if(loggeado){
        return(
            
            <div >
                <div className="contenedor_adminClinica">
                        <NavClinica/>
                        <div className="adminClinica_presentacion"> 
                            <img src={icono} alt="hospital" className="logo_hospi_clinic"/>
                            <h2>Perfil de {cookies.get('doctor_nombre')}</h2>
                            <h6>Codigo: {doc.codigo}</h6>
                            <h6>Especialista en:  </h6>
                            <div>{doc.especialidad}</div>
                            <h6>Trabaja en: {doc.trabaja}</h6>
                            <h6>Fecha:  {finalDate}</h6>
                        </div>
                        <li className="btn btn-outline-warning m-3" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                            Modificar Codigo Doctor
                        </li>
                        <div className="collapse multi-collapse contenedor_caja" id="multiCollapseExample1">
                            <div className="card card-body body_caja">
                                <ResetPassDoctor/>
                            </div>
                        </div>
                </div>
                <Footer />
    
            </div>
        )
    }else{
        cookies.get('clinica_codigo')?window.location.href='/loginClinica' :window.location.href='/soyDoctor';
    }
}