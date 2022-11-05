require('dotenv').config()
require('./database/bd')

const express = require('express')
const cors = require('cors')
const v1PostRoutes = require('./v1/routes/postRoutes')
const unknownEndpoint = require('./middlewares/unknownEndpoint')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/api/v1/posts', v1PostRoutes)
app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Servidor inciado en el puerto ${PORT}`)
})
