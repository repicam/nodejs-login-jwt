const { model, Schema } = require('mongoose')

const postSchema = new Schema({
  contenido: {
    type: String,
    minlength: 15,
    required: true
  },
  fecha: Date,
  favorito: Boolean
},
{ timestamps: true })

const Post = model('Post', postSchema)

const find = async (filters) => {
  return await Post.find(filters)
}

const findById = async (id) => {
  return await Post.findById(id)
}

const create = async (newPostData) => {
  const newPost = new Post(newPostData)

  return await newPost.save()
}

const updateById = async (id, editedPost) => {
  return await Post.findByIdAndUpdate(id, editedPost, { new: true })
}

const deleteById = async (id) => {
  return await Post.findByIdAndDelete(id)
}

module.exports = { find, findById, create, updateById, deleteById }
