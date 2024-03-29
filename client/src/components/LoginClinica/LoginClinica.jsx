import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { login_clinica} from '../../actions'
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import Footer from '../Home/Footer';
import logo from '../../components/utils/images-landing/logo.png';
import './LoginClinicaStyle.css';


export default function LoginClinica(){

    const cookies = new Cookies();
    const dispatch = useDispatch();
    const clinica = useSelector((state)=> state.clinica);
    const [errors, setErrors] = useState({});
    const [loggeado,setLoggeado] = useState({"logged" : false});
    const [doc,setDoc] = useState(false);
    const [input, setInput] = useState({
        mail : '',
        password : '',
    });

    useEffect(() => {
        dispatch(login_clinica(input));
    },[input])


    function handleSubmit(e){
        e.preventDefault();
        dispatch(login_clinica(input));
        setTimeout(logreq(), 1000);
    }  

    function logreq(){
        if(clinica.length > 0){
            const data = clinica[0];
            cookies.set('clinica_mail', data.mail, {path: '/'});
            cookies.set('clinica_nombre', data.nombre, {path: '/'});
            cookies.set('clinica_telefono', data.telefono, {path: '/'});
            cookies.set('clinica_direccion', data.direccion, {path: '/'});
            cookies.set('clinica_id', data.id, {path: '/'});
            cookies.set('clinica_nombreEn', data.nombreEn, {path: '/'});
            cookies.set('clinica_apellidoEn', data.apellidoEn, {path: '/'});
            cookies.set('clinica_DNIEn', data.DNIEn, {path: '/'});
            cookies.set('clinica_createdAt', data.createdAt, {path: '/'});
            setLoggeado({
                ...loggeado,
                logged : true
            });
            setInput({
                mail : '',
                password : '',
            });

            swal("Bienvenido!", "En instantes seras redirigido", "success")
            if(doc){
                setTimeout(()=> window.location.href='/soyDoctor', 2000);
            }else{
                setTimeout(()=> window.location.href='/adminClinica', 2000);
            }
        }
        else {
            swal({
                title: "Usuario o contrasena incorrectos",
                text: "Ingrese los datos e intente nuevamente",
                icon: "error",
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
        if (input.mail !== ''){
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
        if (!input.mail) {
            errors.mail = '*E-mail requerido ';
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
    function soyDoctor(e) {
        ( e.target.checked)?setDoc(true): setDoc(false);
    }

    return(
        <div>
        <div className="container container_loggin_clinica ">
            <form className="contenedor_loggin" onSubmit={(e)=> handleSubmit(e)}  autocomplete="off">
                <div className="row">
                    <div className="col-12">
                        <Link to='/'>
                        <img className="imgloginClinica" src={logo} alt="logo Clinno" style={{"width":"50%"}} />
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <h2>Bienvenido </h2>
                    <p className="m-0">Para ingresar a Clinica o SoyDoctor,</p>
                    <p> debes iniciar sesión.</p>
                </div>
                <div className="row">
                    <div className="col-12">
                        <input 
                            type='text'
                            placeholder="Email"
                            id="username"
                            className={errors.mail? "inptwr_clinica" : "input_clinica"}
                            value={input.mail}
                            name='mail'
                            onChange={(e)=>handleChange(e)}
                        />
                        {errors.mail ?<p className='errorNot' >{errors.mail}</p>:<p className='errorNot'></p>}

                    </div>
                </div>
                <div className="row">
                    <div className="col-12 ">
                    <input 
                        type='password'
                        placeholder="Password"
                        name='password'
                        id="password"
                        className={errors.password? "inptwr_clinica" : "input_clinica"}
                        value={input.password}
                        onChange={(e)=>handleChange(e)}
                    />
                    <br></br>
                    <input className="checkboc_showpass" type='checkbox' onChange={(e)=> handleCheckbox(e)}/><p className="show_pass">Mostrar Contraseña</p>
                    {errors.password ?<p className='errorNot' >{errors.password}</p>:<p className='errorNot'></p>}
                    </div>
                </div>
                <div>
                    <div class="form-check form-switch container_soyDoctor">
                        <input class="form-check-input soyDoctor_inpu" type="checkbox" id="checkboxSoyDoctor" onChange={(e)=>soyDoctor(e)}/>
                        <label class="form-check-label soyDoctor_lab" for="checkboxSoyDoctor">Soy Doctor</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button type="submit" className="btnLoggin" >Continuar</button>
                    </div>
                </div>                
                <div className="row">
                    <div className="col-12">
                        <p className="litle_text">No tenes cuenta de clinica? </p>
                        <a className="litle_text" href="/registerClinic">Registrarse</a>
                   </div>
                </div>
                
                <Link className="volver_inicio" to={'/'}>
                    <button className="btnLoggin_back">Volver a inicio</button>
                </Link>
            </form> 
        </div>
        <Footer />
        </div>
  

    )
}