const { Router } = require("express");
router = Router()
const { Mensualidad } = require('../db');

router.post('/', async (req, res) => {
    try {
        const {clinicaId, orderId} = req.body
        const newMensu = await Mensualidad.create({
            clinicaId,
            orderId
        })
        res.send(newMensu)
    } catch (e) {
        console.log(e)
    }
});

router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params
        const mensu = await Mensualidad.findByPk(id)
        res.send(mensu)
    }
    catch(e){
        console.log(e)
    }
})

module.exports = router