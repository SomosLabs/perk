const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const app = express();

const authSecret = process.env.AUTH_SECRET;
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleCientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCBURL = process.env.GOOGLE_CB_URL;
const expressSecret = process.env.EXPRESS_SECRET;

app.set('view engine', 'pug');
// mongoose.connect('mongodb://localhost/perk');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: expressSecret, resave: true, saveUninitialized: true }));

passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleCientSecret,
  callbackURL: googleCBURL,
}, (accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes/index.js'));
// app.use(require('./routes/user.js'));

module.exports = app;
console.log('Perk is perking.');