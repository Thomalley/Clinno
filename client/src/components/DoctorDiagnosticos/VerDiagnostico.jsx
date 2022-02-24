
import React,{ useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { getDiagnosticoByTurno,getTurnoId} from '../../actions'
import Footer from "../Home/Footer";
import NavClinica from '../AdminClinica/NavClinica.jsx';

import logo from '../../components/utils/images-landing/logo.png'


import Cookies from 'universal-cookie';
import "../AdminClinica/AdminClinicaStyle.css";



export default function VerDiagnosticoDoctor(){

    let { idTurno } = useParams();

    const turno = useSelector((state)=> state.turnoById);
    // const diagDoc = useSelector((state)=> state.diagnosticos);
    const diagDoctor = useSelector((state)=> state.diagDoctor);

    useEffect(() => {
        dispatch(getTurnoId(idTurno));
        // dispatch(getDiagnostico());
        dispatch( getDiagnosticoByTurno(idTurno))
    }, []);

    const cookies = new Cookies();
    const dispatch = useDispatch();
    
    // control de sesion
    let session=false;
    if(cookies.get('clinica_id')&&cookies.get('doctor_codigo')) session = true;
    const [loggeado] = useState(session);


    
    // console.log(diagDoctor);
    if(loggeado){

    return (
        <>
            <div className="contenedor_adminClinica">
                <NavClinica/>
                <div className="contenedor_diag_compl" >
                    <div className="formu_complete_diag">
                        <img src={logo} alt="imagen" className='logo_clinno_navC' />
                        <div>
                            <h3>Datos del Turno:</h3>
                            <p>Fecha: {turno?.fecha}</p>
                            <p>Hora: {turno?.hora}</p>
                        </div>
                        <h3>Diagnostico</h3>
                        <div>
                            <div className="sostenedor">
                                <p><strong>Sintomas: </strong></p>
                                <p className="diagno_text_larg">{diagDoctor[0]?.sintomas}</p>
                            </div>
                            <div className="sostenedor"> 
                                <p><strong>Diagnóstico: </strong></p>
                                <p className="diagno_text_larg">{diagDoctor[0]?.diagnostico}</p>
                            </div>

                            <div> 
                                <p><strong>Indicaciones Medicas: </strong></p>
                                <p>{diagDoctor[0]?.indicaciones? diagDoctor[0].indicaciones : " -" }</p>
                            </div>
                            <div> 
                                <p><strong>Estudios: </strong></p>
                                <p>{diagDoctor[0]?.estudio? diagDoctor[0].estudio : " -" }</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
    }else{
        cookies.get('clinica_codigo')?window.location.href='/loginClinica' :window.location.href='/soyDoctor';
    }
}