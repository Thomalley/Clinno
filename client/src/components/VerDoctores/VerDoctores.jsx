import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from '../AdminClinica/NavClinica.jsx';
import {get_clinica,getEspecialidad,get_All_Doctor,get_Doctores_Esp} from '../../actions';


import logo from '../../components/utils/images-landing/logo.png';


import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";


export default function VerDoctores (){

    const dispatch = useDispatch();
    const cookies = new Cookies();

    const especialidades = useSelector((state)=> state.especialidades)
    useEffect(() => { 
        dispatch(get_clinica(cookies.get('clinica_id'))); 
        dispatch(getEspecialidad());
        dispatch(get_All_Doctor(cookies.get('clinica_id')))
    },[])

    const doctores = useSelector((state)=> state.doctores)
    
    function handleSelect(e){
        const {value} =e.target;
        if(value === 'todas_All'){
            dispatch(get_All_Doctor(cookies.get('clinica_id')))
        }else dispatch(get_Doctores_Esp({idEspecialidad:value,idClinica:cookies.get('clinica_id')}));
    }

    //control se dession
    let session=false;
    if(cookies.get('clinica_id')) session = true;
    const [loggeado,setLoggeado] = useState(session);

    if(loggeado){
        return(
            <div >
                <div className="contenedor_adminClinica">
                    <NavClinica/>
                    <h2>VER DOCTORES</h2>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => handleSelect(e)}>
                        <option  value="todas_All">Todos Los Medicos</option>
                        {
                            especialidades?.sort(function (a, b) {
                                if (a.nombre > b.nombre) return 1;
                                if (a.nombre< b.nombre) return -1;
                                return 0;
                            }).map((el) => <option name={el.nombre} key={el.id} value={el.id}>{el.nombre}</option>)
                        }
                    </select>
                    {doctores && doctores?.map(d=>{
                        return <div key={d.id} className="d-flex justify-content-center">
                            <p>Nombre Completo: {d.nombre}</p> |
                                <div>Especialidades: {d.especialidad?.map(esp=>{
                                return <div key={esp.id}><p>{esp.nombre}</p></div>
                            })}
                            </div> |
                            <p>Codigo Medico: {d.codigo}</p>
                        </div>
                    })}
                </div>
                <Footer />
            </div>
        )
    }else{
        window.location.href='/loginClinica';
    }
}