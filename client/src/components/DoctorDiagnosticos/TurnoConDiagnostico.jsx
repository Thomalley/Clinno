import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { getTurnosDoctor,getClients,getEspecialidad,getClinicas} from '../../actions'



import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";



export default function TurnosConDiagnostico({cliente,fecha,hora,getEspecialidad,diagnostico}){

    return(
        <>
            <div className="grid_turno_table text-white">
                <span>{cliente}</span>
                {/* <span>{t.fecha }</span>   
                <span>{t.hora }</span>
                <span>{(especialidades?.find(el => el.id === t.idEspecialidad))?.nombre }</span>
                <span>VER o Agregar</span> */}
            </div>
        </>
    )
}