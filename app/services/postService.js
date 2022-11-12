const Post = require('../models/Post')

const getPosts = async (filters) => {
  return await Post.find(filters)
}

const getPostById = async (id) => {
  return await Post.findById(id)
}

const createPost = async (postData) => {
  const { contenido, fecha, favorito } = postData
  const newPostData = {
    contenido,
    fecha: fecha || new Date(),
    favorito: favorito || false
  }

  return Post.create(newPostData)
}

const updatePostById = async (id, postData) => {
  if (postData.fecha) {
    delete postData.fecha
  }

  const updatedPost = await Post.updateById(id, postData)
  const response = {
    success: true,
    data: updatedPost,
    errorMsg: null,
    statusCode: 200
  }
  if (!updatedPost) {
    response.success = false
    response.errorMsg = 'No existe post con el id indicado'
    response.statusCode = 404
  }
  return response
}

const deletePostById = async (id) => {
  const data = await Post.deleteById(id)
  const response = {
    success: true,
    errorMsg: null,
    statusCode: 200
  }
  if (!data) {
    response.success = false
    response.errorMsg = 'No existe post con el id indicado'
    response.statusCode = 404
  }
  return response
}

module.exports = { getPosts, getPostById, createPost, updatePostById, deletePostById }
