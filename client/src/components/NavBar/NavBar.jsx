import React,{ useState } from "react";
import {Link} from 'react-router-dom';

export default function NavBar(){

    //local storage determinara luego
    const [loggeado,setLoggeado] = useState(true);


    return(
        <div className="container">
            <nav className=" navbar fixed-top  navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid">
                    <div>
                        <Link className="navbar-brand" to='/home'>
                                <button>Logo Clino!</button>
                        </Link>
                    </div>
                    <div>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <a className="nav-link active" href='#nosotros'>Nosotros</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href='#doctores'>Doctores</a>
                            </li>
                            {   loggeado?
                                <>
                                <li className="nav-item">                    
                                    <Link className="nav-link active" to='/register'>Register</Link>
                                </li>
                                <li className="nav-item"> 
                                    <Link className="nav-link active" to='/login'>Login</Link>
                                </li></>
                                : <>
                                <li className="nav-item">                    
                                    <button className="nav-link active" >Cerrar sesion</button>
                                </li>
                                <li className="nav-item"> 
                                    <Link className="nav-link active" to='/perfil'>Mi Perfil</Link>
                                </li></>
                            }
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}