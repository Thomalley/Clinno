import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { getTurnosClinica,getClients,getEspecialidad,getDoctoresByEspec} from '../../actions'

import logo from '../../components/utils/images-landing/logo.png'


import "../AdminClinica/AdminClinicaStyle.css";


export default function TurnosClinica({idClinica}){

    const [turn,setTurn] = useState([]);

    const turnos = useSelector((state)=> state.turnosClinica);


    useEffect(()=>{
        console.log(turnos)
        dispatch(getTurnosClinica(cookies.get('clinica_id')))
        dispatch(getDoctoresByEspec(dataDoctor))
        dispatch(getClients())
        dispatch(getEspecialidad())
        console.log('funca');
        setTurn(turnos);
    },[])
    useEffect(()=>{
        if(turnos){
            setTurn(turnos);
        }else{
            dispatch(getTurnosClinica(cookies.get('clinica_id')))
            dispatch(getDoctoresByEspec(dataDoctor))
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
    const doctores = useSelector((state)=> state.doctoresByEspec);
    const doctor = useSelector((state)=> state.doctor);

   

    let dataDoctor = {
        "idEspecialidad": "",
        "idClinica": ""
    }   
    
    return (
        <>
        <h3>Proximos Turnos</h3>

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
            <strong>doctor</strong>
        </span>
        <span>
            <strong>Especialidad</strong>
        </span>
    </div>
        {turn &&turn?.sort(function(a, b) { console.log(turn)
                if (a.fecha < b.fecha) {
                    return -1;
                }
                if (a.fecha > b.fecha) {
                    return 1;
                }
                return (a.hora < b.hora)?  -1:1;

            }).map(t=>{
            return <div className="grid_turno_table">
                <span>{(cliente?.find(el => el.id === parseInt(t.idCliente,10)))?.nombre}</span>
                <span>{t.fecha }</span>   
                <span>{t.hora }</span>
                <span>{(doctores?.find(el => el.id === t.idDoctor,10))?.nombre}</span>
                <span>{(especialidades?.find(el => el.id === t.idEspecialidad))?.nombre }</span>
            </div>
        })} 
        </>
    )
}