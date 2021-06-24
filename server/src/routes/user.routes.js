const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')


//create new user

router.post('/signup',userController.create);
router.post('/signin',userController.signInWithEmailAndPassword)


//fetch all users except admin

router.get('/',userController.findAll);

//fetch user by id
router.get('/:id',userController.findById);

module.exports = router