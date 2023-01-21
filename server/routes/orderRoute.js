const express = require('express');
const Order = require('../models/orders');
const router = express.Router();


router.post('/createOrder', async (req, res) => {
    console.log(req.body.userId)
    console.log(req.body.orderItems)
    if(!req.body.userId || !req.body.orderItems){
        res.send({message:"please write data needed"})
    }else{
        const newOrder = new Order ({userId:req.body.userId, userItem: req.body.orderItems})
        await newOrder.save();
        res.send(newOrder)
        console.log(newOrder)
    }
})



router.get('/list', async (req, res) => {
  try {
    const response = await Order.find({});

    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send('something went wrong');
  }
});


module.exports = router;