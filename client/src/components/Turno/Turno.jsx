import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie'
import { getEspecialidad, getClinicasByEspec, getDoctoresByEspec } from '../../actions'
import swal from 'sweetalert';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './calendario.css'


export default function Turno() {
    const especialidades = useSelector((state) => state.especialidades)
    const clinicasDeEspe = useSelector((state) => state.clinicasByEspec)
    const doctoresDeEspe = useSelector((state) => state.doctoresByEspec)
    const dispatch = useDispatch();
    const [idValue, setidValue] = useState({
        idEspecialidad: "",
        idClinica: "",
        doctor: [],   //falta pasar tambien el id
        fecha: "",
        hora: ""
    })
    const cookies = new Cookies()
    const [date, setDate] = useState(new Date());
    const [fecha, setFecha] = useState({
        fecha: undefined
    })
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
        finalDate = diaTurno + '/' + mesTurno + '/' + yearTurno;
        setFecha({ fecha: finalDate })
    }


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
        setidValue({
            ...idValue,
            doctor: e.target.value.split(',').map((e) => parseInt(e))
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

    function handleSubmit(e){
        e.preventDefault()
    }

    return (
        <div>
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
                {clinicasDeEspe.clinicas && clinicasDeEspe.clinicas.map((e)=>(
                    <option value={e.id}> {e.nombre} </option>
                ))}
            </select>
            <h3>Selecciona el Doctor: </h3>
            <select onChange={(e) => handleSelectDoc(e)}>
                <option value="" disabled selected>Doctores</option>
                {doctoresDeEspe && doctoresDeEspe.map((e) => (
                    <option value={e.especialidads[0].horario}> {e.nombre} </option>
                ))}
            </select>
            <h3>Selecciona el dia: </h3>
            <div>
                {fecha.fecha !== undefined ?
                    <div>
                        <div className='calendarioContainer'>
                            <Calendar
                                onChange={onChange}
                                value={date}
                                onClickDay={(value, event) => validateDate(value)}
                            />
                        </div>
                        <h3>Selecciona el Horario: </h3>
                        <select>
                            <option value="" disabled selected>Horarios</option>
                            {idValue.doctor && idValue.doctor.map((e)=>(
                                <option value={e}>{e}</option>
                            ))}
                        </select>
                    </div>
                    :
                    <div className='calendarioContainer'>
                        <Calendar
                            onChange={onChange}
                            value={date}
                            onClickDay={(value, event) => validateDate(value)}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

//manejar datos de clinica de espe