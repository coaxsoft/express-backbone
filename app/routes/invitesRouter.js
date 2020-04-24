const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');
const invitesController = require('../controllers/invitesController');
const inviteSchema = require('../middleware/expressValidation/invitesValidation/inviteUserSchema');
const validate = require('../middleware/expressValidation/validate');

router.post('/:inviteCode/cancel', invitesController.cancelInvitation);
router.post('/:inviteCode/accept', invitesController.acceptInvitation);

router.use(passport.authenticate('jwt', { session: false }));
router.post('/', inviteSchema, validate, invitesController.inviteUser);
router.delete('/:id', invitesController.deleteInvitation);

module.exports = router;
