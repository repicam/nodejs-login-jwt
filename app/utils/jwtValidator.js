const jwt = require('jsonwebtoken')

const checkToken = (request, response, next) => {
  try {
    decodeToken(request.headers)
    next()
  } catch (error) {
    next(error)
  }
}

const decodeToken = (headers) => {
  const token = headers.authorization?.split(' ')[1]
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { checkToken, decodeToken }
