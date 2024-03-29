const { Router } = require("express");
router = Router()
var passport = require('passport');
const { Cliente, Order } = require('../db');
const {
    API_KEY
} = process.env;
// ruta que devuelva clientes//
//Get/cliente//
router.get('/', (req, res, next) => {
    Cliente.findAll().then(clientes => { res.json(clientes); }).catch(error => { res.status(400).json({ error }) })
});

//ruta para crear cliente//
//Post/cliente//

//  router.post('/socialAuth', async (req, res, next) => {
//      const { email, familyName, givenName, googleId, imageUrl, nombre } = req.body

//      const cliente = await cliente.findOne({ where: { email } }).catch(error => { res.status(400).json({ error }) })

//      if(cliente){
//        return res.json(cliente)
//      }else{
//        const newcliente = await cliente.create({
//          email,
//          nombre,
//          lastName: familyName,
//          password: googleId,
//          direccion: 'Otamendi 95',
//          image: imageUrl
//        })

//        return res.json(newcliente)
//      }
//    });


router.post("/", async (req, res) => {
    try {
        const { email, password, nombre, apellido, direccion, dni, datosCompletados } = req.body;


        const cliente = await Cliente.create({
            nombre,
            apellido,
            email,
            direccion,
            dni,
            password,
            datosCompletados
        })
        res.json(cliente)

        const sgMail = require('@sendgrid/mail')



        sgMail.setApiKey(API_KEY)

        const message = {
            to: req.body.email,

            from: "clinnoturnos@gmail.com",

            subject: `Usuario registrado con exito!`,
            html: `

     <html>
 <head>
      <body>
      <h2> Hola ${req.body.nombre} desde Clinno estamos contentos de informarte que tu registro de usuario ha sido confirmado con exito </h2>
      </body>
   </head>
 </html>`
        }

        sgMail
            .send(message)
            .then((response) => console.log('Email sent...'))
            .catch((error) => console.log(error.message))
    } catch (error) {
        console.log(error)
    }
});


//modifica usuario//
router.put('/:id', (req, res) => {
    Cliente.findOne({
        where: { id: req.params.id }
    }).then(cliente => {
        cliente.update({
            email: req.body.email,
            password: req.body.password,
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            admin: req.body.admin,
        }).then(cliente => { res.status(200).json({ cliente }); }).catch(error => { res.status(400).json({ error }) });
    }).catch(error => { res.status(400).json({ error }) })
});


//Crea ruta para eliminar Usuario//
//DELETE/clientes/:id//
router.delete('/:id', (req, res) => {
    Cliente.destroy({
        where: { id: req.params.id }
    }).then(deletedRecord => {
        if (deletedRecord === 1) { res.status(200).json({ message: "cliente deleted successfully" }); } else { res.status(404).json({ message: "cliente not found" }) }
    }).catch(error => { res.status(500).json(error); });
});

//ruta login google?//
router.post('/google',
    passport.authenticate('local', { failureMessage: "An error appeared" }),
    async function (req, res) {
        try {
            const cliente = req.cliente
            if (cliente) {
                res.status(200).json({ cliente })
                // res.redirect('/beers')
            } else {
                console.log('usuario no encontrado');
            }
        } catch (err) {
            res.status(400).json({ msg: 'esto fallo' })
        }
    });

router.get('/failed', (req, res) => res.send('No se ha podido logearte con google'))

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.json({
            isAdmin: false,
            message: 'cliente not authenticated'
        })
    }
}

function isAdmin(req, res, next) {
    if (req.cliente.admin === true) {
        next();
    } else {
        res.redirect('/admin');
    }
}

// atributo admin al usuario //
router.put('/promote/:idcliente', (req, res) => {
    ClientendOne({
        where: { id: req.params.Cliente }
    })
        .then(cliente => {
            cliente.update({
                admin: !cliente.admin
            }).then(cliente => { res.status(200).json({ cliente }) })
        }).catch(error => { res.status(400).json({ error }) })
});


