import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
//import {registrarCliente} from '../actions/index';

export default function Register(){

    //const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
    //dispatch(registrarCliente(data)
    console.log(data)
    alert('Usuario Creado!')
    //navigate('/home')
    if (errors){
        console.log(errors)
    }}
    
  return (
    <div className='container'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Nombre" {...register("nombre", {required: true, pattern: /^[A-Za-z][a-zA-Z ]{3,19}$/, minLength: 3, maxLength: 40})} />
      <ErrorMessage errors={errors} name="nombre" />
      
      <ErrorMessage
        errors={errors}
        name="nombre"
        render={({ message }) => <p>Nombre requerido</p>}
      />
      <input type="text" placeholder="Apellido" {...register("apellido", {required: true, pattern: /^[A-Za-z][a-zA-Z ]{3,19}$/, minLength: 3, maxLength: 40})} />
      <ErrorMessage errors={errors} name="apellido" />
      
      <ErrorMessage
        errors={errors}
        name="apellido"
        render={({ message }) => <p>Apellido requerido</p>}
      />
      <input type="text" placeholder="DNI  (Solo Numeros)" {...register("dni", {required: true, minLength: 7, maxLength: 8})} />
      <ErrorMessage errors={errors} name="dni" />
      
      <ErrorMessage
        errors={errors}
        name="dni"
        render={({ message }) => <p>DNI requerido</p>}
      />
      <input type="text" placeholder="Email" {...register("mail", {required: true, pattern: /^\S+@\S+$/i})} />
      <ErrorMessage errors={errors} name="mail" />
      
      <ErrorMessage
        errors={errors}
        name="mail"
        render={({ message }) => <p>Mail requerido</p>}
      />
      <input type="password" placeholder="Contraseña" {...register("contraseña", {required: true, minLength: 7, maxLength: 30})} />
      <ErrorMessage errors={errors} name="contraseña" />
      
      <ErrorMessage
        errors={errors}
        name="contraseña"
        render={({ message }) => <p>Contraseña requerido</p>}
      />
      <input type="submit" />
    </form>
    </div>
  );
}