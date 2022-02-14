import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {turno_clinica} from '../../actions';

export default function LoginClinica({idClinica}){
    

    const cookies = new Cookies();
    const dispatch = useDispatch();

    const turnos = useSelector((state)=> state.turnosClinica);
   

    const [turn,setTurn] = useState(turnos);
    

    async function dispa (){
        dispatch(turno_clinica(cookies.get('clinica_id')))
        setTurn(turnos)
    }
    useEffect(() => { 
        dispa();
    },[])

    return(
        <div>
        <div className="grid_turno_table">
            <span>
                <strong>cliente</strong>
            </span>
            <span>
                <strong>fecha</strong>
            </span>
            <span>
                <strong>hora</strong>
            </span>
            <span>
                <strong>doctor</strong>
            </span>
            <span>
                <strong>especialidad</strong>
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
                return <div className="grid_turno_table">
                    <span>{t.cliente }</span>
                    <span>{t.fecha }</span>   
                    <span>{t.hora }</span>
                    <span>{t.doctor }</span>
                    <span>{t.especialidad}</span>
                </div>
            })}
    </div>
    )
}