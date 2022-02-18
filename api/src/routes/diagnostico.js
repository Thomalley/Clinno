const { Router } = require("express");
router = Router()
const { Diagnostico, Turno } = require("../db")

router.get('/turno/:idTurno', async(req, res) => {
    const { idTurno } = req.params
    try {
        const diagnDb = await Diagnostico.findAll({
            where: {
                idTurno: idTurno
            }
        })
        res.send(diagnDb)
    } catch (err) {
        console.log(err)
    }
})

router.get('/', async(req, res) => {
    const { id } = req.params
    try {
        const diagDetail = await Diagnostico.findAll({})
        res.send(diagDetail)
    } catch (err) {
        console.log(err)
    }
})

router.post('/', async (req,res) =>{
    try{
         const{ sintomas, diagnostico, indicaciones, estudio, idTurno} = req.body
          const diag = await Diagnostico.create({
              sintomas,
              diagnostico,
              indicaciones,
              estudio,
              idTurno
          })  
        //    diag.addTurno(idTurno)
          res.send(diag)
        }
    catch(err){
        console.log(err)
    }
})

module.exports = router