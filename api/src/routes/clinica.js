const { Router } = require("express");
const {Clinica} = require("../db")
router = Router()

router.post('/', async (req,res) => {
    try{
        const {nombre, direccion, logo} = req.body;
        const cli = await Clinica.create({
          nombre,
          direccion,
          logo
        })

        res.send(cli)
    }
    catch(err){
        console.log(err)
    }
})
router.get('/:id', async (req, res) => {
    try{
        const clinDb = await Clinca.findAll({})
        res.send(clinDb)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router