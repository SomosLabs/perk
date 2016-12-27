const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const Perk = require('./../models/perk.js').Perk;

const router = express.Router();

router.route('/perks').get(ensureLoggedIn('/login'),
  (req, res) => {
    Perk.find({}, (err, perks) => {
      res.render('perks', { path: req.path, perks, user: req.user });
    });
  });

router.route('/perks/:id').get(ensureLoggedIn('/login'),
  (req, res) => {
    Perk.findById(req.params.id, (err, perk) => {
      res.json(perk);
    });
  });

module.exports = router;
