const { Router } = require("express");
const {Clinica} = require("../db")
router = Router()

router.post('/', async (req,res) => {
    try{
        const {nombre, direccion, telefono, mail, password, nombreEn, apellidoEn, DNIEn} = req.body;
        const cli = await Clinica.create({
          nombre,
          direccion,
          telefono,
          mail,
          password,
          nombreEn,
          apellidoEn,
          DNIEn
        })

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