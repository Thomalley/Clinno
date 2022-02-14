import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { getTurnosDoctor,getClients,getEspecialidad,getClinicas} from '../../actions'

import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";
import "./AdminDoctorStyle.css";



export default function VerMisTurnos(){
    
    const [turn,setTurn] = useState([]);

    const turnos = useSelector((state)=> state.turnosDoctor);


    useEffect(()=>{
        console.log(turnos)
        dispatch(getTurnosDoctor(cookies.get('doctor_id')))
        dispatch(getClinicas())
        dispatch(getClients())
        dispatch(getEspecialidad())
        console.log('funca');
        setTurn(turnos);
    },[])
    useEffect(()=>{
        if(turnos){
            setTurn(turnos);
        }else{
            dispatch(getTurnosDoctor(cookies.get('doctor_id')))
            dispatch(getClinicas())
            dispatch(getClients())
            dispatch(getEspecialidad())
            console.log('funca');
            setTurn(turnos);
        }
    },[turnos])
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const especialidades = useSelector((state)=> state.especialidades);
    const cliente = useSelector((state)=> state.clientes);
    const date = new Date();
    const finalDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    return (
        <>
        <h3>Turnos de {cookies.get('doctor_nombre')}</h3>

        <div className="grid_turno_table">
            <span>
                <strong>Cliente</strong>
            </span>
            <span>
                <strong>Fecha</strong>
            </span>
            <span>
                <strong>Hora</strong>
            </span>
            <span>
                <strong>Especialidad</strong>
            </span>
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
                if(finalDate<t.fecha){

                    return <div className="grid_turno_table">
                <span>{(cliente?.find(el => el.id === parseInt(t.idCliente,10)))?.nombre}</span>
                <span>{t.fecha }</span>   
                <span>{t.hora }</span>
                <span>{(especialidades?.find(el => el.id === t.idEspecialidad))?.nombre }</span>
            </div>
            }
        })} 
        </>
    )

}