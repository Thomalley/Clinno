const { Router } = require("express");
const {Doctor, Especialidad} = require("../db")
router = Router()

router.get("/", async (req, res, next) => {
    try {
        let newArray = [
            "Miguel Becerra",
            "Sonia Rodrigues",
            "Victorina Perdomo",
            "Otilia Alarcon",
            "Maria-Consuelo Sole",
            "César Vazquez",
            "Socorro Muñiz",
            "Andreu Vilar",
            "Vanesa Castilla",
            "Yassine Duque",
            "Izaro Sales",
            "Jose-Manuel Farre",
            "Roser Canto",
            "Iris Olmedo",
            "Mariona Domenech",
            "Flor Morales",
            "Emílio Robledo",
            "Ines Veiga",
            "Simon Urbano",
            "Judit Buendia",
        ]
    newArray.map( d => {
        Doctor.findOrCreate({
            where:{
                name: d,
            }
        })
    })
    const docs = await Doctor.findAll({include: Especialidad})
    res.send(docs)
    }catch(err){
        next(err)
    }
})




module.exports = router