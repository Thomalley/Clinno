const router = require('express').Router();
const { Order, Order_detail } = require('../db');

router.post('/', async (req, res) => {
    try {
    const { clinicaId } = req.body
    const newOrder = await Order.create({
        clinicaId: clinicaId,
    })
    
    // await Order_detail.create({
    //         orderId,
    //         quantity: 1,
    //         price: cuota
    //     })
        res.send(newOrder)
    } catch (e) {
        console.log(e)
    }
});


router.get('/detalle/:i', (req, res, next) => {
    const id = req.params.id

    Order.findOne({
        where: {
            id: id,
        },
        include: {
            model: Order_detail,
            where: { orderId: id }
        }
    })
        .then(obj => {
            res.send(obj)
        })
        .catch(next)
});



module.exports = router;