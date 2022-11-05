const Post = require('../models/Post')

const getPosts = async (filters) => {
  const posts = await Post.getPosts(filters)
  return posts
}

const getPostById = async (id) => {
  const post = await Post.getPostById(id)
  return post
}

module.exports = { getPosts, getPostById }
