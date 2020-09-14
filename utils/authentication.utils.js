const { decodeToken } = require("./token.utils");

const withAuth = (handler) => (req, res, next) => {
  const token = req.get('Authorization');
  try {
    const user = decodeToken(token);
    handler({...req, user }, res, next);
  } catch (error) {
    console.error(error)
    res.sendStatus(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  withAuth
};