import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClienteByDni, getTurnosByDni, getDoctorById } from "../../../actions";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
// import swal from "sweetalert";
import './Validate.css'
import logo from '../../../components/utils/images-landing/logo.png'
// import UserProfile from '../../../components/utils/images-landing/usuario-sin-foto.png'


export default function ValidarUsuario() {

    const [input, setInput] = useState("");
    const dispatch = useDispatch()
    const cliente = useSelector((state) => state.clienteByDni)
    const docName = useSelector((state) => state.doctorId)
    const turnosByDni = useSelector((state) => state.turnosDni)
    const cookies = new Cookies();
    let dni_user = cookies.get('dni_new_client')
    const [turn, setTurn] = useState([]);

    useEffect(() => {
        if (cliente)
            dispatch(getTurnosByDni(input.input))
    }, [cliente])


    useEffect(() => {
        if (turn && turn.length !== 0) {
            const id = turn[0].idDoctor
            dispatch(getDoctorById(id))
        }
    }, [turn])

    useEffect(() => {
        if (turnosByDni && turnosByDni.length !== 0)
            setTurn(turnosByDni)
    }, [turnosByDni])

    turn && turn?.sort(function (a, b) {
        if (a.fecha < b.fecha) {
            return -1;
        }
        if (a.fecha > b.fecha) {
            return 1;
        }
        return (a.hora < b.hora) ? -1 : 1;

    })
    console.log(docName)

    // function validate() {
    //     if (cliente.length > 0) return true
    //     return swal("Cliente no existente", "", "warning")
    // }

    function handleOnChange(e) {
        setInput({
            ...input,
            input: e.target.value,
        });
    };

    function handleSubmit(e) {
        e.preventDefault()
        // cookies.set('dni_cliente_turno_adm', cliente[0] && cliente[0].dni, '/')
        dispatch(getClienteByDni(input.input))
    }

    function onRedirectTurno(){
        cookies.set("dni_new_client", cliente[0].dni, {path:'/'})
        setTimeout(()=> window.location.href="/adminClinica/cliente/turno", 2000)

    }

    return (
        <div className="definir">
            {
                (cliente.length >= 1 && cliente[0].id) ?
                    <div>

                        <nav id="nav_de_adm_dni" class="navbar sticky-top navbar-light bg-light">
                            <Link className="navbar-brand" to='/adminClinica'>
                                <img className="imglogoR" src={logo} alt="nf" />
                            </Link>
                        </nav>

                        <div className="container">
                            <div className="general_dni_cont">


                                <h2 className="title_dni_cli">Informacion del solicitante:</h2>

                                <div className="col-12">

                                    {/* <div className="img_dni_adm">
                                            <img className="userProf_dni" src={UserProfile} alt="nf" />
                                        </div> */}

                                    <div className="listado_info_dni">
                                        <h4><strong>Nombre:</strong> {cliente[0].nombre}</h4>
                                        <h4><strong>Apellido:</strong> {cliente[0].apellido}</h4>
                                        <h4><strong>Dni:</strong> {cliente[0].dni}</h4>
                                        <h4><strong>Correo electronico:</strong> {cliente[0].email}</h4>
                                        <h4><strong>Reside en:</strong> {cliente[0].direccion}</h4>
                                        <h4><strong>Proximo turno:
                                        </strong> {turn[0] ?
                                            `${turn[0].fecha} a las ${turn[0].hora}Hs, con el Doctor ${docName.nombre}`
                                            : "No hay registros de turnos"}
                                        </h4>
                                    </div>

                                    <br />
                                    <button id="btn_adm_cli_tur" className="btn btn-primary" onClick={onRedirectTurno}>Sacar turno</button>
                                    <br />
                                    <button id='back_dni_again' className="btn btn-info" onClick={() => window.location.href = '/adminClinica/cliente'} type="reset">Volver</button>
                                    <br />
                                    <Link to={'/adminClinica'}>
                                        <button className="btn btn-secondary">Volver a inicio</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="invi_foot_dni">
                            </div>
                        </div>

                    </div>
                    :
                    <div>
                        <nav id="nav_de_adm_dni" class="navbar sticky-top navbar-light bg-light">
                            <Link className="navbar-brand" to='/adminClinica'>
                                <img className="imglogoR" src={logo} alt="nf" />
                            </Link>
                        </nav>
                        <div className="container">
                            <div className="general_dni_cont">

                                <div className="row">
                                    <div className="col-12">
                                        <div className="title_dni">
                                            <h3>Buscar paciente por <strong>DNI</strong></h3>
                                            <form onSubmit={(e) => handleSubmit(e)}>
                                                {dni_user && dni_user.length >= 2 ?
                                                    <div>
                                                        <small id="emailHelp" class="form-text text-muted">DNI del usuario recien creado: {dni_user}</small>
                                                    </div>
                                                    :
                                                    <div>
                                                    </div>
                                                }
                                                <div className="input_btn_dni">
                                                    <input
                                                        type="text"
                                                        name="documento"
                                                        onChange={handleOnChange}
                                                        id={input}
                                                        placeholder="Nro de documento"
                                                    />
                                                    <button id="primary_dni_s" type="submit" className="btn btn-primary">Buscar</button>
                                                </div>
                                            </form>
                                            <div className="vuelve_inicio_adm_dni">
                                                <Link to={'/adminClinica'}>
                                                    <button className="btn btn-secondary">Volver a inicio</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div id="message_adm_dni" class="alert alert-warning alert-dismissible fade show" role="alert">
                                            <strong>Hola Administrador!</strong> Si el cliente no esta registrado aun, <a href="/adminClinica/cliente/registrar" class="alert-link">completa este formulario</a>.
                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="invi_foot_dni">
                        </div>
                    </div>
            }
        </div >
    )
}