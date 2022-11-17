const Post = require('../models/Post')
const { getUserByHeader } = require('../services/userService')
const { createResponse } = require('../utils/responseGenerator')

const getPosts = async (filters) => {
  const posts = await Post.find(filters)
  return createResponse(true, posts, null, 200)
}

const getPostById = async (id) => {
  const post = await Post.findById(id)
  return createResponse(true, post || [], null, 200)
}

const createPost = async (request) => {
  const { body, headers } = request
  const { contenido, fecha, favorito } = body
  const user = await getUserByHeader(headers)
  const newPostData = {
    contenido,
    fecha: fecha || new Date(),
    favorito: favorito || false,
    user: user._id
  }

  const newPost = await Post.create(newPostData)
  return createResponse(true, newPost, null, 201)
}

const updatePostById = async (request) => {
  const { params, body, headers } = request
  const { id } = params
  if (body.fecha) {
    delete body.fecha
  }

  const user = await getUserByHeader(headers)
  const post = await Post.find({ _id: id, user: user._id })

  if (!post) {
    throw Error('NotYours')
  }

  const updatedPost = await Post.updateById(id, body)
  const errorMsg = updatedPost ? null : 'No existe post con el id indicado'
  const statusCode = updatedPost ? 201 : 400
  return createResponse(!!updatedPost, updatedPost, errorMsg, statusCode)
}

const deletePostById = async (request) => {
  const { params, headers } = request
  const { id } = params

  const user = await getUserByHeader(headers)
  const post = await Post.find({ _id: id, user: user._id })

  if (!post) {
    throw Error('NotYours')
  }

  const data = await Post.deleteById(id)
  const errorMsg = data ? null : 'No existe post con el id indicado'
  const statusCode = data ? 201 : 400
  return createResponse(!!data, null, errorMsg, statusCode)
}

module.exports = { getPosts, getPostById, createPost, updatePostById, deletePostById }
