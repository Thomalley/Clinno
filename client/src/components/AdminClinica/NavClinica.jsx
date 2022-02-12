import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import logo from '../../components/utils/images-landing/logo.png'
import Cookies from 'universal-cookie';

import './NavClinicaStyle.css';


export default function LoginClinica(){
    const cookies = new Cookies();

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

        swal("Has cerrado la sesion con explito!!", "En instantes seras redirigido a Inicio", "success");
        setTimeout(()=> window.location.href='/', 700) ;
    }

return (
    <main>        
        <div className="d-flex flex-column align-items-center flex-shrink-0 p-3 text-white bg-dark nav_clinica" >
            <Link to="/adminClinica" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none ">
                {/* <span className="fs-4">Sidebar</span> */}
                <img src={logo} className='logo_clinno_navC' />
            </Link>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto ">
                <li className="nav-item">
                    <Link to='/SoyDoctor' className="nav-link text-white boton_nav_clinica" aria-current="page">Soy Doctor</Link>
                </li>
                <li>
                    <Link to='/' className="nav-link text-white boton_nav_clinica">Volver a home</Link>
                </li>
                <li>
                    <Link to='/' className="nav-link text-white boton_nav_clinica">Hacer un turno</Link>
                </li>
                <li>
                    <Link  to='/AddDoctor' className="nav-link text-white boton_nav_clinica">Agregar Doctor</Link>
                </li>
                {/* <li>
                    <Link  to='/AddEspecialidad' className="nav-link text-white boton_nav_clinica">Agregar Especialidad</Link>
                </li> */}
                <li>
                    <Link to='/verDoctores' className="nav-link text-white boton_nav_clinica">Ver Doctores</Link>
                </li>
                <li>
                    <Link to='/estadisticas' className="nav-link text-white boton_nav_clinica">Ver Estadisticas</Link>
                </li>
                <li>
                    <Link  to='/' className="nav-link text-white boton_nav_clinica">Ver Email pacientes</Link>
                </li>
            </ul>
            <hr/>
            <div className="dropdown d-flex  align-items-end justify-conter-end ">
                <a href="#" className="d-flex align-items-center justify-conter-center text-white btn btn-primary dropdown-toggle dropdown-toggle-split" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    {/* <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/> */}
            
                    <strong>{cookies.get('clinica_nombre')}</strong>
                </a>

                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <button className="btn btn-primary dropdown-item" type="button" onClick={cerrarSesion}>Cerrar sesion</button>                    
                    {/* <li><a className="dropdown-item" href="#">New project...</a></li> */}
                    {/* <li><a className="dropdown-item" href="#">Settings</a></li> */}
                    {/* <li><a className="dropdown-item" href="#">Profile</a></li> */}
                    <li><hr className="dropdown-divider"/></li>
                    <li><Link to="/adminClinica/me" className="dropdown-item" href="#">Ver Mi Pefil</Link></li>
                </ul>
            </div>
        </div>
    </main>  
)}