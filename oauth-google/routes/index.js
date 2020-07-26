'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res, next) => {
    const { user } = req;
    res.render('home', { user });
});

router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/return', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/');
});

module.exports = router;