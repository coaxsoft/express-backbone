const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');
const invitesController = require('../controllers/invites-controller');
const inviteSchema = require('../middleware/express-validation/invite-user-schema');
const validate = require('../middleware/express-validation/validate');

router.post('/:invite_code/cancel', invitesController.cancelInvitation);
router.post('/:invite_code/accept', invitesController.acceptInvitation);

router.use(passport.authenticate('jwt', { session: false }));
router.post('/', inviteSchema, validate, invitesController.inviteUser);
router.delete('/:id', invitesController.deleteInvitation);

module.exports = router;
