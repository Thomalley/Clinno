const { Router } = require("express");
router = Router()
const { Mensualidad } = require('../db');

router.post('/', async (req, res) => {
    try {
        const {cuota, clinicaId, orderId} = req.body
        const newMensu = await Mensualidad.create({
            cuota,
            clinicaId,
            orderId
        })
        res.send(newMensu)
    } catch (e) {
        console.log(e)
    }
});

module.exports = router