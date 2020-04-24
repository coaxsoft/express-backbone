const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');
const invitesController = require('../controllers/invitesController');
const inviteSchema = require('../middleware/expressValidation/invitesValidation/inviteUserSchema');
const validate = require('../middleware/expressValidation/validate');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/:inviteCode/cancel', invitesController.cancelInvitation);
router.post('/:inviteCode/accept', invitesController.acceptInvitation);

router.post('/upload', upload.single('test'), (req, res) => {
  res.json(req.file);
});

router.use(passport.authenticate('jwt', { session: false }));
router.post('/', inviteSchema, validate, invitesController.inviteUser);
router.delete('/:id', invitesController.deleteInvitation);

module.exports = router;
