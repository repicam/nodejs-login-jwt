const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { createResponse } = require('../utils/responseGenerator')

const SALT_ROUNDS = 10

const signin = async (userData) => {
  const { username, nombre, password } = userData

  let newUser = null

  const usernameExists = await User.find({ username })
  if (!usernameExists) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const newUserData = {
      username,
      nombre,
      password: passwordHash
    }

    newUser = await User.create(newUserData)
  }

  const errorMsg = !usernameExists ? null : 'Username utilizado ya existe'
  const statusCode = !usernameExists ? 201 : 400
  return createResponse(!!usernameExists, newUser, errorMsg, statusCode)
}

const login = async (userData) => {
  const { username, password } = userData

  let data = null

  const userExists = await User.find({ username })
  const passwordCorrect = !userExists ? false : await bcrypt.compare(password, userExists.password)
  if (passwordCorrect) {
    const userToken = {
      username: userExists.username,
      id: userExists._id
    }

    const token = jwt.sign(userToken, process.env.JWT_SECRET)

    data = {
      token,
      username: userExists.username
    }
  }

  const errorMsg = passwordCorrect ? null : 'Usuario y/o contraseña incorrecta'
  const statusCode = passwordCorrect ? 200 : 400
  return createResponse(passwordCorrect, data, errorMsg, statusCode)
}

module.exports = { signin, login }
