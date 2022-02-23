import './Register.css'
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registrarCliente, getClients } from '../../actions/index';
import swal from 'sweetalert';
import logo from '../../components/utils/images-landing/logo.png'
import Footer from '../Home/Footer';
import Navbar from '../NavBar/NavBar'


export default function Register() {

  useEffect(() => {
    dispatch(getClients())
  }, [])

  const dispatch = useDispatch()
  const clientes = useSelector((state) => state.clientes);
  const regExName = /^[A-Za-z][a-zA-Z ]{2,40}$/;
  const regExEmail = /^\S+@\S+$/i;
  const [registrado, setregistrado] = useState(false);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    password: '',
    direccion: '',
    datosCompletados: true
  })


  function handleSubmit(e) {
    e.preventDefault()
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));

    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].email === input.email || clientes[i].dni === input.dni) {
        swal("Error", 'El mail ya corresponde a un usuario registrado', "warning")
        setregistrado(true)
        break;
      }
    }

    if (!registrado) {
      if (Object.values(validate(input)).length === 0) {
        dispatch(registrarCliente(input))
        swal('Usuario Creado con exito', "En instantes seras redirigido para iniciar sesion", "success")
        setTimeout(() => window.location.href = '/login', 2000)
      } else {
        swal('Error', "Revisa los errores antes de continuar", "error")
      }
    }
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  function validate() {
    let errors = {};
    if (!input.nombre || input.nombre === "" || !regExName.test(input.nombre)) {
      errors.nombre = 'Nombre requerido, hasta 40 caracteres';
    }
    if (!input.apellido || input.apellido === "" || !regExName.test(input.apellido)) {
      errors.apellido = 'Apellido requerido';
    }
    if (!input.dni || input.dni === "" || typeof (input.dni) === "number" || input.dni.length < 7 || input.dni.length > 9) {
      errors.dni = 'DNI requerido';
    }
    if (!input.email || input.email === "" || !regExEmail.test(input.email)) {
      errors.email = 'Campo Requerido: ejemplo@mail.com';
    }
    if (!input.password || input.password === "" || input.password.length < 7 || input.password.length > 30) {
      errors.password = 'Contraseña mayor a 7 digitos';
    }
    if (!input.direccion || input.direccion === "" || input.direccion.length < 3 || input.direccion.length > 50) {
      errors.direccion = 'Direccion requerida';
    }
    return errors;
  }

  return (
    <div>
      <Navbar />
      <div className='container1'>
        <div className="col-12">
          <img className="imglogoform" src={logo} alt="nf" />
        </div>
        <div className="row">
          <div className="col-12">
            <h2 style={{ "font-weight": "400" }} >Bienvenido</h2>
            <p className='elPdeAbajoReg '>Complete el formulario para continuar..</p>
          </div>
        </div>
        <form autocomplete="off" onSubmit={(e) => handleSubmit(e)}>

          <div className='row'>
            <div className='col-2'></div>
            <div className='col-8'>
              <input id="inpt_reg_new" onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="Nombre" value={input.nombre} name='nombre' />
            </div>
            <div className='col-2'></div>
          </div>
          {
            errors.nombre && (
              <p id="error_en_reg" className='errorNotWrtd'>
                {errors.nombre}
              </p>
            )
          }

          <div className='row'>
            <div className='col-2'></div>
            <div className='col-8'>
              <input id="inpt_reg_new" onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="Apellido" value={input.apellido} name='apellido' />
            </div>
            <div className='col-2'></div>
          </div>
          {
            errors.apellido && (
              <p id="error_en_reg" className='errorNotWrtd'>
                {errors.apellido}
              </p>
            )
          }

          <div className='row'>
            <div className='col-2'></div>
            <div className='col-8'>
              <input id="inpt_reg_new" onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="DNI  (Solo Numeros)" value={input.dni} name='dni' />
            </div>
            <div className='col-2'></div>
          </div>
          {
            errors.dni && (
              <p id="error_en_reg" className='errorNotWrtd'>
                {errors.dni}
              </p>
            )
          }
          
          <div className='row'>
            <div className='col-2'></div>
            <div className='col-8'>
              <input id="inpt_reg_new" onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="Mail" value={input.email} name='email' />
            </div>
            <div className='col-2'></div>
          </div>
          {
            errors.email && (
              <p id="error_en_reg" className='errorNotWrtd'>
                {errors.email}
              </p>
            )
          }

          <div className='row'>
            <div className='col-2'></div>
            <div className='col-8'>
              <input id="inpt_reg_new" onChange={(e) => handleChange(e)} className="form-control" type="password" placeholder="Contraseña" value={input.password} name='password' />
            </div>
            <div className='col-2'></div>
          </div>
          {
            errors.password && (
              <p id="error_en_reg" className='errorNotWrtd'>
                {errors.password}
              </p>
            )
          }

          <div className='row'>
            <div className='col-2'></div>
            <div className='col-8'>
              <input id="inpt_reg_new" onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="Direccion" value={input.direccion} name='direccion' />
            </div>
            <div className='col-2'></div>
          </div>
          {
            errors.direccion && (
              <p id="error_en_reg" className='errorNotWrtd'>
                {errors.direccion}
              </p>
            )
          }

          <button id='reg_cont_lg' value="Submit" className="btnlogincontinue" type="submit">Registrarse</button>
          <div className="row">
            <div className="col-12">
              <Link to={'/'}>
                <button className="btnloginback">Volver a inicio</button>
              </Link>
            </div>
          </div>

        </form>

      </div>
      <Footer />
    </div>
  )
}