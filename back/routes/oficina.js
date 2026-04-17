const express = require('express')
const router = express.Router()
const Oficina = require('../models/Oficina')

// criar oficina
router.post('/', async (req, res) => {
  const oficina = await Oficina.create(req.body)
  res.json({ success: true, oficina })
})

// buscar por usuário
router.get('/:userId', async (req, res) => {
  const oficina = await Oficina.findOne({ ownerId: req.params.userId })

  if (!oficina) {
    return res.status(404).json({ success: false })
  }

  res.json({ success: true, oficina })
})

module.exports = router