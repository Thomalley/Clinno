const router = require("express").Router();
const { Mensualidad } = require("../db");



router.post("/", async (req, res) => {
  try {
    const { title, unit_price, quantity, clinicaId, orderId } = req.body;
    const newMensu = await Mensualidad.create({
      title,
      unit_price,
      quantity,
      clinicaId,
      orderId
    });
    res.send(newMensu);
  } catch (e) {
    console.log(e);
  }
});

router.get("/", async (req, res) => {
    try{
        const mensus = await Mensualidad.findAll({
            where:{
                abonado:false
            }
        });
        res.send(mensus)
    }catch(e){
        console.log(e)
    }
})
router.get("/clinica/:id", async (req, res) => {
  try {
      const { id } = req.params;
      console.log(id)
    const mensu = await Mensualidad.findOne({where:{
        clinicaId: id,
        abonado: false
    }});

    res.send(mensu);
  } catch (e) {
    console.log(e);
  }

});

module.exports = router;
