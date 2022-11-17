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

const personalInformation = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await userService.personalInformation(req)
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

const changePassword = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await userService.changePassword(req)
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

module.exports = { signin, login, changePassword, personalInformation }
