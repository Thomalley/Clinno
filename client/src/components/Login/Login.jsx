import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { login_validate} from '../../actions'
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import './loginStyle.css'
import logo from '../../components/utils/images-landing/logo.png'



export default function Login(){

    const cookies = new Cookies();
    const dispatch = useDispatch();
    const cliente = useSelector((state)=> state.cliente);
    const [errors, setErrors] = useState({});
    const {loginWithRedirect} = useAuth0();
    const [loggeado,setLoggeado] = useState({"logged" : false});   
    const [input, setInput] = useState({
        email : '',
        password : '',
    });

    useEffect(() => {
        dispatch(login_validate(input));
    },[input])


    function handleSubmit(e){
        e.preventDefault();
        dispatch(login_validate(input));
        setTimeout(logreq(), 2000)
    }  

    function logreq(){
        if(cliente.length > 0){
            const data = cliente[0];
            cookies.set('email', data.email, {path: '/'});
            cookies.set('nombre', data.nombre, {path: '/'});
            cookies.set('apellido', data.apellido, {path: '/'});
            cookies.set('direccion', data.direccion, {path: '/'});
            cookies.set('id', data.id, {path: '/'});
            cookies.set('dni', data.dni, {path: '/'});
            cookies.set('admin', data.admin, {path: '/'});
            cookies.set('createdAt', data.createdAt, {path: '/'});
            setLoggeado({
                ...loggeado,
                logged : true
            });
            setInput({
                email : '',
                password : '',
            });

            swal("Bienvenido!", "En instantes seras redirigido a Inicio", "success")
            console.log(cookies.get('email')+ " inicio sesion");

            setTimeout(()=> window.location.href='/', 2000) ;
        }
        else {
            swal({
                title: "Usuario o contrasena incorrectos",
                text: "Ingrese los datos e intente nuevamente",
                icon: "warning",
                dangerMode: true,
              })
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
        if (input.email !== ''){
            const usr = document.getElementById("username");
            usr.className = "inptValue"
        }
        if (input.password !== ''){
            const pwd = document.getElementById("password");
            pwd.className = "inptValue"
        }
    }

    function validate(input) {
        const errors = {};
        if (!input.email) {
            errors.email = '*E-mail requerido ';
        }
        if (!input.password) {
            errors.password = '*Contrasena requerida ';
        }
        return errors;
    }

    function handleCheckbox(e) {
        const pwd = document.getElementById('password');
        if( e.target.checked) {
            pwd.type="text";
        } 
        else pwd.type="password";

    }

    return(
        <div className="container">
            <form className="cont" onSubmit={(e)=> handleSubmit(e)}>
                <div className="row">
                <div className="col-12">
                    <Link to='/home'>
                    <img className="imglogin" src={logo} alt="nf" />
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
                    className={errors.email? "inptwr" : "inpt"}
                    value={input.email}
                    name='email'
                    onChange={(e)=>handleChange(e)}
                />
                {errors.email && (
                        <p className='errorNotWrtd' >{errors.email}</p>
                    )}
                    </div>
                </div>
                <div className="row">
                <div className="col-12 
                ">
                <input 
                    type='password'
                    placeholder="Password"
                    name='password'
                    id="password"
                    className={errors.password? "inptwr" : "inpt"}
                    value={input.password}
                    onChange={(e)=>handleChange(e)}
                />
                <br></br>
                <input className="checkbocshowpass" type='checkbox' onChange={(e)=> handleCheckbox(e)}/><p className="showpass">Show password</p>
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
                        className={errors.username || errors.password ? "btnlogincontinueBlocked" : "btnlogincontinue"}
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
                <p> ━ o ━ </p>
                <div className="row">
                <div className="col-12">
                    <button className="btnloginWithAuth0" type="reset" onClick={async()=> await loginWithRedirect({connection: 'google-oauth2'})}>
                    <img className='googlelog' src="https://cdn.auth0.com/marketplace/catalog/content/assets/creators/google/google-avatar.png" alt="G"/>
                        Continuar con Google
                    </button>
                </div>
                </div>
                <Link to={'/home'}>
                    <button className="btnloginback">Volver a inicio</button>
                </Link>
            </form> 
        </div>

  

    )
}



