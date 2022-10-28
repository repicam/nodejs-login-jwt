const { model, Schema } = require('mongoose')

const postSchema = new Schema({
  contenido: String,
  fecha: Date,
  favorito: Boolean
})

const Post = model('Post', postSchema)

module.exports = { Post }
