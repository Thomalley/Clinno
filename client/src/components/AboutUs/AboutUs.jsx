import './AboutUs.css';
import React from 'react';
import develop from '../utils/develop.json'
import img from'../utils/images-landing/usuario-sin-foto.png'
import slide1 from "../utils/images-landing/slide1.png"
import { Link } from 'react-router-dom';
import logo from '../utils/images-landing/logo.png'
import Demo from "../Demo/Demo";

export default function AboutUs(){



    return(
        <div className='container1234'>
        <nav class="navbar sticky-top navbar-light bg-light">
        <Link className="navbar-brand" to='/'>
        <img className="imglogoR" src={logo} alt="nf" />
        </Link>
        </nav>
        <img className="imgAbout" src={slide1} alt="nf" />
        <div className='second'>
        <div className='AboutUs'>
        <div className="top-slice">
        <div className="text-conteiner1">
          <img src={logo} alt="logo" />
          <p>
            {" "}
            Es la solución ideal para grupos médicos que desean utilizar un
            sistema de citas electrónico en linea, administrándolos
            eficientemente de forma colaborativa, ágil y sencilla.
          </p>
          <h3>¡Lleva un mejor control de los clientes de tu clínica!</h3>
        </div>
        </div>
        </div>
        <div className="conteiner-devs">
                <h1>Desarrolladores</h1>
             <div className="develops"> 
                {develop.map((dev)=>(  <div className="container2"> <img id='sinfoto' src={img} alt={dev.name} /> <br/> <h4>{dev.name}</h4> <button className='btn btn-primary' id='btn'>{dev.git}</button> <button className='btn btn-primary' id='btn'>{dev.linkedin}</button> </div>      ))} 
            </div>
            <div className='Tecnologias'>
            <div>JS</div>
            <div>REACT</div>
            <div>EXPRESS</div>
            </div>
            <Demo/>
            <div className='foot'>
            <p className='rights'>© 2022 Clinno. All rights reserved</p>
            </div>
            </div>
        </div>
        </div>
    )
}