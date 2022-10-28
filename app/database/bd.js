const mongoose = require('mongoose')

const connection = `mongodb+srv://${process.env.BBDD_USER}:${process.env.BBDD_PASS}@mybbdd.c3unr1n.mongodb.net/${process.env.BBDD_SCHEMA}?retryWrites=true&w=majority`

mongoose.connect(connection)
  .then(() => { console.log('BBDD conectada') })
  .catch(err => { console.error(err) })
