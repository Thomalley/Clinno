import './MercadoPago.css'
import React, { useEffect, useState } from 'react'
import Checkout from './Checkout.jsx'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { postOrder, postMensualidad, getMercadoPago } from '../../../actions'
import { useDispatch, useSelector } from 'react-redux';
function MercadoPago() {
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const idClinica = cookies.get("clinica_id")
  const orderId = useSelector((state) => state.order)
  const [datos, setDatos] = useState("")
  useEffect(() => {
    if (idClinica) {
      dispatch(postOrder(idClinica))
    }
  }, [])
  var cuota = 2000
  useEffect(() => {
    if (orderId) {
      dispatch(postMensualidad(idClinica, orderId.id))
      dispatch(getMercadoPago(orderId.id))
    }

  }, [orderId])

  const productos = [
    { title: "Servicio", quantity: 1, price: 2000 },
  ]

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <div className="mercadopago">
            {!datos
              ?
              <div>
                <img src='https://booking.smu.edu.sg/images/loader.gif' alt='Loading' />
                <p>Aguarde un momento....</p>
              </div>
              : <Checkout productos={productos} data={datos} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default MercadoPago;