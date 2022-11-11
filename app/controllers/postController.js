const postService = require('../services/postService')

const getPosts = async (req, res, next) => {
  try {
    const filters = req.query
    const posts = await postService.getPosts(filters)
    const response = {
      success: true,
      data: posts
    }
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params
    const post = await postService.getPostById(id)
    const response = {
      success: true,
      data: post
    }
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

const createPost = async (req, res, next) => {
  try {
    const newPost = await postService.createPost(req.body)
    const response = {
      success: true,
      data: newPost
    }
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

const updatePostById = async (req, res, next) => {
  try {
    const updatedPost = await postService.updatePostById(req.params.id, req.body)
    const response = {
      success: true,
      data: updatedPost
    }
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = { getPosts, getPostById, createPost, updatePostById }
