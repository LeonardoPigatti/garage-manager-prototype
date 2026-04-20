const mongoose = require('mongoose')

const ServiceOrderSchema = new mongoose.Schema({
  osNumber: { type: String, unique: true },
  vnumber:  { type: String, required: true },
  customer:  { type: String, required: true },
  phone:    { type: String, required: true },
  mileage:  { type: Number, required: true },
  employee: { type: String, required: true },
  boxNumber:{ type: Number, required: true },
  entryDate:{ type: Date, required: true }
}, { timestamps: true })

module.exports = mongoose.model('ServiceOrder', ServiceOrderSchema)