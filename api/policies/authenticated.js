/**
 * Allow any authenticated user.
 */
module.exports = function(req, res, ok) {

  // User is allowed, proceed to controller
  if (req.isAuthenticated()) {
    return ok();
  }

  // User is not allowed
  return res.json({
    status: 'error',
    message: 'User is not authenticated'
  });
};
