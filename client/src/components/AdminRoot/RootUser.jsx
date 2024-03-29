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
  adminUser,
  habilitacionCodigoMail,
  AltaClinica,
} from "../../actions";
import swal from "sweetalert";
import MercadoPago from "../AdminClinica/Cobro/Mercadopago";
import "./rootUser.css";

export default function RootUser() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const clinicas = useSelector((state) => state.clinicas);
  const mpData = useSelector((state) => state.mpData);
  const mensualidades = useSelector((state) => state.mensualidades);
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
    dispatch(getMensualidades());
    dispatch(adminUser());
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
      return swal("Bienvenido", "Datos validados exitosamente");
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
  console.log(mensualidades);
  function handleSubir(e) {
    e.preventDefault();
    if (datosMp.title !== "" && datosMp.clinicaId !== "") {
      if (mensualidades?.length !== 0) {
        if (mensualidades?.find((m) => m?.clinicaId === datosMp?.clinicaId)) {
          swal(
            "No se puede Cobrar a la clinica",
            "Ya existe una orden de cobro para esta clinica",
            "warning"
          );
        } else {
          dispatch(postMensualidad(datosMp));
          swal(
            "Has creado la orden de cobro con Exito!!",
            "Se creo la orden de cobro correctamente",
            "success"
          );
        }
      } else {
        dispatch(postMensualidad(datosMp));
        swal(
          "Has creado la orden de cobro con Exitos!!",
          "Se creo la orden de cobro correctamente",
          "success"
        );
      }
    }
  }

  function handleHabilitar(e) {
    //armar action para hacer un dispatch de funcion mail
    //dispach de action con la info necesaria para el mail
    //mandar por body codigo de acceso y nombre
    dispatch(validate_clinica(e.id));
    setLoggeado(true);
    dispatch(getClinicas());
    console.log(e);
    dispatch(habilitacionCodigoMail(e));
    swal("Success", "Clinic was successfully habilited", "success");
    // setTimeout(
    //   () => (window.location.href = "./m9gap4npJJFlorV7uuej2bVfsL7b8N"),
    //   2000
    // );
  }
  function handleSubida(e) {
    dispatch(darSubida_clinica(e.id));
    setLoggeado(true);
    dispatch(getClinicas());
    dispatch(AltaClinica(e));
    swal("Success", "Clinic was successfully habilited", "success");
    // setTimeout(
    //   () => (window.location.href = "./m9gap4npJJFlorV7uuej2bVfsL7b8N"),
    //   2000
    // );
  }
  function handleBaja(e) {
    dispatch(darBaja_clinica(e));
    setLoggeado(true);
    dispatch(getClinicas());
    swal("Success", "Clinic was successfully habilited", "success");
    // setTimeout(
    //   () => (window.location.href = "./m9gap4npJJFlorV7uuej2bVfsL7b8N"),
    //   2000
    // );
  }

  function handleDeshabilitar(e) {
    dispatch(deshabilitar_clinica(e));
    setLoggeado(true);
    dispatch(getClinicas());
    swal("Success", "Clinic was successfully unhabilited", "success");
    // setTimeout(
    //   () => (window.location.href = "./m9gap4npJJFlorV7uuej2bVfsL7b8N"),
    //   2000
    // );
  }
  useEffect(() => {
    setDatosMp({ ...datosMp, orderId: cobro.orderId });
  }, [cobro.orderId]);

  function handleChango(e) {
    e.preventDefault();
    setDatosMp({
      ...datosMp,
      unit_price: e.target.value,
    });
  }

  const cobrar = async (id) => {
    setDatosMp({ ...datosMp, clinicaId: id });
    await dispatch(postOrder(id)).then((data) =>
      setCobro({ ...cobro, orderId: data?.payload?.id })
    );
  };

  return (
    <>
      {!loggeado ? (
        <div className="bgroot">
          <div className="container">
            <div className="general_ROOT">
              <div className="row">
                <h2 style={{ color: "#858585" }}>ROOT USER</h2>
              </div>
              <div style={{ "margin-top": "1pc" }}></div>
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
                      className="inptsroot"
                    />
                    <br />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      id="password"
                      value={input.password}
                      onChange={(e) => handleChange(e)}
                      className="inptsroot"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      style={{ width: "180px" }}
                      className="btn btn-dark"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bgroot">
            <div style={{ display: "none" }}>
              <MercadoPago mpData={mpData} />
            </div>
            <div className="col">

            <div className="header_root_us">
              <h2>Administración de Clinicas de Clinno.</h2>
              <h6>Bienvenido Software Engineer</h6>
            </div>
            </div>

            <div style={{ "margin-top": "5pc" }}></div>

            <div className="row">
              <div className="col-3"></div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                {clinicas?.map((c) => (
                  <div className="card" key={c.id}>
                    <div
                      className="card-header"
                      style={{ "background-color": "#880c25" }}
                    >
                      Informacion de la Clinica:
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{c.nombre}</h5>
                      <div className="row">
                        <div style={{ "margin-bottom": "1pc" }}></div>

                        <p className="card-text">Mail: {c?.mail} </p>
                      </div>
                      <div className="row">
                        <div style={{ "margin-bottom": "5px" }}></div>

                        <p className="card-text">Password: {c?.password} </p>
                      </div>
                      <div className="row">
                        <div style={{ "margin-bottom": "5px" }}></div>

                        <p className="card-text">Codigo: {c?.codigo} </p>
                        <div style={{ "margin-bottom": "20px" }}></div>
                      </div>
                      {!c.hablitada ? (
                        <button
                          onClick={() => {
                            handleHabilitar(c);
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
                            style={{"color": "black"}}
                            id="exampleModal"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Estas a punto de generar una orden de cobro
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">
                                  <h3>
                                    Especifique el monto de la orden de pago{" "}
                                  </h3>
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
                                    <button
                                      type="submit"
                                      class="btn btn-primary"
                                    >
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
                            handleSubida(c);
                          }}
                          className="btn btn-warning"
                        >
                          Reactivar la Baja
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="col-3"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
