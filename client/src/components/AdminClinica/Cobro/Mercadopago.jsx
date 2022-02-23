


import React,{ useEffect, useState } from 'react'
import Checkout from './Checkout.jsx'
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { getMensualidad, getMercadoPago } from "../../../actions";
import axios from 'axios';
function MercadoPago() {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const nombre = cookies.get("nombre");
  const id = cookies.get("clinica_id")
  const [mensualidad, setMensualidad] = useState({})

  const mpData = useSelector((state) => state.mpData);
  // const mensualidad = useSelector((state) => state.mensualidad)

  useEffect(() => {
    dispatch(getMensualidad(id)).then((data) => setMensualidad(data?.payload))
  }, [])


  const [datos, setDatos] = useState("")
  useEffect(()=>{
    if(mensualidad?.orderId !== undefined){
  
    axios
    .get(`/mercadopago/${mensualidad?.orderId}/${mensualidad?.unit_price}`)
    .then((data)=>{
      setDatos(data.data)
    })
    .catch(err => console.error(err)) 
  }
  },[mensualidad])



const productos = [
  {title: mensualidad?.title, price: mensualidad?.unit_price},
]
  return (
    <div className="App">
      { !datos
        ? <p>Aguarde un momento....</p> 
        : <Checkout productos={productos} data={datos}/>
      }
    </div>
  );
}

export default MercadoPago;