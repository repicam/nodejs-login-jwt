const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Id introducido incorrecto' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'El token administrado ha caducado' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Tu petición no tiene cabecera de autorización o es incorrecta' })
  } else if (error.message === 'NotYours') {
    return response.status(401).json({ error: 'Este post no te pertenece' })
  }

  next(error)
}

module.exports = errorHandler
