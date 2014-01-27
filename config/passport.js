/**
 * http://jethrokuan.github.io/2013/12/19/Using-Passport-With-Sails-JS.html
 * https://github.com/stefanbuck/sails-social-auth-example
 *
 * bonus: http://www.geektantra.com/2013/08/implement-passport-js-authentication-with-sails-js/
 */

var passport = require('passport')
  //, GitHubStrategy = require('passport-github').Strategy
  //, FacebookStrategy = require('passport-facebook').Strategy
  , LocalStrategy = require('passport-local').Strategy
  , bcrypt = require('bcrypt');
  //, GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function(user, done) {
  done(null, user[0].id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findByUsername(username).done(function(err, user) {
      if (err) { return done(null, err); }
      if (!user || user.length < 1) { return done(null, false, { message: 'Incorrect User'}); }
      bcrypt.compare(password, user[0].password, function(err, res) {
        if (!res) return done(null, false, { message: 'Invalid Password'});
        return done(null, user);
      });
    });
  })
);

module.exports = {
  express: {
    customMiddleware: function(app){
      console.log('express midleware for passport');
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};
/**
module.exports = {

  // Init custom express middleware
  express: {
    customMiddleware: function(app) {

      passport.use(new GitHubStrategy({
          clientID: "YOUR_CLIENT_ID",
          clientSecret: "YOUR_CLIENT_SECRET",
          callbackURL: "http://localhost:1337/auth/github/callback"
        },
        verifyHandler
      ));

      passport.use(new FacebookStrategy({
          clientID: "YOUR_CLIENT_ID",
          clientSecret: "YOUR_CLIENT_SECRET",
          callbackURL: "http://localhost:1337/auth/facebook/callback"
        },
        verifyHandler
      ));

      passport.use(new GoogleStrategy({
          clientID: 'YOUR_CLIENT_ID',
          clientSecret: 'YOUR_CLIENT_SECRET',
          callbackURL: 'http://localhost:1337/auth/google/callback'
        },
        verifyHandler
      ));

      app.use(passport.initialize());
      app.use(passport.session());
    }
  }

};
*/
