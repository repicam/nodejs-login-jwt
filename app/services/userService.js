const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const SALT_ROUNDS = 10

const signin = async (userData) => {
  const { username, nombre, password } = userData

  const response = {
    success: true,
    data: null,
    errorMsg: null,
    statusCode: 201
  }

  const usernameExists = await User.find({ username })
  if (!usernameExists) {
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

const login = async (userData) => {
  const { username, password } = userData

  const response = {
    success: true,
    data: null,
    errorMsg: null,
    statusCode: 200
  }

  const userExists = await User.find({ username })
  const passwordCorrect = !userExists ? false : await bcrypt.compare(password, userExists.password)
  if (userExists && passwordCorrect) {
    const userToken = {
      username: userExists.username,
      id: userExists._id
    }

    const token = jwt.sign(userToken, process.env.JWT_SECRET)

    response.data = {
      token,
      username: userExists.username
    }
  } else {
    response.success = false
    response.errorMsg = 'Usuario y/o contraseña incorrecta'
    response.statusCode = 400
  }

  return response
}

module.exports = { signin, login }
