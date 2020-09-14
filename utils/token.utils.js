const jwt = require("jsonwebtoken");
const SECRET = "my-secret";
var createToken = function(auth) {
  return jwt.sign(
    {
      id: auth.id
    },
    SECRET,
    {
      expiresIn: 60 * 120
    }
  );
};

module.exports = {
  generateToken: function(req, res, next) {
    req.token = createToken(req.auth);
    return next();
  },
  sendToken: function(req, res) {
    res.setHeader("x-auth-token", req.token);
    res.setHeader("Authorization", req.token);
    return res.status(200).send(JSON.stringify(req.user));
  },
  decodeToken: function (token) {
    return jwt.verify(token, SECRET)
  },
};
