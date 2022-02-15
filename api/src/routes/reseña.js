const { Router } = require("express");
router = Router()
const { Reseña} = require('../db');

router.get('/', (req, res, next) => {
    Reseña.findAll().then(reseña => { res.json(reseña); }).catch(error => { res.status(400).json({ error }) })
});


router.put("/", async (req,res) => {  
    try{
     const {calificacion, comentario, reviewed} = req.body;

     console.log(calificacion, comentario, reviewed)

      const reseña = await Reseña.update({
        calificacion,
        comentario,
        reviewed
      }) 
      res.json(reseña)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router