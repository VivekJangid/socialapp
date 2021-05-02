const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get Token From Header
  const token = req.headers.authorization;
  //If No Token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No Token Found, Authorisation Denied' });
  }

  //Else Verify Token
  try {
    const decoded = jwt.verify(token.split(' ')[1], config.get('jwt-secret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is Not Valid, Authorisation Denied' });
  }
};
