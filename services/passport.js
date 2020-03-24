const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

//pull the schema out of the model
const User = mongoose.model("users");

//packs all the info to a cookie tht can be used for validation of the site
passport.serializeUser((user, done) => {
  //the second param is the auto generated mongodb id
  //to uniqely identify the user
  done(null, user.id);
});

//for logging out
//the first arg is same as the one provided for the cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

//instrtucts the pasport lib to use google strategy by passing a new instance of it
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      //whenever the callback is called the flow of program redirects here
      console.log("profile:", profile);
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //no error
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
