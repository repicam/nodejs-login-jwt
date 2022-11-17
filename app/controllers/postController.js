const postService = require('../services/postService')

const getPosts = async (req, res, next) => {
  try {
    const filters = req.query
    const { success, data, errorMsg, statusCode } = await postService.getPosts(filters)
    const response = {
      success,
      data,
      errorMsg
    }
    res.status(statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params
    const { success, data, errorMsg, statusCode } = await postService.getPostById(id)
    const response = {
      success,
      data,
      errorMsg
    }
    res.status(statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const createPost = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await postService.createPost(req)
    const response = {
      success,
      data,
      errorMsg
    }
    res.status(statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const updatePostById = async (req, res, next) => {
  try {
    const { success, data, errorMsg, statusCode } = await postService.updatePostById(req)
    const response = {
      success,
      data,
      errorMsg
    }
    res.status(statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const deletePostById = async (req, res, next) => {
  try {
    const { success, errorMsg, statusCode } = await postService.deletePostById(req)
    const response = {
      success,
      errorMsg
    }
    res.status(statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = { getPosts, getPostById, createPost, updatePostById, deletePostById }
