import React, {useEffect} from "react";
import logo from '../../components/utils/images-landing/logo.png'
import {Link} from 'react-router-dom';

import './FooterStyle.css';


export default function Footer(){
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return(<footer className="footer_home">
            <div className="">
                <p>Clinno App | © Copyright 2022 | Pagina Diseñada por <Link className="link" to='/aboutus#'>Nuestro team</Link> de desarrolladores</p>
            </div>
            <div>
                {/* <button className="btn btn-outline-secondary logo_clinno">Logo Clinno!</button> */}
                <Link className="navbar-brand logo-container_home logo_clinno" to='/'>
                    <img src={logo} alt="logo" />
                </Link>
                <p ><Link className="texto_final#" to="/aboutClinno"> Sobre Clino </Link> | <Link className="texto_final#" to="/adminClinica"> Soy Clinica </Link> </p>
            </div>

        </footer>
    )
}