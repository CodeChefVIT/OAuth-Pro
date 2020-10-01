const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const mongoose = require('mongoose');
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
passport.use(
    new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                new User({
					_id: new mongoose.Types.ObjectId(),
                    googleId: profile.id,
                    name: profile.displayName,
                    email:profile._json.email
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);