const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, BCRYPT_SALT_ROUNDS } = require('../config');

const generateHash = async (password) => {
  return await bcrypt.hash(password, parseInt(BCRYPT_SALT_ROUNDS));
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const encryptData = (data) => {
  const cipher = crypto.createCipher('aes-256-cbc', JWT_SECRET);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decryptData = (encryptedData) => {
  const decipher = crypto.createDecipher('aes-256-cbc', JWT_SECRET);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = {
  generateHash,
  comparePassword,
  generateToken,
  verifyToken,
  encryptData,
  decryptData
};