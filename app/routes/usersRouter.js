const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');
const usersController = require('../controllers/usersController');
const { allows } = require('../middleware/permissions');

router.get('/me',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        usersController.getLoggedUser(req, res, next).catch(e => next(e))
    });

router.get('/',
    passport.authenticate('jwt', { session: false }),
    allow(['Admin']),
    (req, res, next) => {
        usersController.getUsers(req, res, next).catch(e => next(e))
    });
router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    allow(['Admin']),
    (req, res, next) => {
        usersController.deleteUser(req, res, next).catch(e => next(e))
    });
router.post('/:id/restore',
    passport.authenticate('jwt', { session: false }),
    allow(['Admin']),
    (req, res, next) => {
        usersController.restoreUser(req, res, next).catch(e => next(e))
    });
router.post('/:id/add-role/:role_id',
    passport.authenticate('jwt', { session: false }),
    allow(['Admin']),
    (req, res, next) => {
        usersController.addRole(req, res, next).catch(e => next(e))
    });
router.post('/:id/remove-role/:role_id',
    passport.authenticate('jwt', { session: false }),
    allow(['Admin']),
    (req, res, next) => {
        usersController.removeRole(req, res, next).catch(e => next(e))
    });

module.exports = router;
