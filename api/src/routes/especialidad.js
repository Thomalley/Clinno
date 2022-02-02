const { Router } = require("express");
router = Router()
const { Especialidad } = require('../db')

router.get('/', async (req, res, next) => {
    try {
        // let newArray = [
        //     "Fisiatría",
        //     "Pediatría",
        //     "Traumatología",
        //     "Cardiología",
        //     "Gastroenterología",
        //     "Neurología",
        //     "Psiquiatría",
        //     "Kinesiología",
        //     "Psicología",
        //     "Nutrición",
        //     "Fonoaudiología"
        // ];

        // newArray.forEach((d, index) => {
        //     console.log(d)
        //     Especialidad.findOrCreate({
        //         where:{
        //             nombre: d,
        //             id: index + 1
        //             // doctor: 
        //         }
        //     })
        // })
        const espe = await Especialidad.findAll({})
        res.send(espe)
    }catch(error){
        next(error)
    }
})


router.post('/', async (req, res, next) => {
    try{
        const {nombre} = req.body

        const newEspe = await Especialidad.create({nombre})
        res.send(newEspe)
    }catch(err){
        next(err)
    }
})
module.exports = router