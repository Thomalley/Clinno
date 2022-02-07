import './RegisterClinic.css'
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {registrarHospital} from '../../actions/index';
import swal from 'sweetalert';
import logo from '../../components/utils/images-landing/logo.png'
import Footer from '../Home/Footer';



export default function RegisterClinic(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {

      //dispatch(registrarHospital(data))
      swal('Estamos verificando tu informacion!')
      navigate('/home')
    }

  return (
    <div>
    <nav class="navbar sticky-top navbar-light bg-light">
    <Link className="navbar-brand" to='/'>
    <img className="imglogoR" src={logo} alt="nf" />
    </Link>
    </nav>
    <div className='container11'>
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
    <Footer/>
    </div>
  )}