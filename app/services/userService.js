const bcrypt = require('bcrypt')
const User = require('../models/User')

const SALT_ROUNDS = 10

const createUser = async (userData) => {
  const { username, nombre, password } = userData

  const response = {
    success: true,
    data: null,
    errorMsg: null,
    statusCode: 201
  }

  const usernameExists = await User.find({ username })

  if (usernameExists.length === 0) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const newUserData = {
      username,
      nombre,
      password: passwordHash
    }

    const newUser = await User.create(newUserData)
    response.data = newUser
  } else {
    response.success = false
    response.errorMsg = 'Username utilizado ya existe'
    response.statusCode = 400
  }

  return response
}

module.exports = { createUser }
