const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Should inject dependencies here in a real app
const userController = new UserController();

router.post('/users', (req, res) => userController.createUser(req, res));
router.get('/users', (req, res) => userController.getUsers(req, res));

module.exports = router;
