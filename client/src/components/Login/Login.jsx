import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// import {validateUser} from '../'
import './loginStyle.css'


export default function Login(){

    // const dispatch = useDispatch();

 
    const [input, setInput] = useState({
        username : '',
        password : ''

    })

    // function handleSubmit(e){
    //     e.preventDefault();
    //     dispatch(validateUser(input))
    // }   

    // function handleChange(e){
    //     setInput({
    //         ...input,
    //         [e.target.name] : e.target.value
    //     })
    // }

    return(

        <div className="container">
            <form className="cont">
                <div className="row">
                <div className="col-12">
                    <img className="imglogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Sansum_Clinic_logo.svg/640px-Sansum_Clinic_logo.svg.png" alt="nf" />
                    </div>
                </div>
                <div className="row">
                <h2>Bienvenido</h2>
                </div>
                <p className="desclogin">Inicie sesion para continuar..</p>
                <div className="row">
                    <div className="col-12">
                <input 
                    type='text'
                    placeholder="Username"
                    className="inpt"
                />
                    </div>
                </div>
                <div className="row">
                <div className="col-12 
                ">
                <input 
                    type='password'
                    placeholder="Password"
                    className="inpt"
                />
                </div>
                </div>
                <a className="noaccreg" href="/recover">Olvidaste tu contraseña?</a>
                <div className="row">
                    <div className="col-12 
                    ">
                    <button
                        type="submit"
                        className="btnlogincontinue"
                    >Continuar
                    </button>
                    </div>
                    </div>
                <div className="row">
                <div className="col-12 
                ">
                    <p className="noaccreg">No tenes cuenta? </p>
                   <a className="noaccreg" href="/home/register">Registrarse</a>
                   </div>
                   </div>
                <p>o</p>
                <div className="row">
                <div className="col-12">
                    <button className="btnlogin">Continuar con Facebook</button>
                </div>
                </div>
                <div className="row">
                <div className="col-12 
                ">
                    <button className="btnlogin">Continuar con Google</button>
                </div>
                </div>
                <Link to={'/home'}>
                    <button className="btnloginback">Volver a inicio</button>
                </Link>
            </form> 
        </div>

  

    )
}


