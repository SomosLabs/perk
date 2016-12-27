const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./models/user.js').User;

const app = express();

const authSecret = process.env.AUTH_SECRET;
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleCientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCBURL = process.env.GOOGLE_CB_URL;
const expressSecret = process.env.EXPRESS_SECRET;

app.set('view engine', 'pug');
mongoose.connect('mongodb://localhost/perk');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: expressSecret, resave: true, saveUninitialized: true }));

passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleCientSecret,
  callbackURL: googleCBURL,
}, (accessToken, refreshToken, profile, cb) => {
  User.findOne({ auth: { $elemMatch: { provider: 'google', id: profile.id } } }, (err, user) => {
    if (!user) {
      const newUser = new User({
        first: profile.name.givenName,
        last: profile.name.familyName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
        hasJob: false,
        auth: [{
          provider: 'google',
          id: profile.id,
          oauth_token: accessToken,
          last_login: new Date(),
        }],
        perks: [],
        companies: [],
      });

      newUser.save((error, savedUser) => {
        return cb(null, savedUser);
      });
    } else {
      return cb(null, user);
    }
  });
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
app.use(require('./routes/partners.js'));
app.use(require('./routes/perks.js'));

module.exports = app;
console.log('Perk is perking.');