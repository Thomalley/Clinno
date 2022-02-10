const { Router } = require("express");
const {Doctor, Especialidad, Clinica} = require("../db")
router = Router()

router.get("/:idEspecialidad/:idClinica", async (req, res, next) => {
    try{
        console.log(req.params)
        const {idEspecialidad, idClinica} = req.params
        const docDb = await Doctor.findAll({
            include: [{
                model: Especialidad,
                where: {
                    id:idEspecialidad
                }
            }, {
                model:Clinica,
                where:{
                    id: idClinica
                }
            }]
        })
        res.send(docDb)
    }catch(err){
        next(err)
    }
})


router.post("/", async (req, res, next) => {
    try {
        // let newArray = [
        //     "Miguel Becerra",
        //     "Sonia Rodrigues",
        //     "Victorina Perdomo",
        //     "Otilia Alarcon",
        //     "Maria-Consuelo Sole",
        //     "César Vazquez",
        //     "Socorro Muñiz",
        //     "Andreu Vilar",
        //     "Vanesa Castilla",
        //     "Yassine Duque",
        //     "Izaro Sales",
        //     "Jose-Manuel Farre",
        //     "Roser Canto",
        //     "Iris Olmedo",
        //     "Mariona Domenech",
        //     "Flor Morales",
        //     "Emílio Robledo",
        //     "Ines Veiga",
        //     "Simon Urbano",
        //     "Judit Buendia",
        // ]
        
        const {
            nombre,
            clinica,
            especialidad
        } = req.body

        const newDoctor = await Doctor.create({
            nombre,
        })
        await newDoctor.addEspecialidad(especialidad)
        await newDoctor.addClinica(clinica)

    res.json(newDoctor)
    }catch(err){
        next(err)
    }
})




module.exports = router