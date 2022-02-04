import './Register.css'
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {registrarCliente} from '../../actions/index';
import logo from '../../components/utils/images-landing/logo.png'

export default function Register(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    let user = {}

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {

      dispatch(registrarCliente(data))
      alert('Usuario Creado!')
      //navigate('/home')
    }

  return (
    <div className='container1'>
    <div className="col-12">
    <img className="imglogo" src={logo} alt="nf" />
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input className="form-control" type="text" placeholder="Nombre" {...register("nombre", {required: true, pattern: /^[A-Za-z][a-zA-Z ]{3,40}$/})} />
      <ErrorMessage errors={errors} name="nombre" />
      
      <ErrorMessage
        errors={errors}
        name="nombre"
        render={({ message }) => <p className="errorMsg">Nombre requerido</p>}
      />
      <input className="form-control" type="text" placeholder="Apellido" {...register("apellido", {required: true, pattern: /^[A-Za-z][a-zA-Z ]{3,40}$/})} />
      <ErrorMessage errors={errors} name="apellido" />
      
      <ErrorMessage
        errors={errors}
        name="apellido"
        render={({ message }) => <p className="errorMsg">Apellido requerido</p>}
      />
      <input className="form-control" type="text" placeholder="DNI  (Solo Numeros)" {...register("dni", {required: true, minLength: 7, maxLength: 8})} />
      <ErrorMessage errors={errors} name="dni" />
      
      <ErrorMessage
        errors={errors}
        name="dni"
        render={({ message }) => <p className="errorMsg">DNI requerido</p>}
      />
      <input className="form-control" type="text" placeholder="Mail" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
      <ErrorMessage errors={errors} name="email" />
      
      <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => <p className="errorMsg">Mail requerido</p>}
      />
      <input className="form-control" type="password" placeholder="Contraseña" {...register("password", {required: true, minLength: 7, maxLength: 30})} />
      <ErrorMessage errors={errors} name="password" />
      
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => <p className="errorMsg">Contraseña requerido</p>}
      />
      <input className="form-control" type="text" placeholder="Direccion" {...register("direccion", {required: true, minLength: 7, maxLength: 30})} />
      <ErrorMessage errors={errors} name="direccion" />
      
      <ErrorMessage
        errors={errors}
        name="direccion"
        render={({ message }) => <p className="errorMsg">Direccion requerido</p>}
      />
      <input className="col-12 btn btn-primary" type="submit" />
    </form>
    </div>
  );
}