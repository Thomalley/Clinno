import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  admin_user_validate,
  getClinicas,
  validate_clinica,
  deshabilitar_clinica,
  darBaja_clinica,
  darSubida_clinica,
  postOrder,
  getMercadoPago,
  postMensualidad,
  getMensualidades,
} from "../../actions";
import swal from "sweetalert";
import MercadoPago from "../AdminClinica/Cobro/Mercadopago";

export default function RootUser() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const clinicas = useSelector((state) => state.clinicas);
  const mpData = useSelector((state) => state.mpData);
  const mensualidades = useSelector((state) => state.mensualidades)
  const [clinic, setClinic] = useState([]);
  const [loggeado, setLoggeado] = useState(false);
  // const [hablitar, setHablitar] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [cobro, setCobro] = useState({
    unit_price: "",
    orderId: "",
  });
  const [datosMp, setDatosMp] = useState({
    title: "Servicio mensual de Clinno",
    unit_price: "",
    quantity: 1,
    clinicaId: "",
    orderId: "",
  });

    useEffect(() => {
      dispatch(getMensualidades())
    }, []);


    // console.log(mensualidades)
  // useEffect(() => {
  //   console.log(datosMp)
  //   if (datosMp.title !== "" && datosMp.clinicaId !== "") {
  //     if(mensualidades.length !== 0){
  //     //  console.log("entreeeeeeeee")
  //      mensualidades.find(m => m.clinicaId !== datosMp.clinicaId)? dispatch(postMensualidad(datosMp)): console.log("ya existe una orden de cobro para esta clinica")
  //    }else{
  //      console.log("entre a al else", datosMp)
  //      dispatch(postMensualidad(datosMp))
  //    }
  //   }
  // }, [datosMp]);

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
    setTimeout(() => logreq(), 1000);
  }
  
  function handleSubir(e) {
    e.preventDefault()
    if (datosMp.title !== "" && datosMp.clinicaId !== "") {
      if(mensualidades.length !== 0){
       console.log(datosMp)
       mensualidades.find(m => m.clinicaId === datosMp.clinicaId)? console.log("ya existe una orden de cobro para esta clinica") : dispatch(postMensualidad(datosMp)) 
     }else{
       console.log("entre a al else", datosMp)
       dispatch(postMensualidad(datosMp))
     }
    }
  }

  function handleHabilitar(e) {
    dispatch(validate_clinica(e));
    setLoggeado(true);
    dispatch(getClinicas());
    swal("Success", "Clinic was successfully habilited", "success");
    setTimeout(
      () => (window.location.href = "./m9gap4npJJFlorV7uuej2bVfsL7b8N"),
      2000
    );
  }
  function handleSubida(e) {
    dispatch(darSubida_clinica(e));
    setLoggeado(true);
    dispatch(getClinicas());
    swal("Success", "Clinic was successfully habilited", "success");
    setTimeout(
      () => (window.location.href = "./m9gap4npJJFlorV7uuej2bVfsL7b8N"),
      2000
    );
  }
  function handleBaja(e) {
    dispatch(darBaja_clinica(e));
    setLoggeado(true);
    dispatch(getClinicas());
    swal("Success", "Clinic was successfully habilited", "success");
    setTimeout(
      () => (window.location.href = "./m9gap4npJJFlorV7uuej2bVfsL7b8N"),
      2000
    );
  }

  function handleDeshabilitar(e) {
    dispatch(deshabilitar_clinica(e));
    setLoggeado(true);
    dispatch(getClinicas());
    swal("Success", "Clinic was successfully unhabilited", "success");
    setTimeout(
      () => (window.location.href = "./m9gap4npJJFlorV7uuej2bVfsL7b8N"),
      2000
    );
  }
  useEffect(() => {
    setDatosMp({...datosMp, orderId: cobro.orderId})
  }, [cobro.orderId])

  function handleChango(e) {
    e.preventDefault()
    setDatosMp({
      ...datosMp,
      unit_price: e.target.value,
    });
  }
  const cobrar = async(id)=>  {
    setDatosMp({...datosMp,clinicaId: id});
    await dispatch(postOrder(id)).then((data) =>
      setCobro({ ...cobro, orderId: data?.payload?.id })
    );
  }

  return (
    <>
      {loggeado ? (
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
      ) : (
        <>
          <div style={{ display: "none" }}>
            <MercadoPago mpData={mpData} />
          </div>
          <h2>Administración de Clinicas de Clinno.</h2>
          <h4>Bienvenido Software Engineer</h4>
          {clinicas?.map((c) => (
            <div className="card" key={c.id}>
              <div className="card-header">Informacion de la Clinica:</div>
              <div className="card-body">
                <h5 className="card-title">{c.nombre}</h5>
                <p className="card-text">Mail: {c?.mail} </p>
                <br />
                <p className="card-text">Password: {c?.password} </p>
                <br />
                <p className="card-text">Codigo: {c?.codigo} </p>
                <br />
                {!c.hablitada ? (
                  <button
                    onClick={() => {
                      handleHabilitar(c.id);
                    }}
                    className="btn btn-primary"
                  >
                    Habilitiar
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleDeshabilitar(c.id);
                    }}
                    className="btn btn-warning"
                  >
                    Deshabilitar
                  </button>
                )}
                {!c.baja ? (
                  <>
                    <button
                      onClick={() => {
                        handleBaja(c.id);
                      }}
                      className="btn btn-danger"
                    >
                      Dar la Baja
                    </button>

                    <button
                      onClick={() => {
                        cobrar(c.id);
                      }}
                      class="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Cobrar
                    </button>

                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Estas a punto de reagendar el turno
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <h3>Especifique el monto de la orden de pago </h3>
                            <input
                              type="number"
                              placeholder="Monto a cobrar"
                              name="unit_price"
                              value={datosMp.unit_price}
                              onChange={(e) => handleChango(e)}
                            />
                          </div>
                          <div class="modal-footer">
                            <form onSubmit={handleSubir}>
                              <button type="submit" class="btn btn-primary">
                                Continuar
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      handleSubida(c.id);
                    }}
                    className="btn btn-warning"
                  >
                    Reactivar la Baja
                  </button>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
