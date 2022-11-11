const { model, Schema } = require('mongoose')

const postSchema = new Schema({
  contenido: String,
  fecha: Date,
  favorito: Boolean
},
{ timestamps: true })

const Post = model('Post', postSchema)

const getPosts = async (filters) => {
  return await Post.find(filters)
}

const getPostById = async (id) => {
  return await Post.findById(id)
}

const createPost = async (newPostData) => {
  const newPost = new Post(newPostData)

  return await newPost.save()
}

const updatePostById = async (id, editedPost) => {
  return await Post.findByIdAndUpdate(id, editedPost, { new: true })
}

module.exports = { getPosts, getPostById, createPost, updatePostById }
