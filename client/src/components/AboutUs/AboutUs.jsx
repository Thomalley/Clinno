import './AboutUs.css';
import React from 'react';
import develop from '../LandingPage/utils/develop.json'
import img from'../LandingPage/utils/images-landing/usuario-sin-foto.png'
import slide1 from "../LandingPage/utils/images-landing/slide1.png"
import { Link } from 'react-router-dom';
import logo from '../LandingPage/utils/images-landing/logo.png'

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
        <div className="conteiner-devs">
                <h1>Desarrolladores</h1>
             <div className="develops"> 
                {develop.map((dev)=>(  <div className="container2"> <img id='sinfoto' src={img} alt={dev.name} /> <br/> <h4>{dev.name}</h4> <button className='btn btn-primary' id='btn'>{dev.git}</button> <button className='btn btn-primary' id='btn'>{dev.linkedin}</button> </div>      ))} 
            </div>
            <div className='foot'>
            <p className='rights'>© 2022 Clinno. All rights reserved</p>
            </div>
            </div>
        </div>
        </div>
    )
}