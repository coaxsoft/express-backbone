const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');
const usersController = require('../controllers/usersController');
const { allow, deny } = require('../middleware/permissions');

router.get('/:id', usersController.getUser);
router.use(passport.authenticate('jwt', { session: false }));
router.get('/', allow(['Admin', 'User']), usersController.getUsers); //permissions example
router.delete('/:id', usersController.deleteUser);
router.post('/:id/restore', usersController.restoreUser);
router.post('/:id/add-role/:role_id', usersController.addRole);
router.post('/:id/remove-role/:role_id', usersController.removeRole);

module.exports = router;
