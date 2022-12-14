const express = require('express')
const userController = require('../../controllers/userController')
const { checkToken } = require('../../utils/jwtValidator')

const router = express.Router()

router.route('/change/password').patch(checkToken, userController.changePassword)

router.route('/me').get(checkToken, userController.personalInformation)

module.exports = router
