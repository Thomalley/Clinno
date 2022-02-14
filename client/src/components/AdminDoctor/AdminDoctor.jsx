import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from '../AdminClinica/NavClinica.jsx'
import { validate_doctor,get_doctor_id,getTurnosDoctor,getClients,getEspecialidad,getClinicas} from '../../actions'
import VerMisTurnos from "./VerMisTurnos";
import icono from '../../components/utils/icono-clinica.png'

import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";
import "./AdminDoctorStyle.css";



export default function AdminDoctor(){
    
    useEffect(()=>{
        console.log(turnos)
        if(cookies.get('doctor_id')){
            dispatch(getTurnosDoctor(cookies.get('doctor_id')))
            dispatch(getClinicas())
            dispatch(getClients())
            dispatch(getEspecialidad())
            console.log('funca');
            setTurn(turnos);
        }
    },[])

    const cookies = new Cookies();
    const dispatch = useDispatch();
    const doctor = useSelector((state)=> state.doctor);
    const turnos = useSelector((state)=> state.turnos);
    const especialidades = useSelector((state)=> state.especialidades);
    const cliente = useSelector((state)=> state.clientes);
    
    const [turn,setTurn] = useState([]);
    
    // useEffect(()=>{
    //     if(turnos){
    //         setTurn(turnos);
    //     }else{
    //         dispatch(getTurnosDoctor(cookies.get('doctor_id')))
    //         dispatch(getClinicas())
    //         dispatch(getClients())
    //         dispatch(getEspecialidad())
    //         console.log('funca');
    //         setTurn(turnos);
    //     }
    // },[turnos])

    useEffect(()=>{
        if( cookies.get('doctor_id') ){
            dispatch(get_doctor_id(cookies.get('doctor_codigo')));
        }else{
            setCheck(false);
        }
    },[])
    //control se dession Clinica
    let session=false;
    if(cookies.get('clinica_id')) session = true; 
    const [loggeado,setLoggeado] = useState(session);

    //control sesion Doctor
    let sessionD=false;
    if(cookies.get('doctor_id')) sessionD = true;    
    const [check,setCheck] = useState(sessionD);

    const [input, setInput] = useState({
        password : '',
        idClinica:cookies.get('clinica_id')
    });

    function handleSubmit(e){
        e.preventDefault();
        dispatch(validate_doctor(input))
        logear()
    }
    function logear(){
        if( doctor.length >0){
            const data = doctor[0];
            cookies.set('doctor_id', data.id, {path: '/'});
            cookies.set('doctor_nombre', data.nombre, {path: '/'});
            cookies.set('doctor_codigo', data.codigo, {path: '/'});
            cookies.set('doctor_especialidades', data.especialidades, {path: '/'});
            setInput({password : ''})
            dispatch(get_doctor_id(cookies.get('doctor_codigo')));
            // swal("Bienvenido!", "Hola Doc", "success")
            setCheck(true)
        }
        else{
            swal({
                title: "Usuario o contrasena incorrectos",
                text: "Ingrese los datos e intente nuevamente",
                icon: "warning",
                dangerMode: true,
            })          
        }
    }
    
    useEffect(() => {
        if(!cookies.get('doctor_id')){
            dispatch(validate_doctor(input));
        }
    },[input])
    
    
    function handleChange(e){
        setInput({
            ...input,
            password : e.target.value,
            idClinica:cookies.get('clinica_id')
        });
    }
    function verTurnos(){
        return(<VerMisTurnos/>)
    }

    if(loggeado){
        return(
            <div>
                {  !check?
                <div className="background_doc">
                    <div className="row d-flex flex-column gap-3 contenedor_Doctor">
                        <div className="contedor_doc_but">
                            <Link to="/adminClinica"><img src={logo} alt="logo Clinno"  className="logo_clinno_navC"/></Link>
                            <form className="Form_doc" onSubmit={(e)=> handleSubmit(e)}>
                                <h3>Bienvenido Doctor</h3>
                                <h4>Por favor ingrese su codigo:</h4>
                                <div className="d-flex flex-column gap-3">
                                    <input type='text' value={input.password }placeholder="Ingrese su Codigo aqui." onChange={(e)=>handleChange(e)} />
                                    <button
                                        type="submit"
                                        className="btn btn-primary">Continuar</button>
                                    <div><Link to='/verDoctores' >No Te Acordas tu Codigo?</Link></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                    :
                <>
                    <div className="contenedor_adminClinica">
                        <NavClinica/>
                    <div className="adminClinica_presentacion"> 
                        <img src={icono} alt="hospital" className="logo_hospi_clinic"/>
                        <h1>Bienvenido {doctor[0]?.nombre}</h1>
                        <h6>Codigo {doctor[0]?.codigo}</h6>
                        <h6>Especialista en:  </h6>
                        <div>{doctor[0]?.especialidades.map(e=>{return<p>{e.nombre}</p>})}</div>
                    </div>
                    <hr/>
                        <button onClick={verTurnos} className="btn_clinic" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Ver Turnos</button>
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                            <div class="card card-body render_turno">
                                <VerMisTurnos/>
                            </div>
                        </div>
                    
                    </div>

                    <Footer />
                </>
                }
    
            </div>
        )
    }else{
        window.location.href='/loginClinica';
    }
}