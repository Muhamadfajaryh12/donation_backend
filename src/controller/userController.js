const userService = require("../service/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv");
const response = require("../utils/Response");

const register = async (req, res, next) => {
  try {
    const { name, password, email, role } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const result = await userService.store({
      name: name,
      password: hash_password,
      email: email,
      role: role,
    });

    return response(res, 201, "Berhasil membuat akun");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.getUser({
      email: email,
      password: password,
    });

    const token = jwt.sign({ id: result.id }, process.env.SECRET_TOKEN);
    return response(res, 200, "Login berhasil", { token: token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
