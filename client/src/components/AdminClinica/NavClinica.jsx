import React from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { useDispatch,  } from 'react-redux';
import logo from '../../components/utils/images-landing/logo.png'
import Cookies from 'universal-cookie';

import './NavClinicaStyle.css';


export default function LoginClinica(){
    const cookies = new Cookies();
    const dispatch = useDispatch();

    const cerrarSesion=()=>{

        cookies.remove('clinica_mail');
        cookies.remove('clinica_nombre');
        cookies.remove('clinica_telefono');
        cookies.remove('clinica_direccion');
        cookies.remove('clinica_id');
        cookies.remove('clinica_nombreEn', );
        cookies.remove('clinica_apellidoEn');
        cookies.remove('clinica_DNIEn');
        cookies.remove('clinica_createdAt');
        cookies.remove('doctor_nombre');
        cookies.remove('doctor_id');
        cookies.remove('doctor_codigo');
        cookies.remove('doctor_especialidades');

        swal("Has cerrado la sesion con explito!!", "En instantes seras redirigido a Inicio", "success");
        setTimeout(()=> window.location.href='/', 700) ;
    }

    const cerrarSD=()=>{
        cookies.remove('doctor_nombre');
        cookies.remove('doctor_id');
        cookies.remove('doctor_codigo');
        cookies.remove('doctor_especialidades');
        swal("Has cerrado la sesion con explito!!", "En instantes seras redirigido a Inicio", "success");
        window.location.href='/adminClinica';
        setTimeout(()=> window.location.href='/', 3000) ;
    }
return (
    <main>        
        <div className="d-flex flex-column align-items-center flex-shrink-0 p-3 text-white bg-dark nav_clinica" >
            <Link to="/adminClinica" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none ">
                {/* <span className="fs-4">Sidebar</span> */}
                <img src={logo} className='logo_clinno_navC' />
            </Link>
            <hr/>
            {window.location.pathname.toLowerCase().includes ('/soydoctor')?
                <ul className="nav nav-pills flex-column mb-auto ">
                    {/* <li className="nav-item">
                        <Link to='/SoyDoctor' className="nav-link text-white boton_nav_clinica" aria-current="page">Soy Doctor</Link>
                    </li> */}
                    {/* <li className="nav-item">
                        <Link to='/SoyDoctor/me' className="nav-link text-white boton_nav_clinica" aria-current="page">Ver Mis Datos</Link>
                    </li> */}
                    <li className="nav-item">
                        <button className="nav-link text-white boton_nav_clinica" aria-current="page" onClick={cerrarSD}>Cerrar sesion como Doctor</button>
                    </li>
                </ul>
            :
                <ul className="nav nav-pills flex-column mb-auto ">
                    <li className="nav-item">
                        <Link to='/SoyDoctor' className="nav-link text-white boton_nav_clinica" aria-current="page">Soy Doctor</Link>
                    </li>
                    <li>
                        <Link to={`/home/clinica/${cookies.get('clinica_id')}`} className="nav-link text-white boton_nav_clinica">Editar mi clinica en Clinno</Link>
                    </li>
                    {/* <li>
                        <Link to='/adminClinica' className="nav-link text-white boton_nav_clinica">Ver proximos turnos</Link>
                    </li> */}
                    <li>
                        <Link  to='/AddDoctor' className="nav-link text-white boton_nav_clinica">Agregar Doctor</Link>
                    </li>
                    <li>
                        <Link to='/verDoctores' className="nav-link text-white boton_nav_clinica">Ver Doctores</Link>
                    </li>
                    {/* <li>
                        <Link to='/estadisticas' className="nav-link text-white boton_nav_clinica">Ver Estadisticas</Link>
                    </li>
                    <li>
                        <Link  to='/' className="nav-link text-white boton_nav_clinica">Ver Email pacientes</Link>
                    </li> */}
                </ul>
            }
            
            <hr/>
                {!window.location.pathname.toLowerCase().includes('/soydoctor')?
            <div className="dropdown d-flex  align-items-end justify-conter-end ">
                <a href="#" className="d-flex align-items-center justify-conter-center text-white btn btn-primary dropdown-toggle dropdown-toggle-split" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <strong>{cookies.get('clinica_nombre')}</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <button className="btn btn-primary dropdown-item" type="button" onClick={cerrarSesion}>Cerrar sesion</button>                    
                    <li><hr className="dropdown-divider"/></li>

                    <li><Link to="/adminClinica/me" className="dropdown-item" href="#">Ver Mi Perfil</Link></li>


                </ul>
            </div>
            :
            <div className="dropdown d-flex  align-items-end justify-conter-end ">
                    <button className="btn btn-primary " type="button" onClick={cerrarSesion}>Cerrar sesion</button>
            </div>

                }
        </div>
    </main>  
)}