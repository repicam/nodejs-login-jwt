const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { createResponse } = require('../utils/responseGenerator')
const { decodeToken } = require('../utils/jwtValidator')

const SALT_ROUNDS = 10

const signin = async (userData) => {
  const { username, password } = userData

  let data = null

  const usernameExists = await User.find({ username })
  if (!usernameExists) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

    userData.password = passwordHash
    userData.admin = false

    const createdUser = await User.create(userData)

    const userToken = {
      username,
      id: createdUser._id,
      admin: createdUser.admin
    }

    const token = jwt.sign(userToken,
      process.env.JWT_SECRET,
      { expiresIn: '90 days' }
    )

    data = {
      token
    }
  }

  const errorMsg = !usernameExists ? null : 'Username utilizado ya existe. Puede iniciar sesión'
  const statusCode = !usernameExists ? 201 : 400
  return createResponse(!usernameExists, data, errorMsg, statusCode)
}

const login = async (userData) => {
  const { username, password } = userData

  let data = null

  const userExists = await User.find({ username })
  const passwordCorrect = !userExists ? false : await bcrypt.compare(password, userExists.password)
  if (passwordCorrect) {
    const userToken = {
      username: userExists.username,
      id: userExists._id,
      admin: userExists.admin
    }

    const token = jwt.sign(userToken,
      process.env.JWT_SECRET,
      { expiresIn: '90 days' }
    )

    data = {
      token
    }
  }

  const errorMsg = passwordCorrect ? null : 'Usuario y/o contraseña incorrecta'
  const statusCode = passwordCorrect ? 200 : 400
  return createResponse(passwordCorrect, data, errorMsg, statusCode)
}

const personalInformation = async (request) => {
  const { headers } = request

  let data = null

  const { id } = decodeToken(headers)
  const userExists = await getUserById(id)
  data = { userExists }

  const errorMsg = userExists ? null : 'Usuario no existe'
  const statusCode = userExists ? 200 : 400
  return createResponse(!!userExists, data, errorMsg, statusCode)
}

const changePassword = async (request) => {
  const { body, headers } = request
  const { password } = body

  if (!password) {
    return createResponse(false, null, 'Required: password', 400)
  }
  const { id } = decodeToken(headers)
  const userExists = await getUserById(id)

  if (userExists) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    await User.update(id, { password: passwordHash })
  }

  const errorMsg = userExists ? null : 'Token incorrecto'
  const statusCode = userExists ? 200 : 400
  return createResponse(!!userExists, null, errorMsg, statusCode)
}

const getUserById = async (id) => {
  return await User.findById(id)
}

const getUserByHeader = async (headers) => {
  const { id } = decodeToken(headers)
  return await getUserById(id)
}

module.exports = { signin, login, personalInformation, changePassword, getUserByHeader }
