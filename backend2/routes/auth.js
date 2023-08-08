const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const { ensureLoggedIn } = require('connect-ensure-login');
var app = express.Router();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const env = {
    CLIENT_ID : "27140057866-2qettfcfdgng7hif66rnflkgo7bhgm37.apps.googleusercontent.com",
    CLIENT_SECRET : "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"
}

passport.use(
  new GoogleStrategy(
    {
      clientID: env.CLIENT_ID,
      clientSecret: env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Store user data in database or session
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", ensureLoggedIn('/auth/google'), (req, res) => {
  if(req.isAuthenticated()){
    res.send(`
      <h1>Welcome to the Google authentication demo!</h1>
      <p>Please <a href="/auth/google">log in with Google</a> to continue.</p>
      <p>Welcome ${req.user._json.name}<p>
    `);
  }
  else{
    res.send(`
      <h1>Welcome to the Google authentication demo!</h1>
      <p>Please <a href="/auth/google">log in with Google</a> to continue.</p>
    `);
  }
});

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    if(req.isAuthenticated()){
      console.log(req.user._json);
    }
    res.redirect("/auth");
  }
);

app.get("/logout", (req, res) => {
  req.logout((err) => console.log(err));
  res.redirect("/auth");
});

module.exports = app;