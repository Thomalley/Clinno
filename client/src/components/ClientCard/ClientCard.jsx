import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../ClientCard/ClientCardModule.css"
import Footer from "../Home/Footer"
import NavBar from '../NavBar/NavBar'
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie'
import { getClienteByEmail } from "../../actions/index";
import photo from "../../components/utils/images-landing/usuario-sin-foto.png"
import PasswordReset from "./PasswordReset"
import { useAuth0 } from "@auth0/auth0-react";


export default function ClientCard() {

  const cookies = new Cookies();
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0()
  const googleUser = cookies.get("userGoogle_email")
  const userMail = cookies.get("email")
  const [currentUser, setcurrentUser] = useState();
  let session;
  const [loggeado, setLoggeado] = useState(session);
  if (cookies.get("email")) {
    session = true;
  } else {
    session = isLoading;
  }
  //control de sesion
  useEffect(() => {
    if (cookies.get("email")) {
      setLoggeado(true);
    } else {
      if (isAuthenticated) {
        setLoggeado(true);
      } else {
        setLoggeado(false);
      }
    }
  }, [isLoading, cookies.get("email")]);

  useEffect(() => {
    if (user || isAuthenticated || isLoading) {
      dispatch(getClienteByEmail(googleUser))
        .then((data) => setcurrentUser(data.payload))
    }
    if (userMail) {
      dispatch(getClienteByEmail(userMail))
        .then((data) => setcurrentUser(data.payload))
    }
  }, [])

  console.log(currentUser)
  return (
    <div>
      <NavBar  loggin={loggeado}/>
      <div style={{"margin-top" : "5pc"}}></div>

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
          <PasswordReset />
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
        <img src={user?.picture ? user?.picture : photo} alt="png" className={user?.picture ? "fotoDetailGoogle" : "fotoDetail"} />
        <div className="detailCard">
          <div class="card">
            <label>Nombre</label>
            <label>{currentUser?.nombre}</label>
          </div>
          <div class="card">
            <label>Apellido</label>
            <label>{currentUser?.apellido}</label>
          </div>
          <div class="card">
            <label>DNI</label>
            <label>{currentUser?.dni}</label>
          </div>
          <div class="card">
            <label>Mail</label>
            <label>{currentUser?.email}</label>
          </div>
          <div class="card">
            <label>Direccion</label>
            <label>{currentUser?.direccion}</label>
          </div>
        </div>
      </div>
      <Footer />
    </div>)


}


