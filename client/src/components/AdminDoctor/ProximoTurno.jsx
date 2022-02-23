import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import swal from 'sweetalert';
import { getTurnosDoctor,getClients,getEspecialidad,getClinicas,
    getDiagnosticoByTurno,
    canTurno,
    getDisponibilidad,
    modifTurno} from '../../actions'
import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";
import "./AdminDoctorStyle.css";
import '../HistorialTurnosDoc/HistorialTurnosStyle.css'


export default function VerMisTurnos(){
    
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [turn,setTurn] = useState([]);
  const [num,setNum] = useState([]);
  const [loading,setLoading] = useState(true);
  const turnos = useSelector((state)=> state.turnos);
  let turnosdni = useSelector((state) => state.turnosDni);
  const [diag, setDiag] = useState("");
  const [date, setDate] = useState(new Date());
  const [datejs, setdatejs] = useState(new Date())
  var [finalDate, setfinalDate] = useState();
  const onChange = date => {
    setDate(date)
  }
  const [updateDate, setupdateDate] = useState({ fecha: "", hora: "", idTurno: "" })
  const jsFinalDate = `${datejs.getDate()}-${datejs.getMonth() + 1}-${datejs.getFullYear()}`;
  const horariosDispoDoc = useSelector((state) => state.horarioDisponibleParaTurno)
  let diaTurno = undefined;
  let mesTurno = undefined;
  let yearTurno = undefined;

  useEffect(() => {
    if (diag !== "") dispatch(getDiagnosticoByTurno(diag));
  }, [diag]);

  useEffect(()=>{
      const sumita =turn.filter(t=> jsFinalDate<t.fecha && t.status !== 'cancelado')
      setNum(sumita);
  },[turn])
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
          const sumita =turn?.map(t=>{ if( jsFinalDate<t.fecha && t.status !== 'cancelado'){return t}})
          setNum(sumita);
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

    return(
        <>
        <h3 className="text-white">Proximo Turno de {cookies.get('doctor_nombre')}</h3>
            
        <div className="grid_turno_table fijo_table text-white">
            <span><strong>Paciente</strong></span>
            <span><strong>DNI</strong></span>
            <span><strong>Fecha</strong></span>
            <span><strong>Hora</strong></span>
            <span><strong>Especialidad</strong></span>
            <span><strong>Modificar/Cancelar</strong></span>
        </div>
        {num?.length >0? 
        <div>
          <div className="grid_turno_table diferente text-white" key={num[0].id}>
              <span className="spanes">{(cliente?.find(el => el.dni === parseInt(num[0].dniCliente),10))?.nombre}</span>
              <span className="spanes">{(cliente?.find(el => el.dni === parseInt(num[0].dniCliente),10))?.dni}</span>
              <span className="spanes">{num[0].fecha }</span>   
              <span className="spanes">{num[0].hora }</span>
              <span className="spanes">{(especialidades?.find(el => el.id === num[0].idEspecialidad))?.nombre }</span>
              <div className="spanes" >{loading?
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
              :
              <>
                  <button value={num[0].id} onClick={handleModificar} className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModalMod" >Modificar</button> 
                  <button className="btn btn-danger" onClick={()=>{cancelarTurno(num[0].id)}} >Cancelar</button> 
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
                            <button value={num[0].id} onClick={handleSubmitModificar} type="button" className="btn btn-primary">Continuar</button>
                          </div>
                      </div>
                    </div>
                  </div>
              </>
                }
            </div>
          </div>
        </div>
        :
        <><p>No hay Turnos proximos.</p></>
                
      }
  </>)
}