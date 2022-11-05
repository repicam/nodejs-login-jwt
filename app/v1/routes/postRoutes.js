const express = require('express')
const postController = require('../../controllers/postController')

const router = express.Router()

router.get('/', postController.getPosts)
  .get('/:id', postController.getPostById)

module.exports = router
