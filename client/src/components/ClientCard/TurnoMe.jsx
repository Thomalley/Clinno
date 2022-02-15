import '../ClientCard/TurnoMe.css'
import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {getDoctoresByEspec, getEspecialidad, getTurnos, getClinicas} from '../../actions/index';
import {useDispatch} from 'react-redux';
import Cookies from 'universal-cookie';
import NavLanding from '../../components/NavLanding/NavLanding'
import Footer from '../Home/Footer';

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
        <div>
        <NavLanding/>
        <h2>Mis Turnos</h2>
        <div className='titulosTurno'>
        {/* <h3>Historial de Turnos</h3>
        <h3>Turnos Pendientes</h3> */}
        
        </div>
        <div class="row containerTurno">
        
        <div class='col'>        
        {
            turnosPasados.length !== 0 ?
                turnosPasados?.map((turno) => 
                <div class='col container6'>        
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
                <p></p>  
            }

        </div>

            {

                turnosPendientes?.map((turno) => 
                
                    <div class='col'>        
                    <div className="detailCard container6">
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
        </div>
        <Footer/>
        </div>
    )
}


