'use strict';

require('dotenv').config();

const path = require('path');
const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-linkedin-oauth2');
const { LINKEDIN_API_KEY, LINKEDIN_SECRET_KEY, SESSION_SECRET } =  process.env;
const port = process.env.PORT || 3000;
const app = express();
const routes = require('./routes');

passport.use(new Strategy({
    clientID: LINKEDIN_API_KEY,
    clientSecret: LINKEDIN_SECRET_KEY,
    callbackURL: '/return',
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true
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