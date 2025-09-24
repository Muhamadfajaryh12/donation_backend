const userService = require("../service/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv");
const response = require("../utils/Response");

const register = async (req, res) => {
  try {
    const { nama, password, email } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const result = userService.store({
      nama: nama,
      password: hash_password,
      email: email,
    });

    return response(res, 201, "Berhasil membuat akun");
  } catch (error) {}
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = userService.getUser({ email: email, password: password });
    const token = jwt.sign({ id: result.id }, process.env.SECRET_TOKEN);
    return response(res, 200, "Login berhasil", { token: token });
  } catch (error) {}
};

module.exports = {
  register,
  login,
};
