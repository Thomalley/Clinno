import React,{ useState,useEffect } from "react";
import {Link,useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from 'universal-cookie'

import logo from '../../components/utils/images-landing/logo.png'
import usuario from '../../components/utils/images-landing/usuario-sin-foto.png'

import './NavBarStyle.css';


const cookies = new Cookies()


export default function NavBar({loggin}){

    const {logout, isAuthenticated,isLoading,user} = useAuth0();

    // console.log("sesion iniciada por " + cookies.get('email'))
    
    // let session;
    // if(cookies.get('email')){
    //     session = true;
    // }else{
    //     console.log(isLoading)
    //     session = isLoading;
    // }
    
    const [loggeado,setLoggeado] = useState(loggin);


    
    
    // useEffect(()=>{
    //     setLoggeado(isAuthenticated);
    // },[isAuthenticated])

    // useEffect(()=>{
    //     if(cookies.get('email')){
    //         setLoggeado(true);
    //     }else {
    //         setLoggeado(false);
    //     }
    // },[cookies.get('email')])

    const cerrarSesion=()=>{
        if(isAuthenticated){
            logout();
        }else{
            cookies.remove('email');
        }
        setLoggeado(false);
        window.location.href='./home';
    }

    // let navigate = useNavigate();
    return(
        <div className="">            
            <nav className=" navbar fixed-top  navbar-expand-lg navbar-light bg-light contenedor_navBar ">
                <div className="container-fluid">
                    <div>


                        <Link className="navbar-brand logo-container_home" to='/home'>
                                <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {window.location.pathname.toLowerCase() === '/home'?
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
                            
                            {   loggin?
                                <>
                                    <li className="nav-item">                    
                                        <button className="nav-link active item_navBar btn btn-outline border-start font_sesion" type="button" onClick={cerrarSesion}>Cerrar sesion</button>
                                    </li>
                                    {/* <li className="nav-item"> 
                                        <Link className="nav-link active item_navBar " to='/me'>Mi Perfil</Link>
                                    </li> */}
                                    <li className="nav-item">
                                        <Link to='/home' className="nav-link active  item_navBar" href='#nosotros'>{user?.name? user.name : cookies.get('nombre') }</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/home'><img className="usuario_navBar_imagen" src={user?.picture?user?.picture:usuario} alt="user"/></Link               >
                                    </li>
                                    
                                </>
                                : <>
                                    <li className="nav-item item_navBar">
                                        <Link className="nav-link active item_navBar" to='/register'>Register</Link>
                                    </li>
                                    <li className="nav-item item_navBar"> 
                                        <Link className="nav-link active item_navBar" to='/login'>Login</Link>
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