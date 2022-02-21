const { Router } = require("express");
const {Clinica, Especialidad, Doctor} = require("../db")
router = Router()
const {
  API_KEY
} = process.env;

router.post('/', async (req,res) => {
    try{
        const {nombre, direccion, telefono, password, mail, nombreEn, apellidoEn, DNIEn, especialidad} = req.body;
        
        let codigo = Math.floor(Math.random() * 1000000);
        //check unique
        let check = true;
        const docDb = await Clinica.findAll({});
        while (check) {
            let arr = docDb.filter(e => { return e.codigo === codigo });
            if (arr.length > 0) {
                codigo = Math.floor(Math.random() * 10000);
            } else {
                check = false;
            }
        }
        const cli = await Clinica.create({
          nombre,
          direccion,
          telefono,
          mail,
          password,
          codigo,
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
      const {mail, nombre} = req.body;
  
      console.log(mail)
      console.log(API_KEY)
  
       const sgMail = require('@sendgrid/mail')
  

        sgMail.setApiKey(API_KEY)
  
        const message = {

          to: mail,

          from : "clinnoturnos@gmail.com",

          subject: `El proceso de baja ha comenzado`,
          html: `
          <html>
        <head>
            <body>
            <h2> Hola ${nombre } queremos informarte que ya estamos trabajando con la anulacion de suscripción de su clinica.  </h2>
            <h2> Desde Clinno nos entristece mucho esta noticia y nos gustaria saber el porque de la misma. Si no es mucha molestia agrdaeceriamos si pudieran completar esta pequeña encuesta: </h2>
            <h2>https://forms.gle/SAJgf56SPZxDUHEr7</h2>
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

router.post('/mail-codigo', (req,res)=> {
    try{
      const {mail, password,codigo, nombre} = req.body;
  
      console.log(mail)
  
       const sgMail = require('@sendgrid/mail')
  

        sgMail.setApiKey(API_KEY)
  
        const message = {

          to: mail,

          from : "clinnoturnos@gmail.com",

          subject: `Recuperacion de Codigo Clinica ${nombre}`,
          html: `
          <html>
        <head>
            <body>
            <h2> Hola Clinica ${nombre } queremos informarte que tu codigo de inicio de sesion es ${codigo}  </h2>
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


    router.put('/validacion/:id', async(req, res) => {
        try {
            const { id } = req.params
            const clinica = await Clinica.findByPk(id)
            await clinica.update({ hablitada: true })
            await clinica.save()
            res.send(clinica)
        } catch (e) {
            console.log(e)
        }
    })
    router.put('/desavalidacion/:id', async(req, res) => {
        try {
            const { id } = req.params
            const clinica = await Clinica.findByPk(id)
            await clinica.update({ hablitada: false })
            await clinica.save()
            res.send(clinica)
        } catch (e) {
            console.log(e)
        }
    })
    router.put('/darbaja/:id', async(req, res) => {
        try {
            const { id } = req.params
            const clinica = await Clinica.findByPk(id)
            await clinica.update({ hablitada: false })
            await clinica.update({ baja:true })
            await clinica.save()
            res.send(clinica)
        } catch (e) {
            console.log(e)
        }
    })

    router.put('/darsubida/:id', async(req, res) => {
        try {
            const { id } = req.params
            const clinica = await Clinica.findByPk(id)
            await clinica.update({ hablitada: false})
            await clinica.update({ baja:false })
            await clinica.save()
            res.send(clinica)
        } catch (e) {
            console.log(e)
        }
    })

module.exports = router