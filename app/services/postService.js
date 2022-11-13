const Post = require('../models/Post')
const { createResponse } = require('../utils/responseGenerator')

const getPosts = async (filters) => {
  const posts = await Post.find(filters)
  return createResponse(true, posts, null, 200)
}

const getPostById = async (id) => {
  const post = await Post.findById(id)
  return createResponse(true, post || [], null, 200)
}

const createPost = async (postData) => {
  const { contenido, fecha, favorito } = postData
  const newPostData = {
    contenido,
    fecha: fecha || new Date(),
    favorito: favorito || false
  }

  const newPost = await Post.create(newPostData)
  return createResponse(true, newPost, null, 201)
}

const updatePostById = async (id, postData) => {
  if (postData.fecha) {
    delete postData.fecha
  }

  const updatedPost = await Post.updateById(id, postData)
  const errorMsg = updatedPost ? null : 'No existe post con el id indicado'
  const statusCode = updatedPost ? 201 : 400
  return createResponse(!!updatedPost, updatedPost, errorMsg, statusCode)
}

const deletePostById = async (id) => {
  const data = await Post.deleteById(id)
  const errorMsg = data ? null : 'No existe post con el id indicado'
  const statusCode = data ? 201 : 400
  return createResponse(!!data, null, errorMsg, statusCode)
}

module.exports = { getPosts, getPostById, createPost, updatePostById, deletePostById }
