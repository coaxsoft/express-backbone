const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');
const invitesController = require('../controllers/invitesController');
const inviteSchema = require('../middleware/expressValidation/invitesValidation/inviteUserSchema');
const validate = require('../middleware/expressValidation/validate');

router.post('/:inviteCode/cancel', (req, res, next) => {
  invitesController.cancelInvitation(req, res, next).catch(e => next(e))
});
router.post('/:inviteCode/accept', (req, res, next) => {
  invitesController.acceptInvitation(req, res, next).catch(e => next(e))
});

router.use(passport.authenticate('jwt', { session: false }));
router.post('/', inviteSchema, validate, (req, res, next) => {
  invitesController.inviteUser(req, res, next).catch(e => next(e))
});
router.delete('/:id', (req, res, next) => {
  invitesController.deleteInvitation(req, res, next).catch(e => next(e))
});

module.exports = router;
