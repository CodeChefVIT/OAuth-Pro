'use strict';

require('dotenv').config();

const path = require('path');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const { Strategy } = require('passport-linkedin-oauth2');
const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, CALLBACK_URL, SESSION_SECRET } =  process.env;
const port = process.env.PORT || 3000;
const app = express();
const routes = require('./routes');

passport.use(new Strategy({
    clientID: LINKEDIN_CLIENT_ID,
    clientSecret: LINKEDIN_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(session({ secret: SESSION_SECRET, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

app.listen(port);