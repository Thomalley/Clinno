const { Order, Mensualidad } = require("../db.js");
const router = require("express").Router();
const axios = require("axios");
const { ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

router.get("/:orderId/:unit_price", (req, res) => {
  const { orderId, unit_price } = req.params;
   
  let preference = {
    items: [
      {
        title: "Servicio mensual de Clinno",
        unit_price: parseInt(unit_price),
        quantity: 1,
      },
    ],
    external_reference: `${orderId}`,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "atm",
        },
        {
          id:"ticket",
        }
      ],
      installments: 3, //Cantidad máximo de cuotas
    },
    back_urls: {
      success: "/mercadopago/pagos",
      failure: "/mercadopago/pagos",
      pending: "/mercadopago/pagos",
    },
  };

  mercadopago.preferences
    .create(preference)

    .then(function (response) {
      global.id = response.body.id;
      res.json({id: global.id});
    })
    .catch(function (error) {
      console.log(error);
    });
});


router.get("/pagos", async (req, res) => {
  const payment_id = req.query.payment_id;
  const payment_status = req.query.status;
  const external_reference = req.query.external_reference;
  const merchant_order_id = req.query.merchant_order_id;

  const mensuAbonada = await Mensualidad.findOne({
    where: {
      orderId:external_reference
    }
  })
  //Aquí edito el status de mi orden
  Order.findByPk(external_reference)
    .then((order) => {
      order.payment_id = payment_id;
      order.payment_status = payment_status;
      order.merchant_order_id = merchant_order_id;
      order.status = "completed";
      console.info("Salvando order");
      order.save()
        .then((_) => {
          console.info("redirect success");
          mensuAbonada.update({abonado: true});
          mensuAbonada.save();
          return res.redirect("https://pg-clinno.vercel.app/adminClinica");
        })
        .catch((err) => {
          console.error("error al salvar", err);
          return res.redirect(
            "https://pg-clinno.vercel.app/adminClinica"
          );
        });
    })
    .catch((err) => {
      console.error("error al buscar", err);
      return res.redirect(
        "https://pg-clinno.vercel.app/adminClinica"
      );
    });

  //proceso los datos del pago
  //redirijo de nuevo a react con mensaje de exito, falla o pendiente
});

// //Busco información de una orden de pago
router.get("/pagos/:id", (req, res) => {
  const mp = new mercadopago(ACCESS_TOKEN);
  const id = req.params.id;
  console.info("Buscando el id", id);
  mp.get(`/v1/payments/search`, { status: "pending" }) //{"external_reference":id})
    .then((resultado) => {
      console.info("resultado", resultado);
      res.json({ resultado: resultado });
    })
    .catch((err) => {
      console.error("No se consulto:", err);
      res.json({
        error: err,
      });
    });
});

module.exports = router;
