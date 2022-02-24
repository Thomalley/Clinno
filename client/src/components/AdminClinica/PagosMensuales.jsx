import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Footer from "../Home/Footer";
import swal from "sweetalert";
import NavClinica from "../AdminClinica/NavClinica.jsx";

export default function PagosMensuales() {
  const [datos, setDatos] = useState([]);
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const id = cookies.get("clinica_id");

  useEffect(() => {
    axios
      .get(`/mensualidad/todas/${id}`)
      .then((data) => {
        setDatos(data.data)
      })
      .catch((err) => console.error(err));      
  }, []);

  console.log(datos?.datos?.map(e => e.createdAt.split()))

  let session = false;
  if (cookies.get("clinica_id") && cookies.get("clinica_codigo"))
    session = true;
  const [loggeado] = useState(session);
  //unit_price: Precio
  //title: "Servicio mensual de Clinno" esto es siempre el title
  if (loggeado) {
    return (
      <div>
        <div className="contenedor_adminClinica">
          <NavClinica />
          <h2>Pagos Mensuales Realizados</h2>
          <div className="d-flex justify-content-center alling-items-center gap-3 flex-wrap">
            {datos &&
              datos?.map((m) => {
                return (
                  <div className="d-flex flex-column justify-content-center alling-items-center">
                    <h2>{m?.title}</h2>
                    <h2>Fecha de pago:{`${m?.createdAt?.split("-")[0]}-${m?.createdAt?.split("-")[1]}-${m?.createdAt?.split("-")[2][0]}${m?.createdAt?.split("-")[2][1]}`} </h2>
                    <h4>Precio: {m?.unit_price}</h4>
                    {/* <h4>fecha: {m?.fecha} </h4> */}
                  </div>
                ); 
              })}
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    cookies.get("clinica_codigo")
      ? (window.location.href = "/loginClinica")
      : (window.location.href = "/adminClinica");
  }
}
