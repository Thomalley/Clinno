import "./MercadoPago.css";
import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { postOrder, postMensualidad, getMercadoPago } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
// import NavBar from "../../NavBar/NavBar";
import Checkout from "./Checkout"

function MercadoPago() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const idClinica = cookies.get("clinica_id");
  // const nombre = cookies.get("nombre");
  const orderId = useSelector((state) => state.order);
  const mpData = useSelector((state) => state.mpData);



  useEffect(() => {
    if (idClinica) {
      dispatch(postOrder(idClinica));
    }
  }, []);
  console.log(mpData)
 

  useEffect(() => {
    if (orderId.id > 0) {
      dispatch(postMensualidad(idClinica, orderId.id));
      dispatch(getMercadoPago(orderId.id))
    }
  }, [orderId]);

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
