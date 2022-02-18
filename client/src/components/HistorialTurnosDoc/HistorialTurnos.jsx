import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { getTurnosDoctor,getClients,getEspecialidad,getClinicas,getDiagnostico,filter_fechas,canTurno} from '../../actions'
import Footer from "../Home/Footer";
import NavClinica from '../AdminClinica/NavClinica.jsx';

import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";



export default function HistorialTurnosDoc(){
    
    const cookies = new Cookies();
    const dispatch = useDispatch();

    const [turn,setTurn] = useState([]);

    // const turnosFilter = useSelector((state)=> state.turnos);
    const turnos = useSelector((state)=> state.turnos);
    const especialidades = useSelector((state)=> state.especialidades);
    const diagDoc = useSelector((state)=> state.diagnosticos);
    const cliente = useSelector((state)=> state.clientes);

    // control de sesion
    let session=false;
    if(cookies.get('clinica_id')&&cookies.get('doctor_codigo')) session = true;
    const [loggeado,setLoggeado] = useState(session);

    useEffect(()=>{
        dispatch(getTurnosDoctor(cookies.get('doctor_id')))
        dispatch(getClinicas())
        dispatch(getClients())
        dispatch(getEspecialidad())
        dispatch(getDiagnostico())
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
    
    const date = new Date();
    const finalDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const horaAhora = date.getHours() ;

    const [input,setInput] = useState({fecha:''});
    


    function handleChange(e){
        const {name,value} = e.target;
        const {errors,...sinErrors} = input;
        setInput({
            ...input,
            [name] : value,
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(filter_fechas(input))
    }
    const [cancel,setCancel] = useState({
        status: "cancelado",
        idTurno:""
    })
    function cancelarTurno(id){
        dispatch(canTurno({status:"cancelado",idTurno:id}))
        dispatch(getTurnosDoctor(cookies.get('doctor_id')));
        setTurn(turnos);
        swal("Turno Cancelado!", "El turno ah sido Cancelado", "success")
        setTimeout(()=> window.location.href='/soyDoctor/turnosDelDia', 2000);
    }

    if(loggeado){

    return (
        <>
            <div className="contenedor_adminClinica">
                <NavClinica/>
                <h3 className="">Historial de turnos de {cookies.get('doctor_nombre')} </h3>
                <form onSubmit={(e)=> handleSubmit(e)}> 
                    <input type='text' 
                    placeholder="Fecha Turno dd-mm-aaaa"
                    value={input.fecha}
                    name='fecha'
                    onChange={(e)=>handleChange(e)}/>
                    <button className="btn btn-warning">Enviar Fecha</button>
                </form>
                <div className="grid_turno_table text-white" >
                    <span>
                        <strong>Paciente</strong>
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
                    <span>
                        <strong>Diagnostico/Status</strong>
                    </span>
                </div>
                {turn &&turn?.sort(function(a, b) {
                        if (a.fecha < b.fecha) {
                            return 1;
                        }
                        if (a.fecha > b.fecha) {
                            return -1;
                        }
                        return (a.hora < b.hora)?  -1:1;

                    }).map(t=>{
                        if(finalDate>t.fecha){
                            return ( 
                            // <Turno 
                            //     Cliente={(cliente?.find(el => el.id === parseInt(t.idCliente,10)))?.nombre}
                            // />
                            <div className="grid_turno_table text-white">
                                <span>{(cliente?.find(el => el.dni === parseInt(t.dniCliente,10)))?.nombre}</span>
                                <span>{t.fecha }</span>   
                                <span>{t.hora }</span>
                                <span>{(especialidades?.find(el => el.id === t.idEspecialidad))?.nombre }</span>
                                <span>{t.status !== 'cancelado'?
                                    (diagDoc?.find(el => el.idTurno === t.id))?.diagnostico?
                                  <Link to={`/SoyDoctor/VerDiagnostico/${t.id}`} className="btn btn-warning">Ver</Link>:
                                  <><Link to={`/SoyDoctor/AgregarDiagnostico/${t.id}`} className="btn btn-info">Agregar</Link> 
                                  <button className="btn btn-danger" onClick={()=>{cancelarTurno(t.id)}} >Cancelar</button> </>:
                                  <p className="btn btn-outline-danger">CANCELADO</p>}</span>
                            </div>
                        )
                    }
                })} 

            </div>
            <Footer />
        </>
    )
    }else{
        cookies.get('clinica_codigo')?window.location.href='/loginClinica' :window.location.href='/soyDoctor';
    }
}