const userService = require('../services/userService')

const createUser = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await userService.createUser(req.body)
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

module.exports = { createUser }
