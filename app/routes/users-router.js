const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');
const usersController = require('../controllers/users-controller');

router.get('/:id', usersController.getUser);
router.get('/', passport.authenticate('jwt', { session: false }), usersController.getUsers);

module.exports = router;
