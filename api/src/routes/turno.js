const { Router } = require("express");
const {Turno, Cliente, Clinica, Especialidad, Doctor} = require("../db")
router = Router()

router.post("/", async (req,res) => {
    try{
        const {fecha, hora, idClinica, idEspecialidad, doctor } = req.body
      const turnoDb =  Turno.create({fecha, hora})
    //   await turnoDb.addCliente({direccion , email})
    await turnoDb.addClinica(idClinica)
    await turnoDb.addEs
      res.send(turnoDb)
    }
    catch(err){
        console.log(err)
    }
} )

module.exports = router