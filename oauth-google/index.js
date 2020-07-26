'use strict';

require('dotenv').config();

const path = require('path');
const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET } =  process.env;
const port = process.env.PORT || 3000;
const app = express();
const routes = require('./routes');

passport.use(new Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/return'
  },
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({ secret: SESSION_SECRET, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);



app.listen(port);