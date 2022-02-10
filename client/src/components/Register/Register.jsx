import './Register.css'
import { useSelector } from 'react-redux';
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {registrarCliente, getClients} from '../../actions/index';
import swal from 'sweetalert';
import logo from '../../components/utils/images-landing/logo.png'
import Footer from '../Home/Footer';



export default function Register(){

  useEffect ( () => {
    dispatch(getClients())
},[])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const clientes = useSelector((state)=> state.clientes);

    console.log(clientes)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {

    let registrado = false;
    
      for(let i=0; i<clientes.length; i++){
        if (clientes[i].email === data.email || clientes[i].dni === data.dni){
          swal('El mail ya corresponde a un usuario registrado')
          registrado = true;
          break;
        }
      }
      if (!registrado){
      dispatch(registrarCliente(data))
      swal('Usuario Creado!')
      navigate('/login')
    }}

  return (
    <div>
    <nav class="navbar sticky-top navbar-light bg-light">
    <Link className="navbar-brand" to='/'>
    <img className="imglogoR" src={logo} alt="nf" />
    </Link>
    </nav>
    <div className='container1'>
    <div className="col-12">
    <img className="imglogoform" src={logo} alt="nf" />
    </div>
    <form action="?" onSubmit={handleSubmit(onSubmit)}>
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
      <div className='reCap'>
      <div class="g-recaptcha" data-sitekey="6Lf_tG4eAAAAANiXKNaplUlHjzZi8STHvQLzDO_f"></div>
      </div>
      <input value="Submit" className="col-12 btn btn-primary" type="submit" />
    </form>
    </div>
    <Footer/>
    </div>
  )}