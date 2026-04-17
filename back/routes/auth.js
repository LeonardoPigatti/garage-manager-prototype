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

module.exports = router