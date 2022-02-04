import './AboutUs.css';
import React from 'react';
import develop from '../utils/develop.json'
import img from'../utils/images-landing/usuario-sin-foto.png'
import devs from "../utils/desarrolladores.png"
import { Link } from 'react-router-dom';
import logo from '../utils/images-landing/logo.png'
import Demo from "../Demo/Demo";
import NavLanding from '../NavLanding/NavLanding';

export default function AboutUs(){



    return(
      <div className='about-container'>
        <div className='container1234'>
          <NavLanding component="About"/>
        
        <img className="imgAbout" src={devs} alt="nf" />
        <div className='second'>
        <div className='AboutUs'>
       
        </div>
        <div className="conteiner-devs">
          <h3>Somos un equipo de programadores  que ofrecemos nuestros mejores conocimientos y experiencia, para conseguir que las clinicas de todo capital federal puedan realizar su parte administrativa de la forma más fácil y rápida posible.</h3>
               
             <div className="develops"> 
                {develop.map((dev)=>(  <div className="container2"> <img id='sinfoto' src={img} alt={dev.name} /> <br/> <h4>{dev.name}</h4> <button className='btn-social' id='btn'>{dev.git}</button> <button className='btn-social' id='btn'>{dev.linkedin}</button> </div>      ))} 
            </div>
            
            <div className="text-conteiner1">
          <img src={logo} alt="logo" />
          <p>
            
            Es la solución ideal para grupos médicos que desean utilizar un
            sistema de citas electrónico en linea, administrándolos
            eficientemente de forma colaborativa, ágil y sencilla.
          </p>
          <h3>¡Lleva un mejor control de los clientes de tu clínica!</h3>
        </div>
            <Demo/>

            <div className='Tecnologias'>
            <div>JS</div>
            <div>REACT</div>
            <div>EXPRESS</div>
            </div>
            <div className='foot'>
            <p className='rights'>© 2022 Clinno. All rights reserved</p>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}