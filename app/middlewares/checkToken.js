const jwt = require('jsonwebtoken')

const checkToken = (request, response, next) => {
  try {
    const token = request.headers.authorization?.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = checkToken
