const { Router } = require("express");
const {Turno, Cliente} = require("../db")
router = Router()

router.post("/", async (req,res) => {
    try{
        const { estado, direccion, email, turno } = req.body
      const turnoDb =  Turno.create({estado, turno})
      await turnoDb.addCliente({direccion , email})
      res.send(turnoDb)
    }
    catch(err){
        console.log(err)
    }
} )

module.exports = router