import React,{ useState } from "react";
import {Link} from 'react-router-dom';
import './NavBarStyle.css';
import logo from "../utils/images-landing/logo.png"

export default function NavBar(){

    //local storage determinara luego
    const [loggeado,setLoggeado] = useState(true);


    return(
        <div className="">            
            <nav className=" navbar fixed-top  navbar-expand-lg navbar-light bg-light contenedor_navBar ">
                <div className="container-fluid">
                    <div>
                        <Link className="navbar-brand" to='/home'>
                                <img src={logo} className="img-logo" alt="logo"/>
                        </Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active  item_navBar" href='#nosotros'>Nosotros</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active item_navBar" href='#doctores'>Doctores</a>
                            </li>
                            {   loggeado?
                                <>
                                <li className="nav-item item_navBar">                    
                                    <Link className="nav-link active item_navBar" to='/register'>Register</Link>
                                </li>
                                <li className="nav-item item_navBar"> 
                                    <Link className="nav-link active item_navBar" to='/login'>Login</Link>
                                </li></>
                                : <>
                                <li className="nav-item">                    
                                    <button className="nav-link active item_navBar" >Cerrar sesion</button>
                                </li>
                                <li className="nav-item"> 
                                    <Link className="nav-link active item_navBar " to='/perfil'>Mi Perfil</Link>
                                </li></>
                            }
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}