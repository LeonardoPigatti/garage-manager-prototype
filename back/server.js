const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// 🔗 conexão MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/oficina')
  .then(() => console.log('Mongo conectado'))
  .catch(err => console.log(err))

// modelo usuário
const User = mongoose.model('User', {
  email: String,
  password: String,
  type: {
    type: String,
    enum: ['Administrador', 'Gerente', 'Atendente', 'Financeiro'],
    default: 'Atendente'
  }
})

// rota login
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(401).json({ success: false })
  }

  // 🔐 compara senha digitada com hash
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(401).json({ success: false })
  }

res.json({
  success: true,
  user: {
    id: user._id,
    email: user.email,
    type: user.type
  }
})
})

const bcrypt = require('bcrypt')

app.post('/register', async (req, res) => {
  const { email, password, type } = req.body

  try {
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Usuário já existe'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      email,
      password: hashedPassword,
      type: type || 'Atendente' // 👈 fallback
    })

    res.json({
      success: true,
      user: newUser
    })

  } catch (error) {
    res.status(500).json({
      success: false
    })
  }
})

app.get('/user/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ success: false })
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        type: user.type // 🔥 ISSO QUE FALTA
      }
    })

  } catch (err) {
    res.status(500).json({ success: false })
  }
})

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))