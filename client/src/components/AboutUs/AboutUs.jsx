import './AboutUs.css';
import React from 'react';
import { useState,useEffect  } from "react";
import develop from '../utils/develop.json'
import img from'../utils/images-landing/usuario-sin-foto.png'
import devs from "../utils/desarrolladores.png"
import { Link } from 'react-router-dom';
import logo from '../utils/images-landing/logo.png'
import Demo from "../Demo/Demo";
import NavLanding from '../NavLanding/NavLanding';
import js from "../utils/js.png"
import react from "../utils/react.png"
import github from "../utils/github.png"
import Footer from '../Home/Footer';
import NavBar from '../NavBar/NavBar';
import Cookies from 'universal-cookie'

import { useAuth0 } from "@auth0/auth0-react";


export default function AboutUs(){
  const cookies = new Cookies()

  const { isAuthenticated,isLoading} = useAuth0();


  
  let session;
  // console.log("sesion iniciada por " + cookies.get('email'))  
  if(cookies.get('email')){
      session = true;
  }else{
      session = isLoading;
  }
  const [loggeado,setLoggeado] = useState(session);
  //control de sesion
  useEffect(()=>{
    console.log(isLoading)
    if(cookies.get('email')){
        setLoggeado(true);
    }else {
        if(isAuthenticated){
            setLoggeado(true);
        }else{
            setLoggeado(false);
        }
    }
      
  },[isLoading,cookies.get('email')])


    return(
      
      <div className='about-container'>
      <NavBar loggin={loggeado} />

        <div className='container1234'>
        
        <img className="imgAbout" src={devs} alt="nf" />
        <div className='second'>
        <div className='AboutUs'>
       
        </div>
        <div className="conteiner-devs">
          <h3>Somos un equipo de programadores  que ofrecemos nuestros mejores conocimientos y experiencia, para conseguir que las clinicas de todo capital federal puedan realizar su parte administrativa de la forma más fácil y rápida posible.</h3>
               
             <div className="develops"> 
                {develop.map((dev)=>(  <div className="container2"> <img id='sinfoto' src={img} alt={dev.name} /> <br/> <h4>{dev.name}</h4> <button className='btn-social' id='btn'>{dev.git}</button> <button className='btn-social' id='btn'>{dev.linkedin}</button> </div>      ))} 
            </div>
    
            <Demo/>
            <br/>
            <h2>Tecnologias</h2>
            <div className='Tecnologias'>
            <div>
              <img id="images" src={js} alt="asd" />
            </div>
            <div>
              <img id="images" src={react} alt="asd" />
            </div>
            <div>
            <img id="images" src={github} alt="asd" />
            </div>
            </div>
              <Footer />
            </div>
            </div>
        </div>
        </div>
  
    )
}