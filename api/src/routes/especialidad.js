const { Router } = require("express");
router = Router()
const { Especialidad } = require('../db')

router.get('/', async (req, res, next) => {
    try {
        let newArray = [
            "Fisiatría",
            "Pediatría",
            "Traumatología",
            "Cardiología",
            "Gastroenterología",
            "Neurología",
            "Psiquiatría",
            "Kinesiología",
            "Psicología",
            "Nutrición",
            "Fonoaudiología"
        ];
        newArray.forEach((d, index) => {
            Especialidad.findOrCreate({
                where:{
                    nombre: d,
                    id: index + 1
                }
            })
        })
        const espe = await Especialidad.findAll({})
        res.send(espe)
    }catch(err){
        next(err)
    }
})

module.exports = router