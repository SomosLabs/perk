'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const authSecret = process.env.AUTH_SECRET;

app.set('view engine', 'pug');
// mongoose.connect('mongodb://localhost/perk');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routes/index.js'));
// app.use(require('./routes/user.js'));

module.exports = app;
console.log('Perk is perking.');