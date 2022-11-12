const express = require('express')
const postController = require('../../controllers/postController')

const router = express.Router()

router.route('/').get(postController.getPosts)
  .post(postController.createPost)

router.route('/:id').get(postController.getPostById)
  .patch(postController.updatePostById)
  .delete(postController.deletePostById)

module.exports = router
