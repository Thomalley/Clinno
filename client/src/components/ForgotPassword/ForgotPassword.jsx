import './ForgotPassword.css'
import React , {useEffect, useState} from "react";
import Footer from "../Home/Footer";
import NavBar from '../NavBar/NavBar'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useSelector } from 'react-redux';
import { getClients } from '../../actions';
import {useDispatch} from 'react-redux';
import swal from 'sweetalert';
import {passworForgot} from '../../actions';
import Cookies from "universal-cookie";

import { useAuth0 } from "@auth0/auth0-react";
export default function ForgotPassword(){
    const { isAuthenticated, isLoading } = useAuth0();
    const cookies = new Cookies();

    let session;
    // console.log("sesion iniciada por " + cookies.get('email'))
    if (cookies.get("email")) {
      session = true;
    } else {
      session = isLoading;
    }
    const [loggeado, setLoggeado] = useState(session);
  
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
    useEffect ( () => {
        dispatch(getClients())
    },[])

    const dispatch = useDispatch()
    const clientes = useSelector((state)=> state.clientes);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        for(let i=0; i<clientes.length; i++){
            if (clientes[i].email === data.email){
                dispatch(passworForgot(clientes[i]))
                swal("se ha enviado un correo con su contraseña actual")
                setTimeout(()=> window.location.href='/', 1500) ;
                break;
            }
          }
    }


    return(
        <div>
            <NavBar loggin={loggeado}/>
            <div className="contenedorForgot">
                <h2>Por favor ingrese su correo electronico</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                
            <input className="form-control" type="text" placeholder="Ingrese su correo" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
            <ErrorMessage errors={errors} name="email" />
      
            <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => <p className="errorMsg">Mail requerido</p>}
            />
            <input className="col-12 btn btn-primary" type="submit" />
            </form>
            </div>
            <Footer/>
        </div>
    )
}