const passport = require('passport');
const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const router = express.Router();

router.route('/').get(ensureLoggedIn('/login'),
  (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
  });

router.route('/login')
  .get((req, res) => {
    res.render('login');
  });

router.route('/auth/google').get(passport.authenticate('google', { scope: ['email profile'] }));

router.route('/auth/google/callback')
  .get(passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/');
    });

router.route('/testing').get(ensureLoggedIn('/login'),
  (req, res) => {
    res.json({});
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

module.exports = router;
