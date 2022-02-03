import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {getClients} from '../../actions'
import './loginStyle.css'


export default function Login(){

    const dispatch = useDispatch();
    const clientes = useSelector((state)=> state.clientes);
    const [errors, setErrors] = useState({});
    const {loginWithRedirect} = useAuth0();
 
    const [loggeado,setLoggeado] = useState({"logged" : false});
    const [input, setInput] = useState({
        username : '',
        password : '',

    })

    useEffect(()=>{
        dispatch(getClients())
    },[dispatch])

    function handleSubmit(e){
        e.preventDefault();
        // const usr = document.getElementById('username').value;
        // const pwd = document.getElementById('password').value;
        const usr = input.username;
        const pwd = input.password;
        let i = 0 ;
        while(i < clientes.length){
            if (clientes[i].username === usr && clientes[i].password !== pwd ){
                alert('Datos incorrectos');
                break;
            }
            if (clientes[i].username === usr && clientes[i].password === pwd ){
                setLoggeado({
                    ...loggeado,
                    logged : true
                });
                alert('Login successfully');
                window.location = '/home';
                break;
            }
            i++
        }
    }   

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function validate(input) {
        const errors = {};
        if (!input.username) {
            errors.username = '*E-mail requerido ';
        }
        if (!input.password) {
            errors.password = '*Contrasena requerida ';
        }
        return errors;
    }

    return(

        <div className="container">
            <form className="cont" onSubmit={(e)=> handleSubmit(e)}>
                <div className="row">
                <div className="col-12">
                    <Link to='/home'>
                    <img className="imglogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Sansum_Clinic_logo.svg/640px-Sansum_Clinic_logo.svg.png" alt="nf" />
                    </Link>
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
                    placeholder="Email adress"
                    id="username"
                    className={errors.username? "inptwr" : "inpt"}
                    value={input.username}
                    name='username'
                    onChange={(e)=>handleChange(e)}
                />
                {errors.username && (
                        <p className='errorNotWrtd' >{errors.username}</p>
                    )}
                    </div>
                </div>
                <div className="row">
                <div className="col-12 
                ">
                <input 
                    type='password'
                    placeholder="Password"
                    id="password"
                    className={errors.password? "inptwr" : "inpt"}
                    value={input.password}
                    name='password'
                    onChange={(e)=>handleChange(e)}
                />
                {errors.password && (
                        <p className='errorNotWrtd' >{errors.password}</p>
                    )}
                </div>
                </div>
                <a className="noaccreg" href="/recover">Olvidaste tu contraseña?</a>
                <div className="row">
                    <div className="col-12 
                    ">
                    <button
                        type="submit"
                        className={errors.username || errors.password? "btnlogincontinueBlocked" : "btnlogincontinue"}
                    >Continuar
                    </button>
                    </div>
                    </div>
                <div className="row">
                <div className="col-12 
                ">
                    <p className="noaccreg">No tenes cuenta? </p>
                   <a className="noaccreg" href="/register">Registrarse</a>
                   </div>
                   </div>
                <p>o</p>
                <div className="row">
                <div className="col-12">
                    <button type="sub" className="btnloginWithAuth0" onClick={()=> loginWithRedirect()}>Continuar con Auth0</button>
                </div>
                </div>
                <Link to={'/home'}>
                    <button className="btnloginback">Volver a inicio</button>
                </Link>
            </form> 
        </div>

  

    )
}


