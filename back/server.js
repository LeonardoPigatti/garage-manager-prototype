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
  password: String
})

// rota login
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email, password })

  if (user) {
    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email
      }
    })
  } else {
    res.status(401).json({
      success: false
    })
  }
})

app.post('/register', async (req, res) => {
  const { email, password } = req.body

  try {
    // verifica se já existe
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Usuário já existe'
      })
    }

    // cria usuário
    const newUser = await User.create({
      email,
      password
    })

    res.json({
      success: true,
      user: newUser
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro no servidor'
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
        email: user.email
      }
    })

  } catch (err) {
    res.status(500).json({ success: false })
  }
})

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))