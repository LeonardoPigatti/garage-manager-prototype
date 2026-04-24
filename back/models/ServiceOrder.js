const mongoose = require('mongoose')

const ServiceOrderSchema = new mongoose.Schema({
  osNumber:  { type: String, unique: true },
  vnumber:   { type: String, required: true },
  customer:  { type: String },
  phone:     { type: String },
  mileage:   { type: Number },
  employee:  { type: String },
  boxNumber: { type: Number },
  entryDate: { type: Date },
  items: [{
    id:       { type: String },
    item:     { type: String },
    price:    { type: Number },
    quantity: { type: Number }
  }]
}, { timestamps: true })

module.exports = mongoose.model('ServiceOrder', ServiceOrderSchema)