import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
// import { useDispatch,  } from 'react-redux';
import logo from "../../components/utils/images-landing/logo.png";
import Cookies from "universal-cookie";
import { getMensualidad } from "../../actions";
import "./NavClinicaStyle.css";
import { useDispatch, useSelector } from "react-redux";

export default function LoginClinica() {
  //   const mensu = useSelector((state) => state.mensualidad);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const id = cookies.get("clinica_id");

  //   console.log(mensu);
  // const [mensu, setMensu] = useState({});
  // useEffect(() => {
  //   dispatch(getMensualidad(id)).then((data) => setMensu(data?.payload));
  // }, []);
  // console.log(mensu)
  
  // useEffect(() => {
  //   if(Object.keys(mensu).length > 0){
  //       if (document.getElementById("abonarSiDebe43079")) {
  //         document.getElementById("abonarSiDebe43079").className = "ClientNoAbonado7845"
  //       }
  //       swal({
  //           title: "Pago pendiente!",
  //           text: "Por favor realice a la brevedad el pago de la mensualidad",
  //           icon: "warning",
  //           buttons: {
  //             value: "Abonar en otro momento",
  //               text: "Abonar ahora"
  //           }
  //       })
  //           .then((value) => {
  //               switch (value) {
  //                   case "text":
  //                       swal("Aguarde un momento","en instantes seras redirigido");
  //                       setTimeout(() => window.location.href = '/adminClinica/cobro', 2000)
  //                       break
  //                   case "value":
  //                       swal("No seas rata", "🐭", "warning");
  //                       break
  //                   default: return
  //               }
  //           })
  //       }else{
  //         if (document.getElementById("abonarSiDebe43079")){
  //           document.getElementById("abonarSiDebe43079").className = "ClientYaAbonado7845"
  //         }
  //       }
  // }, [mensu])
  // const dispatch = useDispatch();

  // function new_turno() {
  //     swal({
  //         title: "Crear turno para cliente",
  //         text: `Eliga una opcion : `,
  //         icon: "warning",
  //         buttons: {
  //             cancel: "Cliente no registrado",
  //             catch: "Cliente registrado",
  //         }
  //     })
  //         .then((value) => {
  //             switch (value) {
  //                 case "catch":
  //                     swal({
  //                         title: "Aguarde un instante",
  //                         text: "Sera redirigido para crear el turno",
  //                         icon: "https://samehnashaat.com/assets/images/loader.svg",
  //                     })
  //                     setTimeout(() => window.location.href = '/adminClinica/cliente', 2000)
  //                     break
  //                 default:
  //                     swal({
  //                         title: "Aguarde un instante",
  //                         text: "Sera redirigido a la pagina de registro",
  //                         icon: "https://samehnashaat.com/assets/images/loader.svg",
  //                     })
  //                     setTimeout(() => window.location.href = '/adminClinica/cliente/registrar', 2000)
  //                     break
  //             }
  //         });
  // }
  const removedor  = async() =>{
    cookies.remove("clinica_mail");
    cookies.remove("clinica_nombre");
    cookies.remove("clinica_telefono");
    cookies.remove("clinica_direccion");
    cookies.remove("clinica_id");
    cookies.remove("clinica_nombreEn");
    cookies.remove("clinica_apellidoEn");
    cookies.remove("clinica_DNIEn");
    cookies.remove("clinica_codigo");
    cookies.remove("clinica_createdAt");
    cookies.remove("doctor_nombre");
    cookies.remove("doctor_id");
    cookies.remove("doctor_codigo");
    cookies.remove("doctor_especialidades");
    setTimeout(() =>console.log(cookies.get("doctor_id")) , 1000);
    
  }
  const cerrarSesion = async () => {

    await removedor()
    swal(
      "Has cerrado la sesion con exito!!",
      "En instantes seras redirigido a Inicio",
      "success"
    );
    setTimeout(() => (window.location.href = "/"), 2000);
  };

  return (
    <main>
      <div className="d-flex flex-column align-items-center flex-shrink-0 p-3 text-white bg-dark nav_clinica">
        {window.location.pathname.toLowerCase().includes("/soydoctor") ? (
          <Link
            to="/soyDoctor"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none "
          >
            {/* <span className="fs-4">Sidebar</span> */}
            <img src={logo} alt="img" className="logo_clinno_navC" />
          </Link>
        ) : (
          <Link
            to="/adminClinica"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none "
          >
            {/* <span className="fs-4">Sidebar</span> */}
            <img src={logo} alt="img1" className="logo_clinno_navC" />
          </Link>
        )}
        <hr />
        {window.location.pathname.toLowerCase().includes("/soydoctor") ? (
          <ul className="nav nav-pills flex-column mb-auto ">
            <li className="nav-item">
              <Link
                to="/soyDoctor"
                className="nav-link text-white boton_nav_clinica"
                aria-current="page"
              >
                Soy Doctor
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/soyDoctor/turnosDelDia"
                className="nav-link text-white boton_nav_clinica"
                aria-current="page"
              >
                Turnos Del Día
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/soyDoctor/historialTurnos"
                className="nav-link text-white boton_nav_clinica"
                aria-current="page"
              >
                Historial de Turnos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/soyDoctor/proximosTurnos"
                className="nav-link text-white boton_nav_clinica"
                aria-current="page"
              >
                Proximos Turnos
              </Link>
            </li>
            {/* <li className="nav-item">
                        <Link to='/SoyDoctor/me' className="nav-link text-white boton_nav_clinica" aria-current="page">Ver Mis Datos</Link>
                    </li> */}
          </ul>
        ) : (
          <ul className="nav nav-pills flex-column mb-auto ">
            <li className="nav-item">
              <Link
                to="/adminClinica"
                className="nav-link text-white boton_nav_clinica"
                aria-current="page"
              >
                Administración de Clinica{" "}
              </Link>
            </li>
            {/* <li>
                        <Link to='/adminClinica' className="nav-link text-white boton_nav_clinica">Ver proximos turnos</Link>
                    </li> */}
            <li>
              <Link
                to="/adminClinica/AddDoctor"
                className="nav-link text-white boton_nav_clinica"
              >
                Agregar Doctor
              </Link>
            </li>
            <li>
              <Link
                to="/adminClinica/verDoctores"
                className="nav-link text-white boton_nav_clinica"
              >
                Ver Doctores
              </Link>
            </li>
            <li>
              <Link
                to="/adminClinica/estadisticas"
                className="nav-link text-white boton_nav_clinica"
              >
                Ver Estadisticas
              </Link>
            </li>
            <li>
              <Link
                to="/adminClinica/cliente"
                className="nav-link text-white boton_nav_clinica"
              >
                Buscar paciente por DNI
              </Link>
            </li>
            <li>
              <Link
                to="/adminClinica/mensualidades"
                className="nav-link text-white boton_nav_clinica"
              >
                Ver Mensualidades
              </Link>
            </li>
            {/* {mensu.title !== "" ? (
            //   <li>
            //     <Link
            //       to="/adminClinica/cobro"
            //       className="nav-link text-white boton_nav_clinica"
            //     >
            //       Abonar mensualidad en Clinno
            //     </Link>
            //   </li>
            swal({
                title: "Pago pendiente!",
                text: "Por favor realice a la brevedad el pago de la mensualidad",
                icon: "warning",
                buttons: {
                    text: "Abonar ahora",
                    value: "Abonar en otro momento"
                }
            })
                .then((value) => {
                    switch (value) {
                        case "text":
                            swal("Aguarde un momento","en instantes seras redirigido");
                            setTimeout(() => window.location.href = '/adminClinica/cobro', 2000)
                            break
                        case "value":
                            swal("No seas rata", "🐭", "warning");
                            break
                        default: return
                    }
                })
            ) : (
              false
            )} */}
            {/* <li id="abonarSiDebe43079" className="undefined_877">
              <Link
                to="/adminClinica/cobro"
                className="nav-link text-white boton_nav_clinica"
              >
                Abonar mensualidad en Clinno
              </Link>
            </li> */}
          </ul>
        )}

        <hr />
        {!window.location.pathname.toLowerCase().includes("/soydoctor") ? (
          <div className="dropdown d-flex  align-items-end justify-conter-end ">
            <a
              href="#"
              className="d-flex align-items-center justify-conter-center text-white btn btn-primary dropdown-toggle dropdown-toggle-split"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <strong>{cookies.get("clinica_nombre")}</strong>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <button
                className="btn btn-primary dropdown-item"
                type="button"
                onClick={cerrarSesion}
              >
                Cerrar sesion
              </button>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link to="/adminClinica/me" className="dropdown-item">
                  Ver Mi Perfil
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="dropdown d-flex  align-items-end justify-conter-end ">
            <a
              href="#"
              className="d-flex align-items-center justify-conter-center text-white btn btn-primary dropdown-toggle dropdown-toggle-split"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <strong>{cookies.get("doctor_nombre")}</strong>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <button
                className="btn btn-primary dropdown-item"
                type="button"
                onClick={cerrarSesion}
              >
                Cerrar sesion
              </button>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link to="/soyDoctor/me" className="dropdown-item">
                  Ver Mi Perfil Doctor
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
