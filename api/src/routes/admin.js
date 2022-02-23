const { Router } = require("express");
const { Admin } = require("../db");
const { Clinica } = require("../db");
const {API_KEY} = process.env
router = Router();

router.post('/', async (req,res) =>{
    try{
        const admin = await Admin.findAll({})
        if(admin.length <1){
            const root = await Admin.create({})
            return res.send(root)
        }
        return res.send(admin)
    }
    catch(err){
        console.log(err)
    }
})

router.post("/mail-habilitar", (req, res) => {
  try {
    const { mail, codigo, nombre } = req.body;
    console.log(mail, codigo, nombre);

    const sgMail = require("@sendgrid/mail");

    sgMail.setApiKey(API_KEY);

    const message = {
      to: mail,

      from: "clinnoturnos@gmail.com",

      subject: `Bienvenido a Clinno!`,
      html: `
          <html>
        <head>
            <body>
            <h2>Hola  ${nombre} desde Clinno estamos contentos de informarte que tu Cuenta acaba de ser habilitada.</h2>
            <h2>Tu codigo de acceso es ${codigo}.</h2>
             </body>
        </head>
        </html>`,
    };

    sgMail
      .send(message)
      .then((response) => console.log("Email sent..."))
      .catch((error) => console.log(error.message));
  } catch (error) {
    console.log(error);
  }
});

// router.post("/alta-mail", (req, res) => {
//   try {
//     const { mail, codigo, nombre } = req.body;

//     console.log(mail);

//     const sgMail = require("@sendgrid/mail");

//     sgMail.setApiKey(API_KEY);

//     const message = {
//       to: mail,

//       from: "clinnoturnos@gmail.com",

//       subject: `Bienvenido a Clinno!`,
//       html: `
//                   <html>
//                 <head>
//                     <body>
//                     <h2>Hola  ${nombre} desde Clinno estamos contentos de informarte que tu Cuenta acaba de ser reactivada.</h2>
//                     <h2>Tu codigo de acceso es ${codigo}.</h2>
//                      </body>
//                 </head>
//                 </html>`,
//     };

//     sgMail
//       .send(message)
//       .then((response) => console.log("Email sent..."))
//       .catch((error) => console.log(error.message));
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
