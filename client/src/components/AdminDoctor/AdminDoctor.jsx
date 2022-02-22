import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Footer from "../Home/Footer";
import swal from 'sweetalert';
import NavClinica from '../AdminClinica/NavClinica.jsx'
import { validate_doctor,get_doctor_id,getTurnosDoctor,getClients,getEspecialidad,getClinicas,getClinicaId} from '../../actions'
import icono from '../../components/utils/icono-clinica.png'
import ProximoTurno from './ProximoTurno'


import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";
import "./AdminDoctorStyle.css";



export default function AdminDoctor(){
    

    const cookies = new Cookies();
    const dispatch = useDispatch();
    const doctor = useSelector((state)=> state.doctor);
    const turnos = useSelector((state)=> state.turnos);
    const clinica = useSelector((state)=> state.clinicaById);
    const especialidades = useSelector((state)=> state.especialidades);
    const cliente = useSelector((state)=> state.clientes);
    const initalState={
        nombre:'',
        trabaja:'',
        especialidad: '',
        codigo: '',
    }
    const [loading,setLoading] = useState(true);
    const [doc,setDoc] = useState(initalState);
    useEffect(()=>{
        if(cookies.get('doctor_id')){
            dispatch(getTurnosDoctor(cookies.get('doctor_id')))
            dispatch(getClinicas())
            dispatch(getClients())
            dispatch(getEspecialidad())
            setTurn(turnos);
        }
    },[])

    useEffect(()=>{ 
        if(check){
            if(!clinica && loggeado){
                dispatch(getTurnosDoctor(cookies.get('doctor_id')))
                dispatch(getEspecialidad())
                dispatch(getClinicaId(cookies.get('clinica_id')))
            }else{
                    setDoc({...doc,
                        nombre: cookies.get('doctor_nombre'),
                        trabaja:clinica?.nombre,
                        especialidad: cookies.get('doctor_especialidades')[0]?.nombre,
                        codigo: cookies.get('doctor_codigo')
                    })
                }
            }
    },[clinica])
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

    
    const [turn,setTurn] = useState([]);

    const cerrarSesion=()=>{
        const cookies = new Cookies();
    
    
        cookies.remove('clinica_mail');
        cookies.remove('clinica_nombre');
        cookies.remove('clinica_telefono');
        cookies.remove('clinica_direccion');
        cookies.remove('clinica_id');
        cookies.remove('clinica_nombreEn', );
        cookies.remove('clinica_apellidoEn');
        cookies.remove('clinica_DNIEn');
        cookies.remove('clinica_codigo');
        cookies.remove('clinica_createdAt');
        cookies.remove('doctor_nombre');
        cookies.remove('doctor_id');
        cookies.remove('doctor_codigo');
        cookies.remove('doctor_especialidades');
    
        swal("Has cerrado la sesion con explito!!", "En instantes seras redirigido a Inicio", "success");
        setTimeout(()=> window.location.href='/', 2000) ;
    }

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
                title: "El código ingresado no corresponde a ningun doctor",
                text: "Verifique los datos e intente nuevamente",
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
                                </div>
                            </form>
                            <div>
                                <Link to='/SoyDoctor/forgotpassword' >No Te Acordas tu Codigo?</Link>
                                
                            </div>
                            <Link className="volver_inicio" to={'/'}>
                                <button className="btnLoggin_back">Volver a Inicio</button>
                            </Link>
                            <div>
                                <button className="btnLoggin_Cerrar" onClick={cerrarSesion}>Cerrar Sesion</button>
                            </div>
                        </div>
                    </div>
                </div>
                    :
                <>
                    <div className="contenedor_adminClinica">
                        <NavClinica/>
                    <div className="adminClinica_presentacion"> 
                        <img src={icono} alt="hospital" className="logo_hospi_clinic"/>
                        <h2>Bienvenido {cookies.get('doctor_nombre')}</h2>
                        <h6>Especialista en:  </h6>
                        <div>{cookies.get('doctor_especialidades')[0]?.nombre}</div>
                    </div>
                    <hr/>
                    <ProximoTurno/>
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