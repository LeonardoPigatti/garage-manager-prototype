const mongoose = require('mongoose')

const OficinaSchema = new mongoose.Schema({
  nome: String,
  cnpj: String,
  telefone: String,
  endereco: String,
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  membros: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Oficina', OficinaSchema)