const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')


//create new user

router.post('/signup',userController.create);
router.post('/signin',userController.signInWithEmailAndPassword)

module.exports = router