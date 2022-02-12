const { Router } = require("express");
const { Turno, Cliente, Clinica, Especialidad, Doctor } = require("../db")
router = Router()

router.post("/", async(req, res) => {
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
    } catch (err) {
        console.log(err)
    }
})

router.get('/', async(req, res) => {
    try {
        const turnos = await Turno.findAll()
        res.send(turnos)
    } catch (e) {
        console.log(e)
    }
})

router.get('/disponibilidad/:fecha/:idDoctor', async(req, res) => {
    const { fecha, idDoctor } = req.params
    try {
        const turnos = await Turno.findAll({
            where: {
                fecha: fecha,
                idDoctor: idDoctor
            }
        })
        let horariosOcupados = []
        let horario = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        if (turnos.length !== 0) {
            turnos.map(e => horariosOcupados.push(e.hora))
            const horariosLibres = horario.filter(e => {
                if (!horariosOcupados.includes(e)) {
                    return e
                }
            });
            return res.send(horariosLibres)
        } else {
            return res.send(horario)
        }
    } catch (e) {
        console.log(e)
    }
})

module.exports = router