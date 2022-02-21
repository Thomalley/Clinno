import "./MercadoPago.css";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { postOrder, postMensualidad, getMercadoPago } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../NavBar/NavBar";
import Checkout from "./Checkout"

function MercadoPago() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const nombre = cookies.get("nombre");
  const mpData = useSelector((state) => state.mpData);

  // useEffect(() => {
  //   if (orderId.id > 0) {
  //     dispatch(postMensualidad(idClinica, orderId.id));
  //     dispatch(getMercadoPago(input))
  //   }
  // }, [orderId]);

  const productos = mpData?.items?.map(e => e)

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="mercadopago">
            {!mpData ? (
              <div>
                <img
                  src="https://booking.smu.edu.sg/images/loader.gif"
                  alt="Loading"
                />
                <p>Aguarde un momento....</p>
              </div>
            ) : <Checkout productos={productos} data={mpData} />
          }
        </div>
      </div>
    </div>
  </div>
);
}

export default MercadoPago;
