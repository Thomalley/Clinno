import { useEffect } from 'react'
import Cookies from 'universal-cookie';
import NavBar from '../NavBar/NavBar'
import './checkout_style.css';

export default function Comprar({ productos, data }) {
  const cookies = new Cookies();
  const nombre = cookies.get('nombre');
  useEffect(() => {
    const script = document.createElement('script');
    const attr_data_preference = document.createAttribute('data-preference-id')
    attr_data_preference.value = data.id
    var backHome = document.createElement("button");
    backHome.innerHTML = 'Volver a inicio';
    backHome.onclick = function () {
      window.location.href = '../../';
    }
    backHome.className = 'btn btn-secondary'

    script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference)

    document.getElementById('generico').appendChild(script)
    document.getElementById('generico').appendChild(backHome)
    return () => {
      document.getElementById('generico').removeChild(script);
    }
  }, [data])
  return (
    <div className='container'>
      <form id='form1'>

        <NavBar loggin={true} />
        <div className="entre_nav_turno_res"></div>
        <div className='contenedor_resumen'>
          <div className='row'>
            <div className="col-12">
              <div className='cont_titles'>
                <h3 className="mainTitle">Hola {nombre}!</h3>
                <h5 className="subTitle">A continuacion detallamos tu resumen: </h5>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className="col-12" >
              {productos.map((producto, i) => {
                return (
                  <div className='container_MP_tur' key={i}>
                    <ul className='ul_mp_cont' >
                      <li><strong>Tipo de servicio: </strong> {producto.title}</li>
                      <li><strong>Valor: </strong>{'$' + producto.price}</li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='buttons_MP_ord'>
            <div id='generico'>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}