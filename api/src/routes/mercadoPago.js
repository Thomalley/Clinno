const { Turno} = require('../db');
const nodemailer = require("nodemailer");
const { Router } = require("express");
router = Router()


// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

const { ACCESS_TOKEN } = process.env;

//Agrega credenciales
mercadopago.configure({
  access_token: "TEST-8165276433250363-120722-129ddb09bd6c5a032ed6a9f98d41eb04-1034725152"
});



// //Ruta que genera la URL de MercadoPago
router.get("/", (req, res, next) => {
    //PASAMOS LAS COSAS POR BODY
//   const { title, totalPrice, quantity, id} = req.body
// CARRITO HARCODEADO
const id_orden= 1

const carrito = [
    {title: "Producto 1", quantity: 5, price: 10.52},
    {title: "Producto 2", quantity: 15, price: 100.52},
    {title: "Producto 3", quantity: 6, price: 200}
  ]

//   Cargamos el carrido de la bd
// LAS CARGAMOS POR BODY
// const carrito = req.body ? [{...req.body}] : {msg: 'no hay nada'}
console.log(carrito, "linea 28 del mercadopago")

// ASI SE PASA SIN HARCODEAR

//   const items_ml =[ 
//   {
//     title: title,
//     unit_price: totalPrice,
//     quantity: totalPrice,
//   }
// ]

// ASI SE PASA HARCODEADO
const items_ml = carrito.map(i => ({
    title: i.title,
    unit_price: i.price,
    quantity: i.quantity,
}))

//   // Crea un objeto de preferencia
  let preference = {
    items: items_ml,
    // hay que pasar el por body, esta esta harcodeada
    external_reference : `${id_orden}`,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "atm"
        }
      ],
      installments: 3  //Cantidad máximo de cuotas
    },
    back_urls: {
      success: 'http://localhost:3001/mercadopago/pagos',
      failure: 'http://localhost:3001/mercadopago/pagos',
      pending: 'http://localhost:3001/mercadopago/pagos',
    },
  };

  mercadopago.preferences.create(preference)

  .then(function(response){
    // console.info('respondio')
  //Este valor reemplazará el string"<%= global.id %>" en tu HTML
    global.id = response.body.id;
    res.json({ id: global.id });
  })
  .catch(function(error){
    console.log( 'error del mercadopago', error);
  })
}) 

// esto no tengo idea porque esta

// res.json({id: global.id, init_point: response.body.init_point})

// ESTA RUTA NO SE PARA QUE ESTA, SI NO FUNCIONA EL GET PROBA CON EL POST

// router.post('/', (req, res, next) => {

//     // const {  title, totalPrice, quantity, id } = req.body
//     // let {carrito}  = req.body
//     let {body}  = req
//     // console.log('este es el fucking body', req.body.carrito);
    
//     // console.log('MERCADOPAGO 81 body', carrito);
//     // let title = carrito.map((e) =>  e.name)
    
//     // let quantity = carrito.map((i) => i.quantity)
//     // let unit_price = carrito.map((r) => r.price)
//     // const gh =[ { 
//     //          title: title[0],
//     //         unit_price: unit_price[0],
//     //         quantity: quantity[0]
//     // },{
//     //      title: title[1],
//     //         unit_price: unit_price[1],
//     //         quantity: quantity[1]
//     // }]
//     const gh = body.carrito.map(e => {
//       return {
//         title: e.name,
//         quantity: Number(e.quantity),
//         unit_price: e.price
//       }
//     })
//      console.log("data mercadopago", gh)
//     var preference = {
//         items: 
//          gh
//         ,
//         external_reference : `${req.body.id}`, //`${new Date().valueOf()}`,
//         back_urls: {
//             success: "/mercadopago/pagos",
//             failure: "/mercadopago/pagos",
//             pending: "/mercadopago/pagos"
//         },
//         auto_return: "approved"
//     };
//     console.log(preference);
//     mercadopago.preferences.create(preference)
//     .then(response => {
//       res.json({id: global.id, init_point: response.body.id})
//       console.log(response.body)
//     })
// })


//Ruta que recibe la información del pago
router.get("/pagos", (req, res)=>{
  // console.info("EN LA RUTA PAGOS ", req)
  const payment_id= req.query.payment_id
  const payment_status= req.query.status
  const external_reference = req.query.external_reference
  const merchant_order_id= req.query.merchant_order_id
  console.log("EXTERNAL REFERENCE ", external_reference)

  //Aquí edito el status de mi orden
  Order.findByPk(external_reference)
  .then((order) => {
    order.payment_id= payment_id
    order.payment_status= payment_status
    order.merchant_order_id = merchant_order_id
    order.status = "completed"
    console.info('Salvando order')
    order.save()
    .then((_) => {
      console.info('redirect success')
      
// ACA HAY ALGO DE NODEMAILER, MIRALO PORQUE YO NO TENGO NI IDEA

//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: "piwobeers@gmail.com",
//             pass: "Piwo1104"
//         } 
//     }) 
  
//     const mailOptions = {
//       from: "PiwoBeers<piwobeers@gmail.com>",
//       to: 'brunosentinelli@gmail.com',
//       subject: `Muchas gracias por tu compra en PIWO!!`,
//       html:`
//            <html>
//       <head>
//           <body>
//           <h1> ¡Hola ${req.body.name},  espero que estes teniendo el mejor de tus dias!. Te agradecemos por habernos elegido. </h1>
//               <h2>Total de la compra: $${req.body.totalPrice} </h2>
//               <img src= 'https://i.postimg.cc/9FC2YjWV/Piwo-logo.png'/>
//               </body>
//       </head>
//   </html>`
//   }
//   transporter.sendMail(mailOptions, (error, info) => {
//     if(error) {
//         res.status(500).send(error.message)
//     } else {
//         console.log("¡Email enviado con éxito!")
//         res.status(200).json(req.body)
//     }
//   })






      return res.redirect("http://localhost:3000")
    })
    .catch((err) =>{
      console.error('error al salvar', err)
      return res.redirect(`:http//localhost:3000/?error=${err}&where=al+salvar`)
    })
  })
  .catch(err =>{
    console.error('error al buscar', err)
    return res.redirect(`http://localhost:3000/?error=${err}&where=al+buscar`)
  })

  //proceso los datos del pago 
  //redirijo de nuevo a react con mensaje de exito, falla o pendiente
})


//Busco información de una orden de pago
router.get("/pagos/:id", (req, res)=>{
  const mp = new mercadopago(ACCESS_TOKEN)
  const id = req.params.id
  console.info("Buscando el id", id)
  mp.get(`/v1/payments/search`, {'status': 'pending'}) //{"external_reference":id})
  .then(resultado  => {
    console.info('resultado', resultado)
    res.json({"resultado": resultado})
  })
  .catch(err => {
    console.error('No se consulto:', err)
    res.json({
      error: err
    })
  })
})


module.exports = router;