import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  admin_user_validate,
  getClinicas,
  validate_clinica,
  deshabilitar_clinica,
  darBaja_clinica,
  darSubida_clinica
} from "../../actions";
import swal from "sweetalert";

export default function RootUser() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const clinicas = useSelector((state) => state.clinicas);
  const [clinic, setClinic] = useState([]);
  const [loggeado, setLoggeado] = useState(false);
  const [hablitar, setHablitar] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (!loggeado) {
      dispatch(getClinicas());
      setClinic(clinicas);
    }
  }, [loggeado]);

  useEffect(() => {
    dispatch(admin_user_validate(input));
  }, [input]);

  function logreq() {
    if (admin.length > 0) {
      setLoggeado(true);
      setInput({
        username: "",
        password: "",
      });
      return swal("Bienvenido", "Datos validados exitosamente", "success");
    }

    setLoggeado(false);
    return swal("Error", "Datos incorrectos", "warning");
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(admin_user_validate(input));
    setTimeout(logreq(), 1000);
  }

  function handleHabilitar(e){
        dispatch(validate_clinica(e));
        setLoggeado(true);
        dispatch(getClinicas());
        swal("Success", "Clinic was successfully habilited", "success")
        setTimeout(()=> window.location.href='./m9gap4npJJFlorV7uuej2bVfsL7b8N', 2000)
    }
    function handleSubida (e){
        dispatch(darSubida_clinica(e));
        setLoggeado(true);
        dispatch(getClinicas());
        swal("Success", "Clinic was successfully habilited", "success")
        setTimeout(()=> window.location.href='./m9gap4npJJFlorV7uuej2bVfsL7b8N', 2000)
    }
    function handleBaja (e){
        dispatch(darBaja_clinica(e));
        setLoggeado(true);
        dispatch(getClinicas());
        swal("Success", "Clinic was successfully habilited", "success")
        setTimeout(()=> window.location.href='./m9gap4npJJFlorV7uuej2bVfsL7b8N', 2000)
    }

  function handleDeshabilitar(e){
      dispatch(deshabilitar_clinica(e));
      setLoggeado(true);
      dispatch(getClinicas());
      swal("Success", "Clinic was successfully unhabilited", "success")
      setTimeout(()=> window.location.href='./m9gap4npJJFlorV7uuej2bVfsL7b8N', 2000)
  }


  return (
    <>
      {!loggeado ? 
        <div>
          <h2>Soy el admin</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <div className="col-12 ">
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  id="username"
                  value={input.username}
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={input.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btnLoggin">
                  Continuar
                </button>
              </div>
            </div>
          </form>
        </div>
       : 
        <>
          <h2>Administración de Clinicas de Clinno.</h2>
          <h4>Bienvenido Software Engineer</h4>
          {clinicas?.map((c) => (
          <div class="card">
            <div class="card-header">
                Informacion de la Clinica:
            </div>
                <div class="card-body">
                    <h5 class="card-title">{c.nombre}</h5>
                    <p class="card-text">Mail: {c?.mail}  </p>
                    <br />
                    <p class="card-text">Password: {c?.password} </p>
                    <br />
                    <p class="card-text">Codigo: {c?.codigo} </p>
                    <br />                    
                    {
                      
                      !c.hablitada?
                      <button onClick={()=>{handleHabilitar(c.id)}} class="btn btn-primary" >Habilitiar</button>
                      :
                      <button onClick={()=>{handleDeshabilitar(c.id)}} class="btn btn-warning" >Deshabilitar</button>

                    }{
                      !c.baja?
                        <button onClick={()=>{handleBaja(c.id)}} class="btn btn-danger" >Dar la Baja</button>
                        :
                        <button onClick={()=>{handleSubida(c.id)}} class="btn btn-warning" >Reactivar la Baja</button>
                      }
                    
                </div>
            </div>
          ))}
        </>
      }
    </>
  );
}
