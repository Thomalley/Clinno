import './AboutUs.css';
import React from 'react';
import { useState, useEffect } from "react";
import develop from '../utils/develop.json'
import img from '../utils/images-landing/usuario-sin-foto.png'
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


export default function AboutUs() {
  const cookies = new Cookies()

  const { isAuthenticated, isLoading } = useAuth0();



  let session;
  if (cookies.get('email')) {
    session = true;
  } else {
    session = isLoading;
  }
  const [loggeado, setLoggeado] = useState(session);
  useEffect(() => {
    console.log(isLoading)
    if (cookies.get('email')) {
      setLoggeado(true);
    } else {
      if (isAuthenticated) {
        setLoggeado(true);
      } else {
        setLoggeado(false);
      }
    }

  }, [isLoading, cookies.get('email')])


  return (
    <div style={{"margin-top": "5pc"}}>
      <NavBar loggin={loggeado} />
          <img className="imgAbout" src={devs} alt="nf" style={{"imageResolution":"initial"}}/>
      <div className='container'>

            <div className="conteiner-devs col-12">
              <h3 style={{"margin-bottom" : "8pc"}}>Somos un grupo de desarrolladores que nos enfocamos en resolver las problemáticas que le surgen a las personas en el día a día de la manera más rápida y eficaz posible</h3>

              <div className='row'>
                  {develop.map((dev) =>
                  (<div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                    {/* col-xl-3 col-lg-6 col-md-12 col-sm-12 */}
                    <img id='sinfoto' src={img} alt={dev.name} />
                    <br />
                    <h4>{dev.name}</h4>
                    <button className='btn-social' id='btn'>{dev.git}</button>
                    <button className='btn-social' id='btn'>{dev.linkedin}</button>
                  </div>))}
              </div>

              <br />

              <div className='row'>
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
              </div>

            </div>

      </div>

      <div>
      <Footer />
      </div>
    </div>

  )
}