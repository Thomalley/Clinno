import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { getTurnosDoctor,getClients,getEspecialidad,getClinicas,getDiagnostico,canTurno, filter_turnos} from '../../actions'
import Footer from "../Home/Footer";
import NavClinica from '../AdminClinica/NavClinica.jsx';
import Cookies from 'universal-cookie';
import "./HistorialTurnosStyle.css";



export default function HistorialTurnosDoc(){
    
    const cookies = new Cookies();
    const dispatch = useDispatch();

    const [turn,setTurn] = useState([]);
    const [loading,setLoading] = useState(true);
    const [datejs, setdatejs] = useState(new Date())

    // const turnosFilter = useSelector((state)=> state.turnos);
    const turnos = useSelector((state)=> state.turnos);
    const especialidades = useSelector((state)=> state.especialidades);
    const diagDoc = useSelector((state)=> state.diagnosticos);
    const cliente = useSelector((state)=> state.clientes);

    // control de sesion
    let session=false;
    if(cookies.get('clinica_id')&&cookies.get('doctor_codigo')) session = true;
    const [loggeado] = useState(session);

    useEffect(()=>{
        dispatch(getTurnosDoctor(cookies.get('doctor_id')))
        dispatch(getClinicas())
        dispatch(getClients())
        dispatch(getEspecialidad())
        dispatch(getDiagnostico())
        setTurn(turnos);
        setTimeout(()=> setLoading(false),600)
        return () => { setTurn([])};

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
    
    
    // const date = new Date();    
    const jsFinalDate = `${datejs.getDate()}-${datejs.getMonth() + 1}-${datejs.getFullYear()}`;
  
    const initialInputState= {fecha:'',nombre:'',status: "cancelado"}
    const [input,setInput] = useState(initialInputState);
    const [cancel,setCancel] = useState({
        status: "cancelado",
        idTurno:""
    })    
    
    function esFecha(finalDate){
        if (finalDate !== undefined) {
            const fdD = parseInt( finalDate[0] + finalDate[1],10)
            const fdM = parseInt( finalDate[3] + (finalDate[4] !== "-" ? finalDate[4] : ""),10)
            const fdA = parseInt( finalDate[finalDate.length - 4] + finalDate[finalDate.length - 3] + finalDate[finalDate.length - 2] + finalDate[finalDate.length - 1],10)
            // const jsfdD = jsFinalDate[0] + (jsFinalDate[1] !== "-")
            // const jsfdM = jsFinalDate[3] + (jsFinalDate[4] !== "-" ? finalDate[4] : "")
            // const jsfdA = parseInt( jsFinalDate[jsFinalDate.length - 4] + jsFinalDate[jsFinalDate.length - 3] + jsFinalDate[jsFinalDate.length - 2] + jsFinalDate[jsFinalDate.length - 1],10)
            const arr = jsFinalDate.split('-')
            const jsfdD = parseInt(arr[0],10)
            const jsfdM = parseInt(arr[1],10)
            const jsfdA = parseInt(arr[2],10)
            console.table(fdD,fdM,fdA)
            console.table(jsfdD,jsfdM,jsfdA)
            // console.log(jsFinalDate.split('-'))
            // console.log(finalDate)
            if ( fdA < jsfdA) {//2021 2022
                return true
            }
            if (fdM < jsfdM && fdA === jsfdA) {//02-2022  < 03-2022
                return true
            }
            if ( fdD < jsfdD && fdM === jsfdM && fdA === jsfdA) {//21-01-2022 > 18-02-2022
                return true
            }
            return false
        }else{
            return false
        }
    }
    
    
    function selectID(id){
        setCancel({...cancel, idTurno:id});
    }


    function cancelarTurno(){
        dispatch(canTurno(cancel))
        dispatch(getTurnosDoctor(cookies.get('doctor_id')));
        setTurn(turnos);
        swal("Turno Cancelado!", "El turno ah sido Cancelado", "success")
        setTimeout(()=> window.location.href='/soyDoctor/historialTurnos', 2000);
    }

    function handleAllturnos(e){
        e.preventDefault();
        const {} = e.target;
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
                <h2 className="">Historial de turnos de {cookies.get('doctor_nombre')} </h2>
                <h3>Filtros:</h3>
                <form autoComplete='off' className="form_history_turns">
                    <div className="contenedor_inpu">
                        <h6>Por Fecha:</h6>
                        <input type='text' className="input_history" placeholder="dd-mm-aaaa" value={input.fecha} name='fecha' onChange={handleAll}/>
                    </div>
                    <div className="contenedor_inpu">
                        <h6>Por DNI:</h6>
                        <input type='text' className="input_history" placeholder="DNI Paciente" value={input.nombre} name='nombre' onChange={handleAll}/>
                    </div>
                    
                    <div className="contenedor_inpu">
                        <h6>Borrar Filtros:</h6>
                        <button className="btn btn-primary" onClick={handleAllturnos}>Todos los Turnos</button>
                    </div>
                    
                    <div className="contenedor_inpu">
                        <h6>Mostrar Cancelados:</h6>
                        <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" autoComplete="off" defaultChecked onClick={changeCancel} />
                        <label className="btn btn-outline-success" htmlFor="success-outlined">Mostrar</label>

                        <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autoComplete="off" onClick={changeStatus} />
                        <label className="btn btn-outline-danger" htmlFor="danger-outlined">No Mostrar</label>
                    </div>
                </form>
                <div className="grid_turno_table fijo_table text-white" >
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
                        // if(finalDate<t.fecha){ 25-03-2022
                        //finalDate 23-02-2022
                        if(esFecha(t.fecha)){

                            return (
                            <div className="grid_turno_table diferente text-white"  key={t.id}>
                                <span className="spanes">{(cliente?.find(el => el.dni === parseInt(t.dniCliente,10)))?.nombre}</span>
                                <span className="spanes" >{(cliente?.find(el => el.dni === parseInt(t.dniCliente,10)))?.dni}</span>
                                <span className="spanes" >{t.fecha }</span>   
                                <span className="spanes" >{t.hora }</span>
                                <span className="spanes" >{(especialidades?.find(el => el.id === t.idEspecialidad))?.nombre }</span>
                                <span className="spanes witin" >{loading?
                                    <div className="spinner-border text-light my-1" role="status">
                                        <span className="visually-hidden my-1">Loading...</span>
                                    </div>
                                    :t.status !== 'cancelado'?
                                    (diagDoc?.find(el => el.idTurno === t.id))?.diagnostico?
                                    <Link to={`/SoyDoctor/VerDiagnostico/${t.id}`} className="btn btn-warning my-1">Ver</Link>:
                                    <><Link to={`/SoyDoctor/AgregarDiagnostico/${t.id}`} className="btn btn-info my-1">Agregar</Link> 
                                    <button className="btn btn-danger my-1" onClick={()=>{selectID(t.id)}} data-bs-toggle="modal" data-bs-target="#exampleModal" >Cancelar</button> </>:
                                    <span className="btn btn-outline-danger my-1">CANCELADO</span>
                                  
                                  }</span>
                            </div>
                        )
                    }
                })} 

            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Cancelar el Turno</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Si das en aceptar, el turno cerra cancelado</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No, Cerrar</button>
                    <button type="button" className="btn btn-danger" onClick={cancelarTurno} >Si, Cancelar el Turno</button>
                </div>
                </div>
            </div>
            </div>
            <Footer />
        </>
    )
    }else{
        cookies.get('clinica_codigo')?window.location.href='/loginClinica' :window.location.href='/soyDoctor';
    }
}