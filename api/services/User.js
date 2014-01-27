var passport = require("passport");

module.exports = {
  register: function(Model, params, callback) {

    var promise = Model.create({
      username: params.username,
      email: params.email,
      password: params.password
    });

    promise.done(function afterUserRegister(error, user) {
      if (error) {

        error = error.toString();

        if (error.search('Uniqueness check failed') > -1) {
          error = 'Username exists.';
        }

        return callback(error);
      }

      return callback(null, user);
    });
  },

  login: function(req, callback) {
    passport.authenticate('local', function authenticateCallback(error, user) {
      if (error || !user) {
        return callback('Invalid credentials.');
      }

      req.logIn(user, function(error) {

        if (error) {
          return callback(error.toString());
        }

        return callback(null, user);
      });

      return this;
    })(req);
  }
};
