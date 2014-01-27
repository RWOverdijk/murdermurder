/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    email: {
      type: 'email'
    },
    password: {
      type: 'string',
      required: true
    },
    toJSON: function() {
      var obj = this.toObject();

      // Remove the password object value
      delete obj.password;

      // return the new object without password
      return obj;
    }
  },
  beforeCreate: function(user, callback) {
    bcrypt.genSalt(10, function generatedSalt(error, salt) {

      if (error) {
        return callback(error.toString());
      }

      return bcrypt.hash(user.password, salt, function hashedPassword(error, hash) {
        if (error) {
          return callback(error.toString());
        }

        user.password = hash;

        return callback(null, user);
      });
    });
  }
};
