const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const router = express.Router();
require('dotenv').config();

router.post('/login', async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    //validate inputs
    if (!(email && password)) {
      return res.status(400).send('All inputs need to be filled');
    }

    //find user
    const user = await User.findOne({ email });

    //if user does not exist
    if (!user) {
      return res
        .status(400)
        .send('user does not exist please register or check your email');
    }

    //if user exist and password is correct
    if (await bcrypt.compare(password, user.password)) {
      user.password = undefined;
      return res.status(200).json(user);
    } else {
      return res.status(400).send('Wrong Password');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/register', async (req, res) => {
  try {
    // Get user input
    const { name, email, password } = req.body;

    // Validate user input
    if (!(name && email && password)) {
      return res.status(400).send('All inputs required');
    }

    // check if user already exist
    const oldUser = await User.findOne({ email: email.toLowerCase() });

    // Validate if user exist in database
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
