const jwt = require("jsonwebtoken");

const Authorization = async (req, res, next) => {
  const header = req.headers.authorization;
  if (header) {
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      if (err) {
      }

      req.user = user;
      next();
    });
  } else {
  }
};

module.exports = Authorization;
