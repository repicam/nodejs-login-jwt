const Post = require('../models/Post')

const getPosts = async (filters) => {
  return await Post.getPosts(filters)
}

const getPostById = async (id) => {
  return await Post.getPostById(id)
}

const createPost = async (postData) => {
  const { contenido, fecha, favorito } = postData
  const newPostData = {
    contenido,
    fecha: fecha || new Date(),
    favorito: favorito || false
  }

  return Post.createPost(newPostData)
}

const updatePostById = async (id, postData) => {
  if (postData.fecha) {
    delete postData.fecha
  }

  return await Post.updatePostById(id, postData)
}

module.exports = { getPosts, getPostById, createPost, updatePostById }
