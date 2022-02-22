import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import NavClinica from '../AdminClinica/NavClinica.jsx';
import {get_clinica,getEspecialidad,get_All_Doctor,get_Doctores_Esp} from '../../actions';
import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";
import "./VerDoctoresStyle.css";



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
    if(cookies.get('clinica_id')&&cookies.get('clinica_codigo')) session = true;

    const [loggeado] = useState(session);

    if(loggeado){
        return(
            <div >
                <div className="contenedor_adminClinica">
                    <NavClinica/>
                    <h2>VER DOCTORES</h2>
                    <div className="container_ver_form">
                        <div className="form_ver_doc">
                            <h4>Filtrar Doctores por especialidad:</h4>
                            <select className="form-select select_doctor" aria-label="Default select example" onChange={(e) => handleSelect(e)}>
                            <option  value="todas_All">Todos Los Medicos</option>
                            {
                                especialidades?.sort(function (a, b) {
                                    if (a.nombre > b.nombre) return 1;
                                    if (a.nombre< b.nombre) return -1;
                                    return 0;
                                }).map((el) => <option name={el.nombre} key={el.id} value={el.id}>{el.nombre}</option>)
                            }
                        </select>
                        </div>
                    </div>
                    <div className="container_table_verDoc">
                        <div className="grid_doctor_table">
                            <span>
                                <strong>Doctor</strong>
                            </span>
                            <span>
                                <strong>Especialidad</strong>
                            </span>
                            <span>
                                <strong>Email</strong>
                            </span>                        
                        </div>
                        {doctores && doctores?.map(d=>(
                            <div key={d.id} className="grid_doctor_table">
                                <span className="tesx_nombre">{d.nombre}</span>
                                <span> {d.especialidad?.map(esp=>{
                                    return <p className="tesx_esp">{esp.nombre}</p>
                                })}</span>
                                <span className="tesx_nombre">{d.email}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }else{
        cookies.get('clinica_codigo')?window.location.href='/loginClinica' :window.location.href='/adminClinica';
    }
}