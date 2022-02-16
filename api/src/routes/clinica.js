const { Router } = require("express");
const {Clinica, Especialidad, Doctor} = require("../db")
router = Router()
const {
  API_KEY
} = process.env;

router.post('/', async (req,res) => {
    try{
        const {nombre, direccion, telefono, password, mail, nombreEn, apellidoEn, DNIEn, especialidad} = req.body;
        const cli = await Clinica.create({
          nombre,
          direccion,
          telefono,
          mail,
          password,
          nombreEn,
          apellidoEn,
          DNIEn,
        })
        await cli.addEspecialidad(especialidad)
        res.send(cli)
    }
    catch(err){
        console.log(err)
    }
})

router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params
        
        const clinDb = await Clinica.findByPk(
            id,
            {include: [{
                model: Especialidad,
            }, {
                model: Doctor,
            }]}
        )
        res.send(clinDb)
    }
    catch(err){
        console.log(err)
    }
})
router.get('/', async (req, res) => {
    try{
        const clinAllDb = await Clinica.findAll({include:Especialidad})
        res.send(clinAllDb)
    }
    catch(err){
        console.log(err)
    }
})
router.post('/order-mail', (req,res)=> {
    try{
      const {mail, password, nombre} = req.body;
  
      console.log(mail)
  
       const sgMail = require('@sendgrid/mail')
  
        sgMail.setApiKey(API_KEY)
  
        const message = {

          to: email,

          from : "brunosentinelli@gmail.com",

          subject: `El proceso de baja ha comenzado`,
          html: `
          <html>
        <head>
            <body>
            <h2> Hola ${nombre } queremos informarte que ya estamos trabajando con la anulacion de suscripción de su clinica.  </h2>
            <h2> Desde Clinno nos entristece mucho esta noticia y nos gustaria saber el porque de la misma. Si no es mucha molestia agrdaeceriamos si pudieran completar esta pequeña encuesta: </h2>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeu_6FNiYnlIQHNOmVh47ZUrBYr9b4EYKmXB0vBIjSmLaZOkA/viewform?embedded=true" width="640" height="1387" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
            </body>
        </head>
        </html>`
        }
  
        sgMail
        .send(message)
        .then((response) => console.log ('Email sent...'))
        .catch((error) => console.log (error.message))
        }
        catch(error){
        console.log(error)
        }
        });
router.post('/addEspecialidad', async (req, res) => {
    try{
        const payload = req.body;
        const {clinica, especialidad} = payload;
        const clinDb = await Clinica.findByPk(clinica)
        especialidad.map(async (e)=>{
            await clinDb.addEspecialidad(parseInt(e,10))
        })
        res.send(clinDb)
    }
    catch(err){
        console.log(err)
    }
})



module.exports = router