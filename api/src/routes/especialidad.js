const { Router } = require("express");
router = Router()
const { Especialidad, Clinica } = require('../db')

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

router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params
        const clinDb = await Especialidad.findByPk(
            id,
            {include: Clinica}
        )
        res.send(clinDb)
    }
    catch(err){
        console.log(err)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const {
            nombre,
            horaComienzo,
            horaFinal
        } = req.body
        let horario = [];
            for(let i = horaComienzo ; i <= horaFinal ; i++){
                horario.push(i) 
            }
        // let hora = horario.toString(', ')
        const newEspe = await Especialidad.create({nombre, horario})
        res.send(newEspe)
    }catch(err){
        next(err) 
    }
})
module.exports = router