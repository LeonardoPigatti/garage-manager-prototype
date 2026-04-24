const express = require('express')
const router = express.Router()
const Oficina = require('../models/Oficina')
const ServiceOrder = require('../models/ServiceOrder')
const User = require('../models/User')

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

// ← ROTA PUT ADICIONADA AQUI, antes do /:userId
router.put('/service-orders/:id', async (req, res) => {
  try {
    const order = await ServiceOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!order) return res.status(404).json({ success: false })
    res.json({ success: true, order })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// ─── OFICINA ─────────────────────────────────────────

router.post('/', async (req, res) => {
  try {
    const oficina = await Oficina.create({
      ...req.body,
      membros: [req.body.ownerId]
    })
    await User.findByIdAndUpdate(req.body.ownerId, { oficinaId: oficina._id })
    res.json({ success: true, oficina })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

router.post('/:oficinaId/membros', async (req, res) => {
  try {
    const { userId } = req.body
    await User.findByIdAndUpdate(userId, { oficinaId: req.params.oficinaId })
    await Oficina.findByIdAndUpdate(req.params.oficinaId, {
      $addToSet: { membros: userId }
    })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

router.get('/:userId', async (req, res) => {
  try {
    const oficina = await Oficina.findOne({ ownerId: req.params.userId })
    if (!oficina) return res.status(404).json({ success: false })
    res.json({ success: true, oficina })
  } catch (err) {
    res.status(500).json({ success: false })
  }
})

router.put('/:oficinaId', async (req, res) => {
  try {
    const oficina = await Oficina.findByIdAndUpdate(
      req.params.oficinaId,
      req.body,
      { new: true }
    )
    res.json({ success: true, oficina })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

module.exports = router