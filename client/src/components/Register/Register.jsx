import './Register.css'
import { useSelector } from 'react-redux';
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
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
    const regExName = /^[A-Za-z][a-zA-Z ]{2,40}$/;
    const  regExEmail= /^\S+@\S+$/i;
    
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
      nombre:'',
      apellido:'',
      dni:'',
      email:'',
      password:'',
      direccion:'',
  })
    
    
  function handleSubmit(e){
    e.preventDefault()
    let registrado = false;
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));

      for(let i=0; i<clientes.length; i++){
        if (clientes[i].email === input.email || clientes[i].dni === input.dni){
          swal('El mail ya corresponde a un usuario registrado')
          registrado = true;
          break;
        }
      }
      console.log(Object.values(validate(input)))
      if (!registrado){
      if(Object.values(validate(input)).length === 0){
      dispatch(registrarCliente(input))
      swal('Usuario Creado!')
      navigate('/login')
    }else {swal('Corrija los errores antes de registrarse')}}}


    
    function handleChange(e){
      setInput({
          ...input,
          [e.target.name]: e.target.value
      })
      setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
      }));
      console.log(input)
  }

function validate(error){
    console.log(error)
let errors = {};

if (!input.nombre || input.nombre === "" ||  !regExName.test(input.nombre)){
    errors.nombre = 'Campo Requerido: nombre solo letras y espacios. Entre 2 y 40 caracteres';
}

if (!input.apellido || input.apellido === "" ||  !regExName.test(input.apellido)){
  errors.apellido = 'Campo Requerido: apellido solo letras y espacios. Entre 3 y 40 caracteres';
}

if (!input.dni || input.dni === "" || typeof(input.dni) === "number" ||  input.dni.length < 7 ||  input.dni.length > 9){
  errors.dni = 'Campo Requerido: DNI mayor a 7 digito, menor a 8 digitos';
}

if (!input.email || input.email === "" || !regExEmail.test(input.email)){
  errors.email = 'Campo Requerido: e-mail. ejemplo@ejemplomail.com';
}

if (!input.password || input.password === "" ||  input.password.length < 7 ||  input.password.length > 30){
  errors.password = 'Campo Requerido: Contraseña mayor a 7 digitos, menos a 30 digitos';
}

if (!input.direccion || input.direccion === "" || input.direccion.length < 3 ||  input.direccion.length > 50){
  errors.direccion = 'Campo Requerido: Direccion mayor a 7 digitos, menos a 30 digitos';
}

return errors;
}

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
    <form onSubmit={(e) => handleSubmit(e)}>

      <input onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="Nombre" value={input.nombre} name='nombre'/>
      <div>{errors.nombre && (<p className='errorMsg'>{errors.nombre}</p>)}</div>

      < input onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="Apellido" value={input.apellido} name='apellido'/>
      <div>{errors.apellido && (<p className='errorMsg'>{errors.apellido}</p>)}</div>

      <input onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="DNI  (Solo Numeros)" value={input.dni} name='dni' />
      <div>{errors.dni && (<p className='errorMsg'>{errors.dni}</p>)}</div>

      <input onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="Mail" value={input.email} name='email' />
      <div>{errors.email && (<p className='errorMsg'>{errors.email}</p>)}</div>

      <input onChange={(e) => handleChange(e)} className="form-control" type="password" placeholder="Contraseña" value={input.password} name='password' />
      <div>{errors.password && (<p className='errorMsg'>{errors.password}</p>)}</div>

      <input onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="Direccion" value={input.direccion} name='direccion' />
      <div>{errors.direccion && (<p className='errorMsg'>{errors.direccion}</p>)}</div>

      <div className='reCap'>
      <div class="g-recaptcha" data-sitekey="6Lf_tG4eAAAAANiXKNaplUlHjzZi8STHvQLzDO_f"></div>
      </div>
      <button value="Submit" className="col-12 btn btn-primary" type="submit">Registrar</button>

    </form>

    </div>
    <Footer/>
    </div>
  )}