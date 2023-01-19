const mongoose = require('mongoose');

const pizzasSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  variants: [],
  prices: [],
  category: { type: String, require: true },
  image: { type: String, require: true },
  description: { type: String, require: true },
});

const pizzaModel = mongoose.model('Pizzas', pizzasSchema);

module.exports = pizzaModel;
