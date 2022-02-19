import './MercadoPago.css'
import { useEffect, useState } from 'react'
import Checkout from './Checkout.jsx'
import axios from 'axios'

function MercadoPago() {
  const [datos, setDatos] = useState("")

  useEffect(() => {
    axios
      .get("/mercadopago")
      .then((data) => {
        setDatos(data.data)
        console.info('Contenido de data:', data)
      })
      .catch(err => console.error(err))
  }, [])


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