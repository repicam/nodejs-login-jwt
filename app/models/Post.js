const { model, Schema } = require('mongoose')

const postSchema = new Schema({
  contenido: String,
  fecha: Date,
  favorito: Boolean
},
{ timestamps: true })

const Post = model('Post', postSchema)

const getPosts = async (filters) => {
  const posts = await Post.find(filters)
  return posts
}

const getPostById = async (id) => {
  const post = await Post.findById(id)
  return post
}

const createPost = async (newPostData) => {
  const { contenido, fecha, favorito } = newPostData
  const newPost = new Post({
    contenido,
    fecha: fecha || new Date(),
    favorito: favorito || false
  })

  return await newPost.save()
}

module.exports = { getPosts, getPostById, createPost }
