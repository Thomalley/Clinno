import '../ClientCard/TurnoMe.css'
import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {getDoctoresByEspec, getEspecialidad, getTurnos, getClinicas} from '../../actions/index';
import {useDispatch} from 'react-redux';
import Cookies from 'universal-cookie';


export default function TurnoMe(){

    useEffect ( () => {
        dispatch(getTurnos())
        dispatch(getClinicas())
        dispatch(getDoctoresByEspec(dataDoctor))
        dispatch(getEspecialidad())
    },[])

    const dispatch = useDispatch()
    const turnos = useSelector((state)=> state.turnos);
    const clinicas = useSelector((state)=> state.clinicas);
    const doctores = useSelector((state)=> state.doctoresByEspec);
    const especialidades = useSelector((state)=> state.especialidades);
    const cookies = new Cookies();
    const date = new Date()
    let id = cookies.get('id')
    let turnosDelCliente = [];
    let turnosPendientes = [];
    let turnosPasados = [];

    for(let i = 0; i < turnos.length; i++){
        if (turnos[i].idCliente === id){
            turnosDelCliente.push(turnos[i])
        }
    }

    const finalDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

    for(let i = 0; i < turnosDelCliente.length; i++){
        if (turnos[i].fecha < finalDate){
            turnosPasados.push(turnos[i])
        } else {
            turnosPendientes.push(turnos[i])
        }
    }

    let dataDoctor = {
        "idEspecialidad": "",
        "idClinica": ""
    }


console.log(especialidades)



    //RENDERIZAR LOS TURNOS PENDIENTES COMO CARDS DE TURNOS PENDIENTES

    //EN LA PESTANIA HISTORIAL DE TURNOS MOSTRAR UNA SECCION DE TURNOS PASADOS Y UNA DE TURNOS PENDIENTES

    return (
        <div class="row">

            {
                turnosPendientes?.map((turno) => 
                
                    <div class='container5 col order-1'>        
                    <div className="detailCard">
                    <div class="card">
                    <label>Fecha</label>
                    <label>{turno.fecha}</label>
                    </div>
                    <div class="card">
                    <label>Hora</label>
                    <label>{turno.hora}</label>
                    </div>
                    <div class="card">
                    <label>Clinica</label>
                    <label>{(clinicas?.find(el => el.id === turno.idClinica))?.nombre}</label>
                    </div>
                    <div class="card">
                    <label>Doctor</label>
                    <label>{(doctores?.find(el => el.id === turno.idDoctor))?.nombre}</label>
                    </div>
                    <div class="card">
                    <label>Especialidad</label>
                    <label>{(especialidades?.find(el => el.id === turno.idEspecialidad))?.nombre}</label>
                    </div>
                    </div>
                    </div>
                )   
            }

    
        <div class='container5 col order-2'>        
        {
            turnosPasados.length !== 0 ?
                turnosPasados?.map((turno) => 
                <div class='container5 col order-1'>        
                <div className="detailCard">
                <div class="card">
                <label>Fecha</label>
                <label>{turno.fecha}</label>
                </div>
                <div class="card">
                <label>Hora</label>
                <label>{turno.hora}</label>
                </div>
                <div class="card">
                <label>Clinica</label>
                <label>{(clinicas?.find(el => el.id === turno.idClinica))?.nombre}</label>
                </div>
                <div class="card">
                <label>Doctor</label>
                <label>{(doctores?.find(el => el.id === turno.idDoctor))?.nombre}</label>
                </div>
                <div class="card">
                <label>Especialidad</label>
                <label>{(especialidades?.find(el => el.id === turno.idEspecialidad))?.nombre}</label>
                </div>
                </div>
                </div>
                ) 
                :
                <p>No se han generado citas médicas aún</p>  
            }
        </div>
        </div>
        
    )
}


