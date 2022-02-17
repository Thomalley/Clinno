import './Register.css'
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { registrarCliente, getClients } from '../../../actions/index';
import swal from 'sweetalert';
import logo from '../../../components/utils/images-landing/logo.png'
import Cookies from 'universal-cookie';


export default function RegistrarUsuario() {

    useEffect(() => {
        dispatch(getClients())
    }, [])
    const cookies = new Cookies();
    const dispatch = useDispatch()
    const clientes = useSelector((state) => state.clientes);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {

        function getRandomString(length) {
            var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var result = '';
            for (let i = 0; i < length; i++) {
                result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
            }
            return result;
        }

        let registrado = false;

        for (let i = 0; i < clientes.length; i++) {
            if (clientes[i].email === data.email || clientes[i].dni === data.dni) {
                swal('El mail ya corresponde a un usuario registrado')
                registrado = true;
                break;
            }
        }
        if (!registrado) {
            data.password = getRandomString(6)
            console.log(data.dni,"soy data dni")
            dispatch(registrarCliente(data))
            swal('Cliente registrado correctamente', "A continuacion sera redirigido a la pagina de turnos", "success")
            setTimeout(() => window.location.href = '/adminClinica/cliente', 2000)
        }
    }

    return (
        <div>
            <div className='container1'>
                <div className="col-12">
                    <img className="imglogoform" src={logo} alt="nf" />
                </div>
                <form action="?" onSubmit={handleSubmit(onSubmit)}>
                    <input className="form-control" type="text" placeholder="Nombre" {...register("nombre", { required: true, pattern: /^[A-Za-z][a-zA-Z ]{3,40}$/ })} />
                    <ErrorMessage errors={errors} name="nombre" />

                    <ErrorMessage
                        errors={errors}
                        name="nombre"
                        render={({ message }) => <p className="errorMsg">Nombre requerido</p>}
                    />
                    <input className="form-control" type="text" placeholder="Apellido" {...register("apellido", { required: true, pattern: /^[A-Za-z][a-zA-Z ]{3,40}$/ })} />
                    <ErrorMessage errors={errors} name="apellido" />

                    <ErrorMessage
                        errors={errors}
                        name="apellido"
                        render={({ message }) => <p className="errorMsg">Apellido requerido</p>}
                    />
                    <input className="form-control" type="text" placeholder="DNI  (Solo Numeros)" {...register("dni", { required: true, minLength: 7, maxLength: 8 })} />
                    <ErrorMessage errors={errors} name="dni" />

                    <ErrorMessage
                        errors={errors}
                        name="dni"
                        render={({ message }) => <p className="errorMsg">DNI requerido</p>}
                    />
                    <input className="form-control" type="text" placeholder="Mail" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                    <ErrorMessage errors={errors} name="email" />

                    <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({ message }) => <p className="errorMsg">Mail requerido</p>}
                    />
                    <input className="form-control" type="text" placeholder="Direccion" {...register("direccion", { required: true, minLength: 7, maxLength: 30 })} />
                    <ErrorMessage errors={errors} name="direccion" />

                    <ErrorMessage
                        errors={errors}
                        name="direccion"
                        render={({ message }) => <p className="errorMsg">Direccion requerido</p>}
                    />
                    <div id="valida_register_dni">
                        <small id="emailHelp" class="form-text text-muted">⚠️Antes de registrar el usuario, validar datos con DNI</small>
                    </div>
                    <div class="alert alert-danger" role="alert">
                        <p>
                            Por razones de seguridad, al crear un usuario el cliente recibira una <strong>contraseña temporal</strong> a su correo electronico, la cual debera cambiar luego de loguearse por primera vez.
                        </p>
                    </div>
                    <input id='detalle_btn_reg' value="Crear usuario" className="col-12 btn btn-primary" type="submit" />
                    <input value="Volver a Administracion" className="col-12 btn btn-secondary" onClick={() => window.location.href = '../'} type="reset" />
                </form>
            </div>
        </div>
    )
}