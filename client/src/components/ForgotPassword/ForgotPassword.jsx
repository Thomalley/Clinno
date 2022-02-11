import './ForgotPassword.css'
import React , {useEffect} from "react";
import Footer from "../Home/Footer";
import NavBar from '../NavBar/NavBar'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useSelector } from 'react-redux';
import { getClients } from '../../actions';
import {useDispatch} from 'react-redux';
import swal from 'sweetalert';
const nodemailer = require("nodemailer");

export default function ForgotPassword(){

    useEffect ( () => {
        dispatch(getClients())
    },[])

    const dispatch = useDispatch()
    const clientes = useSelector((state)=> state.clientes);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        for(let i=0; i<clientes.length; i++){
            if (clientes[i].email === data){
                
                const sgMail = require('@sendgrid/mail')

                const API_KEY = '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';
  
                sgMail.setApiKey(API_KEY)
  
                const message = {
                to: data,
                from : "clinnoturnos@gmail.com",
                subject: `Usuario registrado con exito!`,
                html: `
                <html>
                <head>
                <body>
                <h2> Hola ${data} tu contraseña es ${clientes[i].password}</h2>
                </body>
                </head>
                </html>`
                }

                sgMail
                    .send(message)
                    .then((response) => console.log ('Email sent...'))
                    .catch((error) => console.log (error.message))

              swal("se ha enviado un correo con su contraseña actual")
              break;
            }
          }
    }


    return(
        <div>
            <NavBar/>
            <div className="contenedorForgot">
            <form onSubmit={handleSubmit(onSubmit)}>
            <input className="form-control" type="text" placeholder="Mail" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
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