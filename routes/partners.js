const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const Partner = require('./../models/partners.js').Partner;

const router = express.Router();

router.route('/partners').get(ensureLoggedIn('/login'),
  (req, res) => {
    Partner.find({}, (err, partners) => {
      res.render('partners', { path: req.path, partners });
    });
  });

module.exports = router;
