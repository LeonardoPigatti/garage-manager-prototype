const express = require('express')
const router = express.Router()
const Oficina = require('../models/Oficina')
const ServiceOrder = require('../models/ServiceOrder')

// ─── ORDENS DE SERVIÇO (antes do /:userId) ───────────

router.post('/service-orders', async (req, res) => {
  try {
    const order = await ServiceOrder.create(req.body)
    res.json({ success: true, order })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

router.get('/service-orders', async (req, res) => {
  try {
    const orders = await ServiceOrder.find().sort({ createdAt: -1 })
    res.json({ success: true, orders })
  } catch (err) {
    res.status(500).json({ success: false })
  }
})

router.get('/service-orders/:id', async (req, res) => {
  try {
    const order = await ServiceOrder.findById(req.params.id)
    if (!order) return res.status(404).json({ success: false })
    res.json({ success: true, order })
  } catch (err) {
    res.status(500).json({ success: false })
  }
})

// ─── OFICINA (depois, pois /:userId é genérico) ───────

router.post('/', async (req, res) => {
  const oficina = await Oficina.create(req.body)
  res.json({ success: true, oficina })
})

router.get('/:userId', async (req, res) => {
  const oficina = await Oficina.findOne({ ownerId: req.params.userId })
  if (!oficina) return res.status(404).json({ success: false })
  res.json({ success: true, oficina })
})

module.exports = router