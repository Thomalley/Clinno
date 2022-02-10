const { Router } = require("express");
const { Turno, Cliente, Clinica, Especialidad, Doctor } = require("../db")
router = Router()

router.post("/", async (req, res) => {
  try {
    const {
      fecha,
      hora,
      idClinica,
      idEspecialidad,
      idDoctor,
      idCliente
    } = req.body
    const turnoDb = await Turno.create({
      fecha,
      hora,
      idClinica,
      idCliente,
      idEspecialidad,
      idDoctor
    })
    res.json(turnoDb)
  }
  catch (err) {
    console.log(err)
  }
})

module.exports = router