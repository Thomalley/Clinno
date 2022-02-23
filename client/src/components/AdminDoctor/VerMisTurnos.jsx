import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import swal from 'sweetalert';
import { getTurnosDoctor,getClients,getEspecialidad,getClinicas,
    getDiagnosticoByTurno,
    canTurno,
    getDisponibilidad,
    modifTurno,filter_turnos} from '../../actions'
import Footer from "../Home/Footer";
import NavClinica from '../AdminClinica/NavClinica.jsx';
import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";
import "./AdminDoctorStyle.css";
import '../HistorialTurnosDoc/HistorialTurnosStyle.css'


export default function VerMisTurnos(){
    
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const [turn,setTurn] = useState([]);
    const [loading,setLoading] = useState(true);
    const turnos = useSelector((state)=> state.turnos);
    const horariosDispoDoc = useSelector((state) => state.horarioDisponibleParaTurno)
    const turnosPendientes = [];
    const turnosPasados = [];
    const turnosOriginales = turnos
    let turnosFiltrados = turnosOriginales;
    const [diag, setDiag] = useState("");
    const [date, setDate] = useState(new Date());
    const [datejs, setdatejs] = useState(new Date())
    var [finalDate, setfinalDate] = useState();
    const onChange = date => {
      setDate(date)
    }
    const [updateDate, setupdateDate] = useState({ fecha: "", hora: "", idTurno: "" })
    const jsFinalDate = `${datejs.getDate()}-${datejs.getMonth() + 1}-${datejs.getFullYear()}`;
    let diaTurno = undefined;
    let mesTurno = undefined;
    let yearTurno = undefined;
    const initialInputState= {fecha:'',nombre:'',status: "cancelado"}
    const [input,setInput] = useState(initialInputState);    
    
    useEffect(() => {
        if (diag !== "") dispatch(getDiagnosticoByTurno(diag));
      }, [diag]);
    
    useEffect(() => {
      if(updateDate.fecha){
        dispatch(getDisponibilidad(updateDate.fecha, cookies.get('doctor_id')))
      }
      }, [updateDate.fecha])
    //verMis
    useEffect(()=>{
      dispatch(getTurnosDoctor(cookies.get('doctor_id')))
      dispatch(getClinicas())
      dispatch(getClients())
      dispatch(getEspecialidad())
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
            setLoading(false)
            setTimeout(()=> setLoading(false),600)
        }
    },[turnos])
    const especialidades = useSelector((state)=> state.especialidades);
    const cliente = useSelector((state)=> state.clientes);

    function cancelarTurno(id){
        dispatch(canTurno({status:"cancelado",idTurno:id}))
        dispatch(getTurnosDoctor(cookies.get('doctor_id')));
        setTurn(turnos);
        swal("Turno Cancelado!", "El turno ah sido Cancelado", "success")
        setTimeout(()=> window.location.href='/soyDoctor', 2000);
    }
    // control de sesion
    let session=false;
    if(cookies.get('clinica_id')&&cookies.get('doctor_codigo')) session = true;
    const [loggeado,setLoggeado] = useState(session);

    //turnoMe
    function validateDate(value) {
        const data = value.toString('').split(' ');
        switch (data[1]) {
          case "Jan":
            mesTurno = 1
            break
          case "Feb":
            mesTurno = 2
            break
          case "Mar":
            mesTurno = 3
            break
          case "Apr":
            mesTurno = 4
            break
          case "May":
            mesTurno = 5
            break
          case "Jun":
            mesTurno = 6
            break
          case "Jul":
            mesTurno = 7
            break
          case "Aug":
            mesTurno = 8
            break
          case "Sep":
            mesTurno = 9
            break
          case "Oct":
            mesTurno = 10
            break
          case "Nov":
            mesTurno = 11
            break
          case "Dec":
            mesTurno = 12
            break
          default:
            break;
        }
        diaTurno = data[2];
        yearTurno = data[3];
        setfinalDate(diaTurno + '-' + mesTurno + '-' + yearTurno)    
    }

    useEffect(() => {
      if (finalDate !== undefined) {
          const fdD = finalDate[0] + finalDate[1]
          const fdM = finalDate[3] + (finalDate[4] !== "-" ? finalDate[4] : "")
          const fdA = finalDate[finalDate.length - 4] + finalDate[finalDate.length - 3] + finalDate[finalDate.length - 2] + finalDate[finalDate.length - 1]
          const jsfdD = jsFinalDate[0] + jsFinalDate[1]
          const jsfdM = jsFinalDate[3] + (jsFinalDate[4] !== "-" ? finalDate[4] : "")
          const jsfdA = jsFinalDate[jsFinalDate.length - 4] + jsFinalDate[jsFinalDate.length - 3] + jsFinalDate[jsFinalDate.length - 2] + jsFinalDate[jsFinalDate.length - 1]
          if (fdA < jsfdA) {
              return swal(`Error al seleccionar dia ${fdD}/${fdM}/${fdA}`, "La fecha seleccionada no esta disponible (año acontecido)", "warning")
          }
          if (fdM <= jsfdM && fdA < jsfdA) {
              return swal(`Error al seleccionar dia ${fdD}/${fdM}/${fdA}`, "La fecha seleccionada no esta disponible (año acontecido)", "warning")
          }
          if ((fdD <= jsfdD || fdD >= jsfdD) && fdM < jsfdM && fdA <= jsfdA) {
              return swal(`Error al seleccionar dia ${fdD}/${fdM}`, "La fecha seleccionada no esta disponible (Mes acontecido)", "warning")
          }
          if (fdD < jsfdD && fdM <= jsfdM && fdA <= jsfdA) {
              return swal(`Error al seleccionar dia ${fdD}/${fdM}`, "La fecha seleccionada no esta disponible (Dia acontecido)", "warning")
          }
          else {
              setupdateDate({...updateDate,fecha: finalDate})
              
          }
      }
  }, [finalDate])

    const handleSelectHora = (e) => {
        setupdateDate({
          ...updateDate,
          hora: e.target.value
        })
    }
    const handleModificar = (e) => {
        e.preventDefault()
        setupdateDate({
          ...updateDate,
          idDoctor: cookies.get('doctor_id'),
          idTurno:e.target.value
        })
    
      }
    
      const handleSubmitModificar = (e) => {
        e.preventDefault()
        dispatch(modifTurno({ nuevaFecha: updateDate.fecha, nuevaHora: updateDate.hora, idTurno:updateDate.idTurno }))
        if(updateDate.fecha === '' || updateDate.hora === ''){
            swal("Error al seleccionar la hora", "La Hora no ah sido seleccionada", "warning")
          return
        }else{
            swal("Listo", `Su turno ha sido modificado con exito para el dia ${updateDate.fecha} a las ${updateDate.hora}`, "success")
            setTimeout(() => window.location.href = '/soyDoctor', 2000)
            return
        }
      }

      for (let i = 0; i < turnos.length; i++) {
        if (turnos[i].status === "concretado") {
          turnosPasados.push(turnos[i]);
        } else if (turnos[i].status === "pendiente") {
          turnosPendientes.push(turnos[i]);
        }
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
    useEffect(()=>{ dispatch(filter_turnos(input)) },[input])
if(loggeado){
    return(
        <>
        <div className="contenedor_adminClinica">
            <NavClinica/>
            <h3 className="text-white">Proximos Turnos de {cookies.get('doctor_nombre')}</h3>
            <h3>Filtros:</h3>
                <form autoComplete='off' className="form_history_turns">
                    <div className="contenedor_inpu">
                        <h6>Por Fecha:</h6>
                        <input type='text' className="input_history" placeholder="Fecha Turno dd-mm-aaaa" value={input.fecha} name='fecha' onChange={handleAll}/>
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
            <div className="grid_turno_table fijo_table text-white">
                <span><strong>Paciente</strong></span>
                <span><strong>DNI</strong></span>
                <span><strong>Fecha</strong></span>
                <span><strong>Hora</strong></span>
                <span><strong>Especialidad</strong></span>
                <span><strong>Modificar/Cancelar</strong></span>
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
                    if(jsFinalDate<t.fecha){

                        return <div className="grid_turno_table diferente text-white" key={t.id}>
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
                        <>
                            <button value={t.id} onClick={handleModificar} className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModalMod" >Modificar</button> 
                            <button className="btn btn-danger" onClick={()=>{cancelarTurno(t.id)}} >Cancelar</button> 

                            <div className="modal fade" id="exampleModalMod" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Estas a punto de reagendar el turno</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                        <h3>Elige la fecha </h3>
                                        <Calendar
                                            onChange={onChange}
                                            value={date}
                                            onClickDay={(value) => validateDate(value)}
                                        />
                                        </div>
                                        <h3 className="display-6" id="Hor_Tur_Crea">Horario: </h3>
                                        <select id="Sel_Tur_Crea_Hora" className="form-select" aria-label="Default select example" onChange={(e) => handleSelectHora(e)}>
                                        <option value="" disabled selected>{`Horarios disponibles ${updateDate?.fecha.replace('-', '/')}`}</option>
                                            {horariosDispoDoc && horariosDispoDoc?.map((e) => (
                                                <option value={e}>{e}</option>
                                            ))}
                                        </select>
                                        <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Volver atras</button>
                                        <button value={t.id} onClick={handleSubmitModificar} type="button" className="btn btn-primary">Continuar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        : <span className="btn btn-outline-danger">CANCELADO</span>
                        
                    }</span>
                    
                </div>
                }
            })} 
        </div>
        <Footer />
    </>
)}else{
    cookies.get('clinica_codigo')?window.location.href='/loginClinica' :window.location.href='/soyDoctor';
}
}