const { Router } = require("express");
router = Router()
const { Diagnostico, Cliente, Doctor } = require("../db")

router.get('/:id', async(req,res) =>{
    try{
        const diagnDb = await Diagnostico.findAll({})
        res.send(diagnDb)
    }
    catch(err){
        console.log(err)
    }
}
)

router.post('/', async (req,res) =>{
    try{
         const{ sintomas, diagnostico, medicamentos} = req.body
          const diag = await Diagnostico.create({
              sintomas,
              diagnostico,
              medicamentos
          })  
          res.send(diag)
        }
    catch(err){
        console.log(err)
    }
})
router.get("/", async(req,res) => {
    try{

    }
    catch(err){
        console.log(err)
    }
})

router.get('/', async (req,res) => {
    try{
        const diagRel = await Diagnostico.findAll({
            include :
            Cliente,
            Doctor
        })
        res.send(diagRel)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router