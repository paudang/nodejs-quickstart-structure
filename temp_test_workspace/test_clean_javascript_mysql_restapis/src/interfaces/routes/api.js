const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Should inject dependencies here in a real app
const userController = new UserController();

router.get('/users', (req, res) => userController.getUsers(req, res));
router.post('/users', (req, res) => userController.createUser(req, res));

module.exports = router;
