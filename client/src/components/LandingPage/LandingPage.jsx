import React from "react";
import {Link} from 'react-router-dom';
import develop from "./utils/develop.json"
import './landing.css'
import img from'./utils/images-landing/usuario-sin-foto.png'
import img_doc from './utils/images-landing/doctora.png'
import logo from './utils/images-landing/logo.png'
import services from "./utils/services.json"
import pp from "./utils/images-landing/pp.png"
import slide1 from "./utils/images-landing/slide1.png"
import slide2 from "./utils/images-landing/slide2.png"
import slide3 from "./utils/images-landing/slide3.png"

export default function LandingPage(){
    return(

        
        <div className="container">
            <div className="logo-container">
                
                <img src={logo} alt="logo"/>
                


            </div>


            <div>
    
    <nav className="navbar navbar-light bg-light">
<div className="container-fluid">
<img src=".."alt=""/>
</div>
</nav>


<div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
<div className="carousel-indicators">
<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div className="carousel-inner">
<div className="carousel-item active">
  <img src={slide1} className="d-block w-100" alt="..."/>
  <div className="carousel-caption d-none d-md-block">
    <h5>SISTEMA DE CITAS EN LINEA</h5>
    <p>Some representative placeholder content for the first slide.</p>
  </div>
</div>
<div className="carousel-item">
  <img src={slide2} className="d-block w-100" alt="..."/>
  <div className="carousel-caption d-none d-md-block">
    <h5>Second slide label</h5>
    <p>Some representative placeholder content for the second slide.</p>
  </div>
</div>
<div className="carousel-item">
  <img src={slide3} className="d-block w-100" alt="..."/>
  <div className="carousel-caption d-none d-md-block">
    <h5>Third slide label</h5>
    <p>Some representative placeholder content for the third slide.</p>
  </div>
</div>
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
<span className="carousel-control-prev-icon" aria-hidden="true"></span>
<span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
<span className="carousel-control-next-icon" aria-hidden="true"></span>
<span className="visually-hidden">Next</span>
</button>
</div>
</div>

            
            <div className="top-slice">
            <div className="text-conteiner1">
            <img src={logo} alt="logo"/>
            <p> Es la solución ideal para grupos médicos que desean utilizar un sistema de citas electrónico en linea, administrándolos eficientemente de forma colaborativa, ágil y sencilla.

</p>
<h3>¡Lleva un mejor control de los clientes de tu clínica!</h3>
                </div>
             <div className="image-doc"><img src={img_doc} alt="doc"/></div>
                
            </div>

            <div className="mas-que"> 
            
          <h1>¿Que puedo hacer en <img src={logo} alt="logo"/>  ?</h1>
          <div className="services-content">

          {services.map((ser)=>(  
          <div className="servicios"><img src={pp} alt="pp"></img><h4>{ser.name}</h4> <p>{ser.servicio}</p> </div> ))}

            </div>      
            
            
            </div>
            <div className="que-hace">

                
            </div>
            <div className="live">

            <div className="text-live">
                <h2>Más que un sistema de reserva de citas </h2>
<h2>un sistema que mejora la relación con tus pacientes</h2></div>

                <div className="text-container2">
                    <h4>Ve a nuestra Demo Virtual :</h4>

            

                    

                <div class="d-grid gap-2 col-6 mx-auto">
                <Link to='/home'>
            <button class="btn btn-primary" type="button">LIVE DEMO </button>
            </Link>
        </div>

               
                
                

                </div>
            </div>
            <div className="conteiner-devs">
                <h1>Desarrolladores</h1>
             <div className="develops"> 
                {develop.map((dev)=>(  <div className="devs"> <img src={img} alt={dev.name} /> <h4>{dev.name}</h4> <button>{dev.git}</button> <button>{dev.linkedin}</button> </div>      ))}
                             
            </div>

            </div>

            <div className="nav-top">

                <h5>-Derechos resevados Clinno app -</h5>


            </div>



        

        </div>
            
        
        
    )
}