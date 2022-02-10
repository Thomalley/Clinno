import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from '../../actions/index';
import "../ClientCard/ClientCardModule.css"
import Footer from "../Home/Footer"
import NavBar from '../NavLanding/NavLanding'
import { Link} from "react-router-dom";
import Cookies from 'universal-cookie'
import { getClients } from "../../actions/index";
import photo from "../../components/utils/images-landing/usuario-sin-foto.png"

export default function ClientCard(){
    const dispatch = useDispatch();

    const cookies = new Cookies();
    const userMail = (cookies.get("email"))

    let currentUser = {};
    let currentUser2 = {};
    const allClients = useSelector((state)=> state.clientes);

    useEffect ( () => {
      dispatch(getClients())
    },[])


    for(let i=0; i<allClients.length; i++){
      if (allClients[i].email === userMail){
        currentUser = allClients[i]
        break;
      }
    }

    let arrayUser = Object.entries(currentUser)
  
      for(let i = 1; i < arrayUser.length - 4; i++){
        currentUser2[arrayUser[i][0]] = arrayUser[i][1]
      }

      return (
        <div>
        <NavBar/>
    
        <ul class="nav justify-content-center">

        <li class="nav-item">
        <Link to="/passwordreset" class="nav-link" href="#">Modificar datos de usuario</Link>
        </li>

        <li class="nav-item">
        <Link to="/" class="nav-link" href="#">Historial de visitas y diagnosticos</Link>
        </li>

        <li class="nav-item">
        <Link to="/" class="nav-link" href="#">Historial de pagos</Link>
        </li>
        
        <li class="nav-item">
        <Link to="/" class="nav-link" href="#">Historial de reseñas</Link>
        </li>

        <li class="nav-item">
        <Link to="/" class="nav-link" href="#">hacer una cita</Link>
        </li>

        </ul>

        <div className="container3">
        <img src={photo} alt="png" className="fotoDetail"/>
        <div className="detailCard">
        <div class="card">
        <label>Nombre</label>
        <label>{currentUser2.nombre}</label>
        </div>
        <div class="card">
        <label>Apellido</label>
        <label>{currentUser2.apellido}</label>
        </div>
        <div class="card">
        <label>DNI</label>
        <label>{currentUser2.dni}</label>
        </div>
        <div class="card">
        <label>Mail</label>
        <label>{currentUser2.email}</label>
        </div>
        <div class="card">
        <label>Direccion</label>
        <label>{currentUser2.direccion}</label>
        </div>
        </div>
        </div>
        <Footer/>
        </div>)
  

      }
  

