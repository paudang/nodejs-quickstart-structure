const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

const userController = new UserController();

router.post('/users', (req, res, next) => userController.createUser(req, res, next));
router.get('/users', (req, res, next) => userController.getUsers(req, res, next));

module.exports = router;
