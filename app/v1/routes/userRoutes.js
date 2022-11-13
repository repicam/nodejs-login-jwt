const express = require('express')
const userController = require('../../controllers/userController')

const router = express.Router()

router.route('/').patch(userController.changePassword)
  .post(userController.verify)

module.exports = router
