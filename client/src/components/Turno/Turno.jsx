import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie'
import { getEspecialidad, getClinicasByEspec, getDoctoresByEspec, crearTurno, getDisponibilidad } from '../../actions'
import swal from 'sweetalert';
import NavBar from '../NavBar/NavBar'
import Footer from '../Home/Footer'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './calendario.css'
import './turno.css'


export default function Turno() {
    const especialidades = useSelector((state) => state.especialidades)
    const clinicasDeEspe = useSelector((state) => state.clinicasByEspec)
    const doctoresDeEspe = useSelector((state) => state.doctoresByEspec)
    const horarioDispo = useSelector((state) => state.horarioDisponibleParaTurno)
    const dispatch = useDispatch();
    const cookies = new Cookies()
    const [loggeado,setLoggeado] = useState();
    var userLog = cookies.get('email');
    const idUser = cookies.get('id')
    const [idValue, setidValue] = useState({
        idEspecialidad: "",
        idClinica: "",
        horarioDoctor: [],
        idDoctor: "",
        fecha: "",
        hora: "",
        idCliente: idUser
    })
    const [date, setDate] = useState(new Date());
    const onChange = date => {
        setDate(date)
    }
    let diaTurno = undefined;
    let mesTurno = undefined;
    let yearTurno = undefined;
    var finalDate = undefined;

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
        finalDate = diaTurno + '-' + mesTurno + '-' + yearTurno;
        setidValue({ ...idValue, fecha: finalDate })
    }

    useEffect(()=>{
        userLog ? setLoggeado(true) : setLoggeado(false)
    }, [])
    useEffect(()=>{
        dispatch(getDisponibilidad(idValue.fecha, idValue.idDoctor))
        console.log(horarioDispo)
    }, [idValue.fecha])
    useEffect(() => {
        dispatch(getEspecialidad())
    }, [dispatch])

    useEffect(() => {
        dispatch(getClinicasByEspec(idValue.idEspecialidad))

    }, [idValue.idEspecialidad])

    useEffect(() => {
        dispatch(getDoctoresByEspec(idValue))
    }, [idValue])

    function handleSelectDoc(e) {
        const value = e.target.value
        const doc = doctoresDeEspe.filter((d) => d.nombre === value)
        var horario = doc[0].especialidads[0].horario
        const docId = doc[0].id

        setidValue({
            ...idValue,
            horarioDoctor: horario,
            idDoctor: docId
        })
    }

    function handleSelectHora(e) {
        setidValue({
            ...idValue,
            hora: e.target.value
        })
    }

    function handleSelect(e) {
        setidValue({
            ...idValue,
            idEspecialidad: e.target.value
        })

    }
    function handleSelectClinica(e) {
        setidValue({
            ...idValue,
            idClinica: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log('entre al handel submit')
        dispatch(crearTurno(idValue))
        swal("Confirmado!", `Su turno se agendo correctamente para el dia ${idValue.fecha}, a las ${idValue.hora}Hs `, "success")
    }

    return (
        <form onSubmit={handleSubmit}>
            <NavBar loggin={loggeado ? true : false} />
            <div className="entre_nav_turno"></div>
            <div className="contenedor_turno">
                <h3>Elige la especialidad que buscas:</h3>
                <select onChange={(e) => handleSelect(e)}>
                    <option value="" disabled selected>Especialidades</option>
                    {especialidades.map((e) => (
                        <option value={e.id}> {e.nombre} </option>
                    ))}
                </select>
                <br></br>
                <h3>A que clinica asistiras?</h3>
                <select onChange={(e) => handleSelectClinica(e)}>
                    <option value="" disabled selected>Clinicas</option>
                    {clinicasDeEspe.clinicas && clinicasDeEspe.clinicas.map((e) => (
                        <option id="clinica_selected" value={e.id}> {e.nombre} </option>
                    ))}
                </select>
                <h3>Selecciona el Doctor: </h3>
                <select onChange={(e) => handleSelectDoc(e)}>
                    <option value="" disabled selected>Doctores</option>
                    {doctoresDeEspe && doctoresDeEspe.map((e) => (
                        <option id="doctor_selected" value={e.nombre}> {e.nombre} </option>
                    ))}
                </select>
                <div>
                    {idValue.idDoctor !== '' ?
                        <div>
                            <h3>Selecciona el dia: </h3>
                            <div className='calendarioContainer'>
                                <Calendar
                                    onChange={onChange}
                                    value={date}
                                    onClickDay={(value, event) => validateDate(value)}
                                />
                            </div>
                            <h3>Y horario: </h3>
                            <select onChange={(e) => handleSelectHora(e)}>
                                <option value="" disabled selected>Horarios</option>
                                {idValue.horarioDoctor && idValue.horarioDoctor.map((e) => (
                                    <option value={e}>{e}</option>
                                ))}
                            </select>
                            <button type="submit" >Crear turno</button>
                            <div className="entre_nav_turno"></div>
                            <div className="out_footer">
                                <Footer />
                            </div>
                        </div>
                        :
                        <div>
                            <div className="out_footer">
                            <Footer />
                            </div>
                            {/* <div className='calendarioContainer'>
                                <Calendar
                                    onChange={onChange}
                                    value={date}
                                    onClickDay={(value, event) => validateDate(value)}
                                />
                                <div className="entre_nav_turno"></div>
                                <div className="out_footer">
                                    <Footer />
                                </div>
                            </div> */}
                        </div>
                    }
                </div>
            </div>
        </form>
    )
}
