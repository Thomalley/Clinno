import React from "react";
import logo from '../../components/utils/images-landing/logo.png'
import {Link} from 'react-router-dom';

import './HomeStyle.css';


export default function Footer(){

    return(<footer className="footer_home">
            <div className="">
                <p>Clinno App | © Copyright 2022 | Pagina Diseñada por <Link className="link" to='/aboutus#'>Nuestro team</Link> de desarrolladores</p>
            </div>
            <div>
                {/* <button className="btn btn-outline-secondary logo_clinno">Logo Clinno!</button> */}
                <Link className="navbar-brand logo-container_home logo_clinno" to='/home'>
                    <img src={logo} alt="logo" />
                </Link>
                <p ><Link className="texto_final" to="/login#">Login</Link>  | <Link className="texto_final#" to="/">Ladding Page </Link> | <Link  className="texto_final" to="/register#"> Registro </Link>  </p>
            </div>

        </footer>
    )
}