const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

const uri = process.env.DB_URI;

const connectionDB = () =>
  mongoose
    .connect(uri)
    .then(() => console.log('Connected to DataBase Success'))
    .catch((err) => console.log(`Error connect to DataBase`, err));

module.exports = connectionDB;
