const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const keys = require('./keys')

const User = require('../models/UserModel')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
      const newUser = {
        googleID: profile.id,
        name:profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email:profile.emails[0].value,
        image:profile.photos[0].value,
        // console.log(accessToken);
        // console.log( profile)
      };
      User.findOne({googleID: profile.id}).then((user) =>{
        if(user){
          done(null,user);
        }
        else{
          new User(newUser)
          .save()
          .then((user) => {
            done(null,user)
          });
        }
      })
      }
    ));
    // used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id); 
 // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});
}

