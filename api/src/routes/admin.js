const { Router } = require("express");
const { Admin } = require("../db")
router = Router()

router.post('/', async (req,res) =>{
    try{
        const admin = await Admin.findAll({})
        if(admin.length <1){
            const root = await Admin.create({})
            return res.send(root)
        }
        return res.send(admin)
    }
    catch(err){
        console.log(err)
    }
})


module.exports = router