const jwt = require("jsonwebtoken");

const sign = process.env.JWT_SECRET;

module.exports = {
  generate(data) {
    return jwt.sign(data, sign, { expiresIn: "1h" });
  },
  verify(token) {
    return jwt.verify(token, sign);
  },
};
