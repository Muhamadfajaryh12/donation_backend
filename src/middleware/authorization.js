const jwt = require("jsonwebtoken");

const Authorization = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Format token tidak valid" });
    }

    const token = parts[1];

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    req.user = decoded;

    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Token tidak valid atau sudah kedaluwarsa" });
  }
};

module.exports = Authorization;
