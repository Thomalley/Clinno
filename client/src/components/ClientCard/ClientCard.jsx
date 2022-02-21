import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../ClientCard/ClientCardModule.css"
import Footer from "../Home/Footer"
import NavBar from '../NavLanding/NavLanding'
import { Link} from "react-router-dom";
import Cookies from 'universal-cookie'
import { getClients } from "../../actions/index";
import photo from "../../components/utils/images-landing/usuario-sin-foto.png"
import PasswordReset from "./PasswordReset"
import Bot from '../Bot/Bot'

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
        <Bot></Bot>
        <NavBar/>
        <ul class="nav justify-content-center">

        
          <li class="nav-link" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
            Modificar contraseña
          </li>
        
          <li><Link className="nav-link" to='/TurnoMe'>Turnos y Diagnosticos</Link></li>
            
          <li><Link className="nav-link" to='/EstamosTrabajando'>Pagos</Link></li>
          
          <li><Link to="/turno" class="btn btn-primary" href="#">hacer una cita</Link></li>
          
          </ul>

        <div class="collapse multi-collapse" id="multiCollapseExample1">
        <div class="card card-body">
          <PasswordReset/>
        </div>
        </div>
        
        <div class="collapse multi-collapse" id="multiCollapseExample3">
        <div class="card card-body">
          <p>Pagos</p>
        </div>
        </div>

        <div class="collapse multi-collapse" id="multiCollapseExample4">
        <div class="card card-body">
          <p>Reseñas</p>
        </div>
        </div>




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
  

