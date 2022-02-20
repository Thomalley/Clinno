import './RegisterClinic.css'
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {registrarClinica, getEspecialidad, getClinicas} from '../../actions/index';
import swal from 'sweetalert';
import logo from '../../components/utils/images-landing/logo.png'
import Footer from '../Home/Footer';



export default function RegisterClinic(){

  //CONST DECLARATION
    const clinicas = useSelector((state) => state.clinicas)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const especialidad = useSelector((state)=> state.especialidades);

  const regExName = /^[A-Za-z][a-zA-Z ]{2,40}$/;
  const regExEmail= /^\S+@\S+$/i;
  const regExNumber = /^[0-9]*$/gm;
  
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    nombre : "",
    direccion : "",
    telefono : "",
    mail : "",
    password : "",
    nombreEn : "",
    apellidoEn : "",
    DNIEn : "",
    especialidad :[],
})

//USEEFFECT

useEffect ( () => {
  dispatch(getEspecialidad())
},[dispatch])

useEffect ( () => {
  dispatch(getClinicas())
},[dispatch])
  


//VALIDATE
function validate(error){
  console.log(error)
let errors = {};

if (!input.nombre || input.nombre === "" ||  !regExName.test(input.nombre)){
  errors.nombre = 'Campo Requerido: Nombre de la clinica solo letras y espacios. Entre 2 y 40 caracteres';
}

if (!input.apellidoEn || input.apellidoEn === "" ||  !regExName.test(input.apellidoEn)){
errors.apellidoEn = 'Campo Requerido: Apellido solo letras y espacios. Entre 3 y 40 caracteres';
}

if (!input.telefono || input.telefono === "" || !regExNumber.test(input.telefono) ||  input.telefono.length < 7 ||  input.telefono.length > 15){
errors.telefono = 'Campo Requerido: Telefono mayor a 7 digito, menor a 15 digitos';
}

if (!input.mail || input.mail === "" || !regExEmail.test(input.mail)){
errors.mail = 'Campo Requerido: e-mail. ejemplo@ejemplomail.com';
}

if (!input.nombreEn || input.nombreEn === "" ||  !regExName.test(input.nombreEn)){
  errors.nombreEn = 'Campo Requerido: Nombre solo letras y espacios. Entre 2 y 40 caracteres';
}

if (!input.password || input.password === "" ||  input.password.length < 7 ||  input.password.length > 30){
errors.password = 'Campo Requerido: Contraseña mayor a 7 digitos, menos a 30 digitos';
}

if (!input.direccion || input.direccion === "" || input.direccion.length < 3 ||  input.direccion.length > 50){
errors.direccion = 'Campo Requerido: Direccion mayor a 7 digitos, menos a 30 digitos';
}

if (!input.DNIEn || input.DNIEn === "" || (typeof(input.DNIEn) === 'number') ||  input.DNIEn.length < 6 ||  input.DNIEn.length > 10){
errors.DNIEn = 'Campo Requerido: DNI mayor a 7 digito, menor a 9 digitos';
}

if (!input.especialidad || input.especialidad === "" || input.especialidad.length === 0){
  errors.especialidad = 'Campo Requerido: Especialidades, la clinica debe contar con minimo 1 especialidad';
  }

return errors;
}

//HANDLES
function handleSubmit(e){
  e.preventDefault()
  setErrors(validate({
    ...input,
    [e.target.name]: e.target.value
  }));
  let registrado = false;
  
    for(let i=0; i<clinicas.length; i++){
      if (clinicas[i].mail === input.mail || clinicas[i].DNIEn === input.DNIEn){
        swal('El mail ya corresponde a un usuario registrado')
        registrado = true;
        break;
      }
    }

    if (!registrado && Object.values(validate(input)).length === 0){
    dispatch(registrarClinica(input))
      swal('Estamos verificando tu informacion!')
      navigate('/home')
    }else {swal('Corrija los errores antes de registrarse')}}


  
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

function handleSelect(e){
  setInput({
    ...input,
    especialidad: input?.especialidad?.includes(parseInt(e.target.value)) ? [...input.especialidad] : [...input.especialidad, parseInt(e.target.value)]
})
setErrors(validate({
  ...input,
  [e.target.name]: e.target.value
}));

}

function handleDelete(el){
  setInput({
    ...input,
    especialidad: input.especialidad.filter(esp => esp !== el)
})
}


  

  return (
    <div>
    <nav className="navbar sticky-top navbar-light bg-light">
    <Link className="navbar-brand" to='/'>
    <img className="imglogoR" src={logo} alt="nf" />
    </Link>
    </nav>
    <div className='container11'>
    <div className="col-12 m-1">
    <img className="imglogo" src={logo} alt="nf" />
    </div>
    <form onSubmit={(e) => handleSubmit(e)}>

      <input onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="Nombre de la clinica" value={input.nombre} name='nombre'/>
      <div>{errors.nombre && (<p className='errorMsg'>{errors.nombre}</p>)}</div>


      <input onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="Direccion" value={input.direccion} name='direccion' />
      <div>{errors.direccion && (<p className='errorMsg'>{errors.direccion}</p>)}</div>

      
      <input onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="Telefono (Solo Numeros)" value={input.telefono} name='telefono' />
      <div>{errors.telefono && (<p className='errorMsg'>{errors.telefono}</p>)}</div>


      <input onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="Mail" value={input.mail} name='mail' />
      <div>{errors.mail && (<p className='errorMsg'>{errors.mail}</p>)}</div>


      <input onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="Nombre" value={input.nombreEn} name='nombreEn'/>
      <div>{errors.nombreEn && (<p className='errorMsg'>{errors.nombreEn}</p>)}</div>


      < input onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="Apellido" value={input.apellidoEn} name='apellidoEn'/>
      <div>{errors.apellidoEn && (<p className='errorMsg'>{errors.apellidoEn}</p>)}</div>


      <input onChange={(e) => handleChange(e)} className="form-control" type="text" placeholder="DNI  (Solo Numeros)" value={input.DNIEn} name='DNIEn' />
      <div>{errors.DNIEn && (<p className='errorMsg'>{errors.DNIEn}</p>)}</div>
      

      <input onChange={(e) => handleChange(e)} className="form-control" type="password" placeholder="Contraseña" value={input.password} name='password' />
      <div>{errors.password && (<p className='errorMsg'>{errors.password}</p>)}</div>

      <br/>
      <label>Seleccione las especialidades de su clinica</label>

      <select class="form-select" aria-label="Default select example" onChange={(e) => handleSelect(e)}>
      <option  disabled selected>Selecione sus especialidades</option>
        {

          especialidad?.map((el) => <option value={el.id}>{el.nombre}</option>)
          
        }
      </select>
      <br/>
      
      {
        input.especialidad.length === 0 ? <div></div> : <p className="especialidadesP">Especialidades seleccionadas:</p>
      }
      
      <div className='especialidades-div'>
      
      {
          input.especialidad.map(el =>
              <div className='especialidad-div-2'>
                <button type="button" class="btn-close" aria-label="Close" onClick={() => handleDelete(el)}></button>
                  
                  <p>{especialidad?.find(esp => esp.id === el).nombre}</p>                  
              </div>)
      }
      </div>
      <div>{errors.especialidad && (<p className='errorMsg'>{errors.especialidad}</p>)}</div>
      <input className="col-12 btn btn-primary" type="submit" />
    </form>
    </div>
    <Footer/>
    </div>
  )}