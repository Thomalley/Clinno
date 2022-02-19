import React,{ useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from 'universal-cookie'
import usuario from '../../components/utils/images-landing/usuario-sin-foto.png'
import logo from "../utils/images-landing/logo.png"
import swal from 'sweetalert';

import './NavBarStyle.css';




const cookies = new Cookies()


export default function NavBar({loggin}){
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const {logout, isAuthenticated,user} = useAuth0();

        
    const [loggeado,setLoggeado] = useState(loggin);
    
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

    const cerrarSesions=()=>{
        if(isAuthenticated){
            logout();
        }else{
            cookies.remove('email');
            cookies.remove('nombre');
            cookies.remove('apellido');
            cookies.remove('direccion');
            cookies.remove('id');
            cookies.remove('dni', );
            cookies.remove('admin');
            cookies.remove('createdAt');
        }
        setLoggeado(false);
        setTimeout(()=> window.location.href='/', 0);
    }

    return(
        <div className="">            
            <nav className=" navbar fixed-top  navbar-expand-lg navbar-light  contenedor_navBar ">
                <div className="container-fluid">
                    <div>
                        <Link className="navbar-brand logo-container_home" to='/'>
                                <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <button className="navbar-toggler" type="button" 
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {window.location.pathname.toLowerCase().includes ('/home/clinica')?
                             <>
                                <li className="nav-item">
                                    <a className="nav-link active  item_navBar" href='#nosotros'>Nosotros</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active item_navBar" href='#doctores'>Doctores</a>
                                </li>
                             </>
                             :<>
                            </>}
                            
                            {   
                                !cookies.get('clinica_id')?
                                loggin? 
                                <> 
                                    <li className="nav-item item_navBar">
                                        <Link className="nav-link active item_navBar" to='/turno'>Sacar un Turno</Link>
                                    </li>
                                    <li className="nav-item item_season">                    
                                        <button 
                                            className="nav-link active item_navBar btn btn-outline border-start font_sesion" 
                                            type="button" 
                                            onClick={cerrarSesions}
                                        >Cerrar sesion</button>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/me' 
                                            className="nav-link active  item_navBar" 
                                            href='#nosotros'
                                        >{user?.name? user.name : cookies.get('nombre') }</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/me'>
                                            <img className="usuario_navBar_imagen" 
                                            src={user?.picture?user?.picture:usuario} 
                                            alt="user"/></Link>
                                    </li>
                                    
                                </>
                                : <>                                    
                                    <li className="nav-item item_navBar">
                                        <Link className="nav-link active item_navBar" to='/adminClinica'>Soy Clinica</Link>
                                    </li>
                                    <li className="nav-item item_navBar">
                                        <Link className="nav-link active item_navBar" to='/register'>Regístrate</Link>
                                    </li>
                                    <li className="nav-item item_navBar"> 
                                        <Link className="nav-link active item_navBar" to='/login'>Iniciar sesión</Link>
                                    </li>
                                </>
                            :
                               <>
                                    <li className="nav-item item_navBar">
                                        <Link className="nav-link active item_navBar" to='/adminClinica'>Ir a Clinica</Link>
                                    </li>
                                    <li className="nav-item item_navBar">
                                        <Link className="nav-link active item_navBar" to='/soyDoctor'>Ir a Soy Doctor</Link>
                                    </li>
                                    <li className="nav-item item_season">                    
                                        <button 
                                            className="nav-link active item_navBar btn btn-outline border-start font_sesion" 
                                            type="button" 
                                            onClick={cerrarSesion}
                                        >Cerrar sesion</button>
                                    </li>
                               </>     
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}