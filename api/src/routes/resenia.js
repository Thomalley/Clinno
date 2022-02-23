const { Router } = require("express");
const { Resenia } = require("../db");
router = Router();

router.get("/", (req, res) => {
    Resenia.findAll()
        .then((resenia) => {
            res.json(resenia);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
});

router.get("/:id", (req, res) => {
    const {id} = req.params
    Resenia.findByPk(id)
        .then((reseniaId) => {
            res.json(reseniaId);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
});

router.post("/", async(req, res) => {
    try {
        const {idTurno} = req.body
        
        const resenia = await Resenia.create({
            idTurno
        })
        res.send(resenia);
    } catch (e) {
        console.log(e)
    }
})

router.put("/", async(req, res) => {
    try {
        
        const { calificacionDoctor, calificacionClinica, calificacionClinno, comentario, reviewed, idTurno } = req.body;

        const reseniaEncontrada = await Resenia.findOne({
            where: {
                idTurno: idTurno
            }
        })
        
        await reseniaEncontrada.update({ calificacionDoctor: calificacionDoctor })
        await reseniaEncontrada.update({ calificacionClinica: calificacionClinica })
        await reseniaEncontrada.update({ calificacionClinno: calificacionClinno })
        await reseniaEncontrada.update({ comentario: comentario })
        await reseniaEncontrada.update({ reviewed: reviewed })
        await reseniaEncontrada.save()
        res.send(reseniaEncontrada)
            } catch (e) {
                console.log(e)
            }
        });

      

module.exports = router;