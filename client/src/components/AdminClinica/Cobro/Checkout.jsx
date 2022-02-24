
import { useEffect } from "react";
import "./checkout_style.css"
 
export default function Comprar({ productos, data }) {
  useEffect(() => {
    const script = document.createElement("script"); //Crea un elemento html script

    const attr_data_preference = document.createAttribute("data-preference-id"); //Crea un nodo atribute
    attr_data_preference.value = data.id; //Le asigna como valor el id que devuelve MP

    //Agrega atributos al elemento script
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);


    //Agrega el script como nodo hijo del elemento form
    document.getElementById("form1").appendChild(script);
    return () => {
      //Elimina el script como nodo hijo del elemento form
      document.getElementById("form1").removeChild(script);
    };
    
  }, [data]);
  return(
    <div className="contenedor_resumen">
      <div style={{"margin-top":"6pc"}}></div>
      <div className="container">
        <div className="row">

  <form id='form1'>
  <div style={{"margin-top": "3pc"}}></div>

    <h4>Resumen de cuenta</h4>
    <div className="row" >  
    <div style={{"margin-top": "2pc"}}></div>
    <div className="col-4"></div>

    <div className="col-4">
    {productos.map((producto, i) => {
        return(
            <div key={i}>
              <ul className="ul_mp_cont">
                <li>{producto.title}</li>
                <li>{'$' + producto.price}</li> 
              </ul>
            </div>   
        )
    })}
</div>
    </div>   
  </form>
  </div>
  </div>
 </div>
)
}
