
import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import swal from 'sweetalert';
import { getDiagnosticoByTurno,getDiagnostico,getTurnoId} from '../../actions'
import Footer from "../Home/Footer";
import NavClinica from '../AdminClinica/NavClinica.jsx';
import Turno from './TurnoConDiagnostico';

import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";



export default function VerDiagnosticoDoctor(){

    let { idTurno } = useParams();

    const turno = useSelector((state)=> state.turnoById);
    const diagDoc = useSelector((state)=> state.diagnosticos);

    useEffect(() => {
        dispatch(getTurnoId(idTurno));
        dispatch(getDiagnostico());
    }, []);

    

    console.log(diagDoc);
    const [diagnostico,setDiag] = useState([]);
    
    const cookies = new Cookies();
    const dispatch = useDispatch();
    
    // control de sesion
    let session=false;
    if(cookies.get('clinica_id')&&cookies.get('doctor_codigo')) session = true;
    const [loggeado,setLoggeado] = useState(session);


    
    console.log(turno);
    if(loggeado){

    return (
        <>
            <div className="contenedor_adminClinica">
                <NavClinica/>
                <h2>Funciono</h2>
                <div>
                    <h3>Datos del Turno:</h3>
                    <p>Fecha: {turno?.fecha}</p>
                    <p>Hora: {turno?.hora}</p>
                </div>


            </div>
            <Footer />
        </>
    )
    }else{
        cookies.get('clinica_codigo')?window.location.href='/loginClinica' :window.location.href='/soyDoctor';
    }
}