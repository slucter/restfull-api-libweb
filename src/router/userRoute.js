const express = require('express');
const Router = express.Router();
const userController = require('../controller/userController')

Router
    .get('/', userController.getUser)
    .post('/signup', userController.insertUser)
    .post('/login', userController.loginUser)
    .delete('/:id_delete', userController.deleteUser)
    .patch('/:id_update', userController.updateUser)

module.exports = Router;