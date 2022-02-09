import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Calendario from './Calendario/Calendario.jsx'
import { getEspecialidad, getClinicas } from '../../actions'


export default function Turno() {
    const especialidades = useSelector((state) => state.especialidades)
    const clinicasDeEspe = useSelector((state) => state.clinicas)
    const dispatch = useDispatch();
    const [idEspecialidad, setidEspecialidad] = useState("")
    const [input, setInput] = useState({
        especialidad: '',
        clinica: '',
    })

    useEffect(() => {
        if (typeof (idEspecialidad) !== 'number') {
            especialidades.map((e) => {
                if (idEspecialidad.includes(e.nombre)) {
                    setidEspecialidad(e.id)
                }
            })
        }
    }, [idEspecialidad]);

    useEffect(() => {
        dispatch(getEspecialidad())
    }, [dispatch])

    useEffect(() => {
        dispatch(getClinicas(idEspecialidad))
    }, [idEspecialidad])

    function handleSelect(e) {
        setidEspecialidad(e.target.value)
    }

    console.log(idEspecialidad)

    return (
        <div>
            <h3>Elige la especialidad que buscas:</h3>
            <select onChange={(e) => handleSelect(e)} value={input.especialidad}>
                <option value="" disabled selected>Especialidades</option>
                {especialidades.map((e) => (
                    <option value={e.nombre}> {e.nombre} </option>
                ))}
            </select>
            <br></br>
            <h3>A que clinica asistiras?</h3>
            <select>
                <option value="" disabled selected>Clinicas</option>
                {clinicasDeEspe.clinicas && clinicasDeEspe.clinicas.map((e) => (
                    <option value={e.nombre}> {e.nombre} </option>
                ))}
            </select>
            <h3>Selecciona el dia y horario: </h3>
            <Calendario />
        </div>
    )
}

//manejar datos de clinica de espe