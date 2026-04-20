const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

// conectar banco
connectDB()

// rotas
app.use('/', require('./routes/auth'))
app.use('/oficina', require('./routes/oficina'))


app.listen(3000, () => console.log('Servidor rodando na porta 3000'))