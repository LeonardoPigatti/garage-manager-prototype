const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  type: {
    type: String,
    enum: ['Administrador', 'Gerente', 'Atendente', 'Financeiro'],
    default: 'Atendente'
  },
  oficinaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Oficina',
    default: null
  }
})

module.exports = mongoose.model('User', UserSchema)