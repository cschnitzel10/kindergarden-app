
module.exports = (req, res, next) => {
    // checks if the user is logged in when trying to access a specific page
    if (req.session.roles !== 'Parent') {
      return res.send("No Permission!");
    }
    next();
  };
  