const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const { JWT_SECRET } = require('../config');

// Middleware to validate token (JWT)
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // if there isn't any token
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(verified.id);
    if (!user) {
      return res.sendStatus(403);
    }
    req.user = user;
    next(); // to continue the execution
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports = {
  authenticateToken
};