const { Router } = require("express");
const {Clinica, Especialidad} = require("../db")
router = Router()

// router.post('/', async (req,res) => {
//     try{
//         const {nombre, direccion} = req.body;
//         const cli = await Clinica.create({
//           nombre,
//           direccion
//         })

//         res.send(cli)
//     }
//     catch(err){
//         console.log(err)
//     }
// })


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
module.exports = router