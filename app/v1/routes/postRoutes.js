const express = require('express')
const postController = require('../../controllers/postController')
const { checkToken } = require('../../utils/jwtValidator')

const router = express.Router()

router.route('/').get(postController.getPosts)
  .post(checkToken, postController.createPost)

router.route('/:id').get(postController.getPostById)
  .patch(checkToken, postController.updatePostById)
  .delete(checkToken, postController.deletePostById)

module.exports = router
