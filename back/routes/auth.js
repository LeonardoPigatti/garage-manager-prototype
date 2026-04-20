const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const User = require('../models/User')
const Oficina = require('../models/Oficina')

const resetCodes = {}

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { email, password, type } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ success: false })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      email,
      password: hashedPassword,
      type,
      oficinaId: null
    })

    res.json({ success: true, user })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// LOGIN — retorna oficinaId junto
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ success: false })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ success: false })

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        type: user.type,
        oficinaId: user.oficinaId ?? null
      }
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// ESQUECI A SENHA — envia código
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.json({ success: true }) // não revela se existe

    const code = Math.floor(1000 + Math.random() * 9000).toString()
    resetCodes[email] = { code, expires: Date.now() + 10 * 60 * 1000 }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Código de verificação - AutoMech',
      html: `<p>Seu código de verificação é: <strong>${code}</strong></p><p>Expira em 10 minutos.</p>`
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// VERIFICA CÓDIGO
router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body
  const record = resetCodes[email]

  if (!record || record.code !== code || Date.now() > record.expires) {
    return res.status(400).json({ success: false })
  }

  res.json({ success: true })
})

// REDEFINE SENHA
router.post('/reset-password', async (req, res) => {
  try {
    const { email, password } = req.body
    const record = resetCodes[email]

    if (!record) return res.status(400).json({ success: false })

    const hashedPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate({ email }, { password: hashedPassword })

    delete resetCodes[email]
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

module.exports = router