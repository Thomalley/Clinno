import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { getTurnosDoctor,getClients,getEspecialidad,getClinicas,getDiagnostico,canTurno, filter_turnos} from '../../actions'
import Footer from "../Home/Footer";
import NavClinica from '../AdminClinica/NavClinica.jsx';

import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
import "./HistorialTurnosStyle.css";



export default function HistorialTurnosDoc(){
    
    const cookies = new Cookies();
    const dispatch = useDispatch();

    const [turn,setTurn] = useState([]);
    const [loading,setLoading] = useState(true);
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
    
    
    const date = new Date();
    const finalDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const horaAhora = date.getHours() ;

        const initialInputState= {fecha:'',nombre:'',status: "cancelado"}
        const [input,setInput] = useState(initialInputState);
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

    function handleAllturnos(e){
        e.preventDefault();
        const {name,value} = e.target;
        setInput(initialInputState)
    }

    function handleAll(e){
        e.preventDefault();
        const {name,value} = e.target;
        setInput({
            ...input,
            [name] : value,
        });
    }

    function changeStatus (e){
        e.preventDefault();
        setInput({
            ...input,
            status: '',
        });
    }
    function changeCancel (e){
        e.preventDefault();
        setInput({
            ...input,
            status: 'cancelado',
        });
    }
    useEffect(()=>{
        dispatch(filter_turnos(input))
    },[input])
    if(loggeado){

    return (
        <>
            <div className="contenedor_adminClinica">
                <NavClinica/>
                <h3 className="">Historial de turnos de {cookies.get('doctor_nombre')} </h3>
                <form autocomplete='off'>
                    <input type='text' placeholder="Fecha Turno dd-mm-aaaa" value={input.fecha} name='fecha' onChange={handleAll}/>
                    
                    <button className="btn btn-primary" onClick={handleAllturnos}>Todos los Turnos</button>

                    <input type='text' placeholder="DNI Paciente" value={input.nombre} name='nombre' onChange={handleAll}/>

                    <input type="radio" class="btn-check" name="options-outlined" id="success-outlined" autocomplete="off" checked onClick={changeCancel} />
                    <label class="btn btn-outline-success" for="success-outlined">Mostrar</label>

                    <input type="radio" class="btn-check" name="options-outlined" id="danger-outlined" autocomplete="off" onClick={changeStatus} />
                    <label class="btn btn-outline-danger" for="danger-outlined">No Mostrar</label>
                </form>
                <div className="grid_turno_table text-white" >
                    <span><strong>Paciente</strong></span>
                    <span><strong>DNI</strong></span>
                    <span><strong>Fecha</strong></span>
                    <span><strong>Hora</strong></span>
                    <span><strong>Especialidad</strong></span>
                    <span><strong>Diagnostico/Status</strong></span>
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
                            <div className="grid_turno_table text-white">
                                <span>{(cliente?.find(el => el.dni === parseInt(t.dniCliente,10)))?.nombre}</span>
                                <span>{(cliente?.find(el => el.dni === parseInt(t.dniCliente,10)))?.dni}</span>
                                <span>{t.fecha }</span>   
                                <span>{t.hora }</span>
                                <span>{(especialidades?.find(el => el.id === t.idEspecialidad))?.nombre }</span>
                                <span>{loading?
                                    <div class="spinner-border text-light" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                    :t.status !== 'cancelado'?
                                    (diagDoc?.find(el => el.idTurno === t.id))?.diagnostico?
                                    <Link to={`/SoyDoctor/VerDiagnostico/${t.id}`} className="btn btn-warning">Ver</Link>:
                                    <><Link to={`/SoyDoctor/AgregarDiagnostico/${t.id}`} className="btn btn-info">Agregar</Link> 
                                    <button className="btn btn-danger" onClick={()=>{cancelarTurno(t.id)}} >Cancelar</button> </>:
                                    <span className="btn btn-outline-danger">CANCELADO</span>
                                  
                                  }</span>
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