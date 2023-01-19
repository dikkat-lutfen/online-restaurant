const express = require('express');
const Pizza = require('../models/pizzas');
const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const response = await Pizza.find({});

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).send('something went wrong');
  }
});
module.exports = router;
