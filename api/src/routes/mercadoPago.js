const { Order, Mensualidad } = require('../db.js');
const router = require('express').Router();

// SDK de Mercado Pago

const mercadopago = require('mercadopago');


// const { ACCESS_TOKEN } = process.env;

//Agrega credenciales

mercadopago.configure({
    access_token: "TEST-8165276433250363-120722-129ddb09bd6c5a032ed6a9f98d41eb04-1034725152"
});



//Ruta que genera la URL de MercadoPago
router.get("/:orderId", (req, res, next) => {
    const cuota = 2000
    // const id_orden = 1
    const {orderId} = req.params
    console.log(orderId)
    //Cargamos el carrido de la bd
    const carrito = [
        { title: "Servicio mensual", quantity: 1, price: cuota }
    ]

    const items_ml = carrito.map(i => ({
        title: i.title,
        unit_price: i.price,
        quantity: i.quantity,
    }))

    // Crea un objeto de preferencia
    let preference = {
        items: items_ml,
        external_reference: `${orderId}`,
        payment_methods: {
            excluded_payment_types: [{
                id: "atm"
            }],
            installments: 3 //Cantidad máximo de cuotas
        },
        back_urls: {
            success: '/mercadopago/pagos',
            failure: '/mercadopago/pagos',
            pending: '/mercadopago/pagos',
        },
    };

    mercadopago.preferences.create(preference)
    .then(function(response) {
            console.info('respondio')
                //Este valor reemplazará el string"<%= global.id %>" en tu HTML
            global.id = response.body.id;
            console.log(response.body)
            res.json({ id: global.id });
        })
        .catch(function(error) {
            console.log(error);
        })
})


//Ruta que recibe la información del pago
router.get("/pagos", (req, res) => {
    console.info("EN LA RUTA PAGOS ", req)
    const payment_id = req.query.payment_id
    const payment_status = req.query.status
    const external_reference = req.query.external_reference
    const merchant_order_id = req.query.merchant_order_id

    console.log("EXTERNAL REFERENCE ", external_reference)

    //Aquí edito el status de mi orden
    Order.findByPk(external_reference)
        .then((order) => {
            order.payment_id = payment_id
            order.payment_status = payment_status
            order.merchant_order_id = merchant_order_id
            order.status = "completed"
            console.info('Salvando order')
            order.save()
                .then((_) => {
                    console.info('redirect success')

                    return res.redirect("http://localhost:3000")
                })
                .catch((err) => {
                    console.error('error al salvar', err)
                })
        })
        .catch(err => {
            console.error('error al buscar', err)
        })
})


//Busco información de una orden de pago
router.get("/pagos/:id", (req, res) => {
    const mp = new mercadopago(ACCESS_TOKEN)
    const id = req.params.id
    console.info("Buscando el id", id)
    mp.get(`/v1/payments/search`, { 'status': 'pending' }) //{"external_reference":id})
        .then(resultado => {
            console.info('resultado', resultado)
            res.json({ "resultado": resultado })
        })
        .catch(err => {
            console.error('No se consulto:', err)
            res.json({
                error: err
            })
        })
})

module.exports = router;