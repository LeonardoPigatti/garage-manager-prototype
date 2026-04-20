const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

// REGISTER
router.post('/register', async (req, res) => {
  const { email, password, type } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({ success: false })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    email,
    password: hashedPassword,
    type
  })

  res.json({ success: true, user })
})

// LOGIN
router.post('/login', async (req, res) => {
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
      type: user.type
    }
  })
})

// ESQUECI A SENHA
const crypto = require('crypto')
const nodemailer = require('nodemailer')

// Armazena códigos temporariamente (use Redis em produção)
const resetCodes = {}

// ROTA 1: Envia o email com código
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.json({ success: true }) // não revela se existe

  const code = Math.floor(1000 + Math.random() * 9000).toString()
  resetCodes[email] = { code, expires: Date.now() + 10 * 60 * 1000 } // 10 min

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
})

// ROTA 2: Verifica o código
router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body
  const record = resetCodes[email]

  if (!record || record.code !== code || Date.now() > record.expires) {
    return res.status(400).json({ success: false })
  }

  res.json({ success: true })
})

// ROTA 3: Redefine a senha
router.post('/reset-password', async (req, res) => {
  const { email, password } = req.body
  const record = resetCodes[email]

  if (!record) return res.status(400).json({ success: false })

  const hashedPassword = await bcrypt.hash(password, 10)
  await User.findOneAndUpdate({ email }, { password: hashedPassword })

  delete resetCodes[email]
  res.json({ success: true })
})

module.exports = router