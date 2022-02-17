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
            dniCliente
        } = req.body
        const turnoDb = await Turno.create({
            fecha,
            hora,
            idClinica,
            dniCliente,
            idEspecialidad,
            idDoctor
        })

        res.json(turnoDb)
    } catch (err) {
        console.log(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const turnos = await Turno.findAll()
        res.send(turnos)
    } catch (e) {
        console.log(e)
    }
})

router.get('/disponibilidad/:fecha/:idDoctor', async (req, res) => {
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

router.get('/doctor/:idDoctor', async (req, res) => {
    try {
        const { idDoctor } = req.params

        const turnos = await Turno.findAll({
            where: {
                idDoctor: idDoctor
            }
        })
        res.send(turnos)
    } catch (e) {
        console.log(e)
    }
})

router.get('/clinica/:idClinica', async (req, res) => {
    try {
        const { idClinica } = req.params

        const turnos = await Turno.findAll({
            where: {
                idClinica: idClinica
            }
        })
        res.send(turnos)
    } catch (e) {
        console.log(e)
    }
})

router.get('/documento/:documento', async (req, res) => {
    try {
        const { documento } = req.params
        console.log(documento)
        const turnos = await Turno.findAll({
            where: {
                dniCliente: documento.toString()
            }
        })
        res.send(turnos)
    } catch (e) {
        console.log(e)
    }
})

//si rompe es por que se pisa con get(/)
router.get('/:id', async(req, res) => {
    try{
        const {id} = req.params
        const turnoDbID = await Turno.findByPk(id)
        res.send(turnoDbID)
    }
    catch (err){
        console.log(err)
    }
})


module.exports = router