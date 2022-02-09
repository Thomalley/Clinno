const { Router } = require("express");
const {Clinica, Especialidad} = require("../db")
router = Router()

router.post('/', async (req,res) => {
    try{
        const {nombre, direccion, telefono, mail, password, nombreEn, apellidoEn, DNIEn, especialidad} = req.body;
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
        const clinDb = await Clinica.findAll({})
        res.send(clinDb)
    }
    catch(err){
        console.log(err)
    }
})
router.get('/', async (req, res) => {
    try{
        const clinAllDb = await Clinica.findAll({})
        res.send(clinAllDb)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router