//ruta para ver cliente 'me'=== /GET /CLIENTE/ME"
router.get('/me',
    isAuthenticated,
    function (req, res) {
        return res.json(req.cliente);
    });

//reset password//
router.put('/:id/passwordReset', async (req, res) => {
    try {
        console.log(req.body)
        let cliente = await Cliente.findByPk(req.params.id);
        await cliente.update({ password: req.body.password })
        await cliente.save()
        res.json(cliente)
    } catch (err) {
        console.log(err)
    }
})

//login//
//POST /users/login

router.post('/login', (req, res) => {
    var nombre = req.body.nombre,
        password = req.body.password;
    Cliente.findOne({ where: { nombre: nombre } }).then(function (cliente) {
        if (!cliente) { res.redirect('/login'); } else if (!cliente.validPassword(password)) { res.redirect('/login'); } else {
            req.session.cliente = user.dataValues;
            res.redirect('/me');
        }
    });
});





//google//
// server.post('/google', 
// passport.authenticate('local',{failureMessage:"An error appeared"}),
//   async function(req, res) {
//     try {
//       const cliente=req.cliente
//       if (cliente) {
//         res.status(200).json({cliente})

//       } else {
//         console.log('cliente no encontrado');
//       }
//     } catch (err) {
//       res.status(400).json({msg: 'fallo'}) 
//     }
//   });
//   server.get('/failed', (req, res) => res.send('No se ha podido logearte con google'))





//orden de mail confirmacion//

router.post('/order-mail', (req, res) => {
    try {
        const { email, password, nombre, apellido, direccion, dni } = req.body;

        console.log(email)

        const sgMail = require('@sendgrid/mail')




        sgMail.setApiKey(API_KEY)


        const message = {
            to: email,

            from: "clinnoturnos@gmail.com",

            subject: `contraseña!`,
            html: `

        <html>
      <head>
          <body>
          <h2> Hola ${nombre} tu contraseña es ${password} </h2>
          </body>
      </head>
      </html>`
        }

        sgMail
            .send(message)
            .then((response) => console.log('Email sent...'))
            .catch((error) => console.log(error.message))
    } catch (error) {
        console.log(error)
    }
});


// // const transporter = nodemailer.createTransport({
// //   service:'gmail',
// //   auth:{
// //     user: "clinnoturnos@gmail.com",
// //     pass: "Clinno2022"
// //   }
// // })

// // const mailOptions = {
// // from : "clinnoturnos@gmail.com",
// // to: req.body.email,
// // subject: `Usuario registrado con exito`,
// // html: `
//      <html>
// <head>
//      <body>
//      <h2> Hola ${req.body.nombre} desde Clinno estamos contentos de informarte que tu registro de usuario ha sido confirmado con exito </h2>
//      </body>
//   </head>
// </html>`
// }
// transporter.sendMail(mailOptions, (error, info) => {
//   if(error){
//     res.status(500).send(error.message)
//   }else{
//     conmouseleave.log("Email enviado con exito")
//     res.status(200).json(req.body)
//   }
// })
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const clienDb = await Cliente.findByPk(id)
        res.send(clienDb)
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/dni/:documento', async (req, res) => {
    try {
        const { documento } = req.params
        const clienDb = await Cliente.findAll({ where: { dni: documento } })
        res.send(clienDb)
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/email/:email', async (req, res) => {
    try {
        const { email } = req.params
        const client = await Cliente.findOne({ where: { email: email } })
        res.send(client)
    }
    catch (e) {
        console.log(e)
    }
})

router.put('/actualizar/:email', async (req, res) => {
    try {
        const {email} = req.params;
        const {direccion, dni, datosCompletados} = req.body;
        console.log(direccion)
        console.log(dni)
        const cliente = await Cliente.findOne({ where: { email: email } })
        await cliente.update({ direccion: direccion })
        await cliente.update({ dni: dni })
        await cliente.update({ datosCompletados: datosCompletados })
        await cliente.save()
        res.send(cliente)
    }
    catch (e) {
        console.log(e)
    }
});


module.exports = router;
