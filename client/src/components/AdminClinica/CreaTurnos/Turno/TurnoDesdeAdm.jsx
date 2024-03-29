import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie'
import { getEspecialidad, getDoctoresByEspec, crearTurno, getDisponibilidad, getClinicaId } from '../../../../actions'
import swal from 'sweetalert';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './calendario.css'
import './turno.css'


export default function TurnoDesdeAdm() {
    const especialidades = useSelector((state) => state.clinicaById)
    const doctoresDeEspe = useSelector((state) => state.doctoresByEspec)
    const horariosDispoDoc = useSelector((state) => state.horarioDisponibleParaTurno)
    const dispatch = useDispatch()
    const cookies = new Cookies()
    const idClinica = cookies.get("clinica_id")
    const dniUser = cookies.get('dni_new_client')
    const [idValue, setidValue] = useState({
        idEspecialidad: "",
        idClinica: idClinica,
        horarioDoctor: [],
        idDoctor: "",
        fecha: "",
        hora: "",
        dniCliente: dniUser
    })
    const jsdate = new Date();
    const jsFinalDate = `${jsdate.getDate()}-${jsdate.getMonth() + 1}-${jsdate.getFullYear()}`;
    const [date, setDate] = useState(new Date());
    const onChange = date => {
        setDate(date)
    }
    let diaTurno = undefined;
    let mesTurno = undefined;
    let yearTurno = undefined;
    var finalDate = undefined;
    const [submit, setSubmit] = useState({ canSubmit: undefined })
    // const [hasClinic, setHasClinic] = useState({ clinic: true })
    const [hasDoctor, setHasDoctor] = useState({ doctor: true })
    // const [hasHorario, setHasHorario] = useState({ horario: true }) // implementar en caso de dia sin turnos
    const [errors, setErrors] = useState({})
    var [progressTur, setProgressTur] = useState({ "width": "0%" })

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
        if (finalDate < jsFinalDate){
            swal("Error al seleccionar dia", "La fecha seleccionada no esta disponible (Dia acontecido)", "warning")
            return
        }
        setidValue({ ...idValue, fecha: finalDate })
        setProgressTur({
            ...setProgressTur,
            "width": "80%"
        })

    }

    useEffect(()=>{
        dispatch(getClinicaId(idClinica))
    },[])

    // useEffect(() => {
    //     if (!userLog) {
    //         setLoggeado(false)
    //     }
    //     else setLoggeado(true)
    // }, [])

    useEffect(() => {
        if (idValue.fecha) {
            dispatch(getDisponibilidad(idValue.fecha, idValue.idDoctor))
            validateInfo()
        }
    }, [idValue.fecha])

    // useEffect(() => {
    //     userLog ? setLoggeado(true) : setLoggeado(false)
    // }, [])

    useEffect(() => {
        dispatch(getEspecialidad())
    }, [])

    // useEffect(() => {
    //     dispatch(getClinicasByEspec(idValue.idEspecialidad))
    //     if (clinicasDeEspe.clinicas && clinicasDeEspe.clinicas.length < 1) {
    //         setHasClinic({ clinic: false })
    //         setErrors({ ...errors, clinica: true })
    //     }
    //     else {
    //         setHasClinic({ clinic: true })
    //         setErrors({ ...errors, clinica: false })
    //     }
    // }, [idValue.idEspecialidad])

    useEffect(() => {
        dispatch(getDoctoresByEspec(idValue))
        // if (idValue.idClinica && doctoresDeEspe.length < 1) {
        //     setHasDoctor({ doctor: false })
        //     setErrors({ ...errors, doc: true })
        // }
        // else {
            setHasDoctor({ doctor: true })
            setErrors({ ...errors, doc: false })
        // }
    }, [idValue.idEspecialidad])


    function handleSelect(e) {
        setidValue({
            ...idValue,
            idEspecialidad: e.target.value
        })
        setProgressTur({
            ...setProgressTur,
            "width": "20%"
        })
    }

    // function handleSelectClinica(e) {
    //     setidValue({
    //         ...idValue,
    //         idClinica: e.target.value
    //     })
    //     setProgressTur({
    //         ...setProgressTur,
    //         "width": "40%"
    //     })
    // }

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
        setProgressTur({
            ...setProgressTur,
            "width": "60%"
        })
    }

    function handleSelectHora(e) {
        setidValue({
            ...idValue,
            hora: e.target.value
        })
        setProgressTur({
            ...setProgressTur,
            "width": "100%"
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        // if (loggeado === false) {
        //     setErrors({ ...errors, login: false })
        //     return swal("No estas Logueado!", "Por favor inicie sesion para registrar su turno", "warning")
        // }
        if (submit.canSubmit === true) {
            dispatch(crearTurno(idValue))
            return swal({
                title: "Turno creado correctamente!",
                text: `El turno para el paciente se agendo correctamente para el dia ${idValue.fecha}, a las ${idValue.hora}Hs `,
                icon: "success",
                buttons: {
                    text: "Volver a inicio"
                }
            }) 
                .then((value) => {
                    switch (value) {
                        case "text":
                            swal("En instantes seras redirigido a inicio..", {});
                            setTimeout(() => window.location.href = '/adminClinica', 2000)
                            break
                        default: return
                    }
                });
        }
        else if (submit.canSubmit === false)
            return swal("No se ha podido registrar su turno", "Por favor complete todos los campos e intente nuevamente", "warning")
    }

    function validateInfo() {
        if (idValue.idEspecialidad.length < 1 ||
            // idValue.idClinica.length < 1 ||
            idValue.idDoctor.length < 1 ||
            idValue.horarioDoctor.length < 1 ||
            idValue.fecha.length < 1 ||
            idValue.hora.length < 1
        )
            setSubmit({ canSubmit: false })
        else
            setSubmit({ canSubmit: true })
    }

    console.log(idValue)
    console.log(doctoresDeEspe)

    return (
        <div className=".container">
            <form onSubmit={handleSubmit}>
                {/* <NavBar loggin={loggeado ? true : false} /> */}
                <div class="progress" id='progressTurn' style={progressTur}>
                    <div class="progress-bar bg-info" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="entre_nav_turno"></div>
                <div className="container">
                    <div className="contenedor_turno">

                        <div className="row">
                            <div className="col-12">
                                <div className="titleTurn">
                                    <h2 className="display-4" id="title_turn_id">Sacar turno desde Administracion</h2>
                                    <h6 className="display-4" id="aboveTitle_turn_id">Facil, rapido y en el momento</h6>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="cont_tur_BG">

                                    <h3 className="display-6" id="Esp_Tur_Crea">Elige la especialidad que buscas:</h3>
                                    <select id='Sel_Tur_Crea_Esp' class="form-select" aria-label="Default select example" onChange={(e) => handleSelect(e)}>
                                        <option value="" disabled selected>Especialidades</option>
                                        {especialidades.especialidads && especialidades.especialidads.map((e) => (
                                            <option value={e.id}> {e.nombre} </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                        </div>
                        {
                            // hasClinic.clinic === true ?
                                // <div className="row">
                                //     <div className="col-12">
                                //         <div className="cont_tur_BG">
                                //             <h3 className="display-6" id="Cli_Tur_Crea">A que clinica asistiras?</h3>
                                //             <select id='Sel_Tur_Crea_Cli' class="form-select" aria-label="Default select example" onChange={(e) => handleSelectClinica(e)}>
                                //                 <option value="" disabled selected>Clinicas</option>
                                //                 {clinicasDeEspe.clinicas && clinicasDeEspe.clinicas.map((e) => (
                                //                     <option id="clinica_selected" value={e.id}> {e.nombre} </option>
                                //                 ))}
                                //             </select>
                                //         </div>
                                //     </div>
                                // </div>
                                // :

                                //arreglar render

                                // <div className="row">
                                //     <div className="col-12">
                                //         <div className="cont_tur_BG">
                                //             <h3 className="display-6" id="Cli_Tur_Crea">A que clinica asistiras?</h3>
                                //             <div class="alert alert-warning" role="alert">
                                //                 Actualmente no contamos con Clinicas de la especialidad seleccionada
                                //             </div>
                                //         </div>
                                //     </div>
                                // </div>
                                // <div className="row">
                                //     <div className="col-12">
                                //         <div className="cont_tur_BG">
                                //             <h3 className="display-6" id="Cli_Tur_Crea">A que clinica asistiras?</h3>
                                //             <select id='Sel_Tur_Crea_Cli' class="form-select" aria-label="Default select example" onChange={(e) => handleSelectClinica(e)}>
                                //                 <option value="" disabled selected>Clinicas</option>
                                //                 {clinicasDeEspe.clinicas && clinicasDeEspe.clinicas.map((e) => (
                                //                     <option id="clinica_selected" value={e.id}> {e.nombre} </option>
                                //                 ))}
                                //             </select>
                                //         </div>
                                //     </div>
                                // </div>
                        }

                        {hasDoctor.doctor === true ?

                            <div className="row">
                                <div className="col-12">
                                    <div className="cont_tur_BG">
                                        <h3 className="display-6" id="Doc_Tur_Crea">Selecciona el Doctor: </h3>
                                        <select id='Sel_Tur_Crea_Doc' class="form-select" aria-label="Default select example" onChange={(e) => handleSelectDoc(e)}>
                                            <option value="" disabled selected>Doctores</option>
                                            {doctoresDeEspe && doctoresDeEspe.map((e) => (
                                                <option id="doctor_selected" value={e.nombre}> {e.nombre} </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            :

                            //Arreglar render

                            // <div className="row">
                            //     <div className="col-12">
                            //         <div className="cont_tur_BG">
                            //             <h3 className="display-6" id="Doc_Tur_Crea">Selecciona el Doctor: </h3>
                            //             <div class="alert alert-warning" role="alert">
                            //                 Actualmente no contamos con Doctores disponibles de la clinica seleccionada
                            //             </div>
                            //         </div>
                            //     </div>
                            // </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="cont_tur_BG">
                                        <h3 className="display-6" id="Doc_Tur_Crea">Selecciona el Doctor: </h3>
                                        <select id='Sel_Tur_Crea_Doc' class="form-select" aria-label="Default select example" onChange={(e) => handleSelectDoc(e)}>
                                            <option value="" disabled selected>Doctores</option>
                                            {doctoresDeEspe && doctoresDeEspe.map((e) => (
                                                <option id="doctor_selected" value={e.nombre}> {e.nombre} </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="row">
                            <div className="col-12">
                                <div className="cont_tur_BG">
                                    <div>
                                        <h3 className="display-6" id="Dia_Tur_Crea">Selecciona el dia: </h3>
                                        <div class="accordion accordion-flush" id="acordeao">
                                            <div class="accordion-item" id="Sel_Tur_Crea_Dia">
                                                <h2 class="accordion-header" id="flush-headingOne">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                        Abrir calendario
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                    <div className='calendarioContainer'>
                                                        <Calendar
                                                            onChange={onChange}
                                                            value={date}
                                                            onClickDay={(value, event) => validateDate(value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="cont_tur_BG">
                                        <h3 className="display-6" id="Hor_Tur_Crea">Horario: </h3>
                                        <select id="Sel_Tur_Crea_Hora" class="form-select" aria-label="Default select example" onChange={(e) => handleSelectHora(e)}>
                                            <option value="" disabled selected>{`Horarios disponibles el ${idValue.fecha.replace('-', '/')}`}</option>
                                            {horariosDispoDoc && horariosDispoDoc.map((e) => (
                                                <option value={e}>{e}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {
                                errors.doc ?
                                    <div className="row">
                                        <div className="col-12">
                                            <div>
                                                <div class="alert alert-danger" role="alert">
                                                    Revisa los errores antes de continuar
                                                </div>
                                                <Link to={'/home'}>
                                                    <button id="But_bottom_Tur" className="btn btn-secondary">Volver a inicio</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="row">
                                        <div className="col-12">
                                            <div>
                                                <button onClick={() => validateInfo()} id="But_bottom_Tur" class="btn btn-success" type="submit" >Crear turno</button><br />
                                                <Link to={'/adminClinica'}>
                                                    <button id="But_bottom_Tur" className="btn btn-secondary">Volver a inicio</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
                <div className="entre_nav_turno"></div>
                <div className="out_footer">
                </div>
            </form>
        </div>
    )
}
