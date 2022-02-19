import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { getTurnosDoctor,getClients,getEspecialidad,getClinicas,filter_fechas,canTurno} from '../../actions'

import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";
import "./AdminDoctorStyle.css";



export default function VerMisTurnos(){
    
    const [turn,setTurn] = useState([]);
    const [loading,setLoading] = useState(true);
    const turnos = useSelector((state)=> state.turnosDoctor);


    useEffect(()=>{
        console.log(turnos)
        dispatch(getTurnosDoctor(cookies.get('doctor_id')))
        dispatch(getClinicas())
        dispatch(getClients())
        dispatch(getEspecialidad())
        setTurn(turnos);
        setTimeout(()=> setLoading(false),600)
    },[])
    useEffect(()=>{
        if(turnos){
            setTurn(turnos);
        }else{
            dispatch(getTurnosDoctor(cookies.get('doctor_id')))
            dispatch(getClinicas())
            dispatch(getClients())
            dispatch(getEspecialidad())
            setTurn(turnos);
            setTimeout(()=> setLoading(false),600)
        }
    },[turnos])
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const especialidades = useSelector((state)=> state.especialidades);
    const cliente = useSelector((state)=> state.clientes);
    const date = new Date();
    const finalDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    function cancelarTurno(id){
        dispatch(canTurno({status:"cancelado",idTurno:id}))
        dispatch(getTurnosDoctor(cookies.get('doctor_id')));
        setTurn(turnos);
        swal("Turno Cancelado!", "El turno ah sido Cancelado", "success")
        setTimeout(()=> window.location.href='/soyDoctor', 2000);
    }

    return (
        <>
        <h3 className="text-dark">Proximos Turnos de {cookies.get('doctor_nombre')}</h3>

        <div className="grid_turno_table fijo_table">
            <span><strong>Paciente</strong></span>
            <span><strong>DNI</strong></span>
            <span><strong>Fecha</strong></span>
            <span><strong>Hora</strong></span>
            <span><strong>Especialidad</strong></span>
            <span><strong>Cancelar</strong></span>
        </div>
        {turn &&turn?.sort(function(a, b) {
                if (a.fecha < b.fecha) {
                    return -1;
                }
                if (a.fecha > b.fecha) {
                    return 1;
                }
                return (a.hora < b.hora)?  -1:1;

            }).map(t=>{
                if(finalDate<t.fecha && t.status !== 'cancelado'){

                    return <div className="grid_turno_table">
                <span className="spanes">{(cliente?.find(el => el.dni === parseInt(t.dniCliente),10))?.nombre}</span>
                <span className="spanes">{(cliente?.find(el => el.dni === parseInt(t.dniCliente),10))?.dni}</span>
                <span className="spanes">{t.fecha }</span>   
                <span className="spanes">{t.hora }</span>
                <span className="spanes">{(especialidades?.find(el => el.id === t.idEspecialidad))?.nombre }</span>
                <span className="spanes" >{loading?
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    :t.status !== 'cancelado'?
                    <button className="btn btn-danger" onClick={()=>{cancelarTurno(t.id)}} >Cancelar</button> :
                    <span className="btn btn-outline-danger">CANCELADO</span>
                    
                }</span>
            </div>
            }
        })} 
        </>
    )

}