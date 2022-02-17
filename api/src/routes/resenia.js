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

router.post("/", async(req, res) => {
    try {
        const { calificacion, comentario, idTurno } = req.body
        const resenia = await Resenia.create({
            calificacion,
            comentario,
            idTurno
        })
        res.send(resenia);

    } catch (e) {
        console.log(e)
    }
})

router.put("/", async(req, res) => {
    try {
        const { calificacion, comentario, reviewed } = req.body;

        console.log(calificacion, comentario, reviewed);

        const resenia = await Resenia.update({
            calificacion,
            comentario,
            reviewed,
        });
        res.json(resenia);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;