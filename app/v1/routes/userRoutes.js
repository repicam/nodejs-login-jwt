const express = require('express')
const userController = require('../../controllers/userController')

const router = express.Router()

router.route('/').patch(userController.changePassword)

module.exports = router
