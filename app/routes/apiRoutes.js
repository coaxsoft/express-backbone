const express = require('express');
const router = express.Router();

router.get('/test', (req, res, next) => {
  res.status(200).send()
})

router.use(function (req, res, next) {
  next({
    status: 404,
    message: req.__('Not Found')
  });
});

router.use(function (err, req, res, next) {
  const status = err.status || 500;

  const errorResponse = {
    status,
    message: err.message || req.__('Something is wrong! Please try again later')
  };

  res.status(status).send(errorResponse);
});

module.exports = router;
