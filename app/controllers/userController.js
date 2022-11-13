const userService = require('../services/userService')

const signin = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await userService.signin(req.body)
    const response = {
      success,
      data,
      errorMsg
    }
    res.status(statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await userService.login(req.body)
    const response = {
      success,
      data,
      errorMsg
    }
    res.status(statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const changePassword = (req, res, next) => { res.status(404).json('Endpoint en creación') }

module.exports = { signin, login, changePassword }
