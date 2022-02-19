const { Router } = require("express");
const { Doctor, Especialidad, Clinica } = require("../db")
router = Router()
const {
    API_KEY
  } = process.env;
router.get("/:idEspecialidad/:idClinica", async(req, res, next) => {
    try {
        console.log(req.params)
        const { idEspecialidad, idClinica } = req.params
        const docDb = await Doctor.findAll({
            include: [{
                model: Especialidad,
                where: {
                    id: idEspecialidad
                }
            }, {
                model: Clinica,
                where: {
                    id: idClinica
                }
            }]
        })
        res.send(docDb)
    } catch (err) {
        next(err)
    }
})


router.post("/", async(req, res, next) => {
    try {
        // let newArray = [
        //     "Miguel Becerra",
        //     "Sonia Rodrigues",
        //     "Victorina Perdomo",
        //     "Otilia Alarcon",
        //     "Maria-Consuelo Sole",
        //     "César Vazquez",
        //     "Socorro Muñiz",
        //     "Andreu Vilar",
        //     "Vanesa Castilla",
        //     "Yassine Duque",
        //     "Izaro Sales",
        //     "Jose-Manuel Farre",
        //     "Roser Canto",
        //     "Iris Olmedo",
        //     "Mariona Domenech",
        //     "Flor Morales",
        //     "Emílio Robledo",
        //     "Ines Veiga",
        //     "Simon Urbano",
        //     "Judit Buendia",
        // ]
        const {
            nombre,
            clinica,
            especialidad,
            email,
            dni,
        } = req.body
        let codigo = Math.floor(Math.random() * 10000);
        //check unique
        let check = true;
        const docDb = await Doctor.findAll({});
        while (check) {
            let arr = docDb.filter(e => { return e.codigo === codigo });
            if (arr.length > 0) {
                codigo = Math.floor(Math.random() * 10000);
            } else {
                check = false;
            }
        }
        const newDoctor = await Doctor.create({
            nombre,
            codigo,
            email,
            dni
        })
        await newDoctor.addEspecialidad(especialidad)
        await newDoctor.addClinica(clinica)
        res.json(newDoctor)
    } catch (err) {
        next(err)
    }
})

router.get("/", async(req, res, next) => {
    try {
        const docDb = await Doctor.findAll({
            include: [{ model: Especialidad, }, { model: Clinica, }]
        })
        res.send(docDb)
    } catch (err) {
        next(err)
    }
})

router.get("/clinica", async(req, res, next) => {
    try {
        const docDb = await Doctor.findAll({
            include: [{ model: Especialidad, }, { model: Clinica, }]
        })
        res.send(docDb)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params
        const docDb = await Doctor.findByPk(id)
        res.send(docDb)
    } catch (err) {
        console.log(err)
    }
})

router.post('/order-mail', (req,res)=> {
    try{
      const {email, password,codigo, nombre} = req.body;

      console.log(email)

       const sgMail = require('@sendgrid/mail')


        sgMail.setApiKey(API_KEY)

        const message = {

          to: email,

          from : "clinnoturnos@gmail.com",

          subject: `Recuperacion de Codigo Doctor ${nombre}`,
          html: `
          <html>
        <head>
            <body>
            <h2> Hola ${nombre } queremos informarte que tu codigo de inicio de sesion es ${codigo}  </h2>
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



module.exports = router