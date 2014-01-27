/**
 * AuthController
 *
 * @module      :: Controller
 * @description  :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require("passport");

module.exports = {

  /**
   *
   * @param req
   * @param res
   */
  login: function(req, res) {
    var userService = sails.services['user'];

    return userService.login(req, function loginCallback(error, user) {
      if (error) {
        return res.json({
          status: 'error',
          message: error
        }, 200);
      }

      return res.json({
        status: 'ok',
        data: user
      }, 200);
    });
  },

  /**
   * Register action.
   *
   * @param req
   * @param res
   */
  register: function(req, res) {
    var params = req.body
      , userService = sails.services['user']
      , UserModel = sails.models['user'];

    userService.register(UserModel, params, function(error, user) {
      if (error) {
        return res.json({
          status: 'error',
          message: error
        }, 200);
      }

      if (!params.autoLogin) {
        return res.json({
          status: 'ok',
          data: user
        }, 200);
      }

      return userService.login(req, function loginCallback(error) {
        if (error) {
          return res.json({
            status: 'error',
            message: 'Auto login failed: ' + error
          }, 200);
        }

        return res.json({
          status: 'ok',
          data: user
        }, 200);
      });
    });
  },

  /**
   * Logout
   *
   * @param req
   * @param res
   */
  logout: function(req, res) {
    req.logout();

    res.json({
      status: 'ok'
    }, 200);
  },

  _config: {}


};
