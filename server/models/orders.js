const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({


  userId:{type:String, required:true},
  orderItems: [],
 
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
