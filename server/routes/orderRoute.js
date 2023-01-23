const express = require('express');
const Order = require('../models/orders');
const router = express.Router();

router.post('/order', async (req, res) => {
  try {
    const { userId, orderItems } = req.body;
    const order = await Order.create({
      userId,
      orderItems,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/list', async (req, res) => {
  const { userId } = req.query;
  try {
    const response = await Order.find({ userId });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send('something went wrong');
  }
});

module.exports = router;
