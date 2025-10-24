const userService = require("../service/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv");
const response = require("../utils/Response");
const jsonwebtoken = require("jsonwebtoken");
const EmailController = require("./EmailController");
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

    const token = jwt.sign(
      { id: result.id, name: result.name, email: result.email },
      process.env.SECRET_TOKEN
    );
    return response(res, 200, "Login berhasil", {
      token: token,
      role: result.role,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const result = await userService.getProfile(req.user.id);
    return response(res, 200, "Berhasil fetch profile", result);
  } catch (error) {
    next(error);
  }
};

const verifikasiAccount = async (req, res, next) => {
  try {
    const { authKey } = req.query;
    const payload = jsonwebtoken.decode(authKey);
    const result = await userService.verification(payload.id);
    return res.redirect("http://localhost:5173/profile");
  } catch (error) {
    next(error);
  }
};

const sendVerification = async (req, res, next) => {
  try {
    const { authKey } = req.query;
    const payload = jsonwebtoken.decode(authKey);
    await EmailController.sendEmail({
      to: payload.email,
      subject: "Verifikasi Akun",
      html: `<p>Halo ${payload.name}, klik tombol di bawah untuk verifikasi akunmu:</p>
             <a href="${process.env.BASE_URL}/api/v1/verify?authKey=${authKey}" 
                style="padding:10px 15px; background:#4CAF50; color:white; text-decoration:none;">
                Verifikasi Sekarang
             </a>`,
    });
    return response(
      res,
      200,
      "Verifikasi berhasil terkirim, silahkan cek email anda."
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const user = req.user;
    const { old_password, new_password } = req.body;
    const result = await userService.updatePassword({
      old_password: old_password,
      new_password: new_password,
      id: user.id,
    });

    return response(res, 200, "Berhasil mengganti password");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  register,
  login,
  sendVerification,
  verifikasiAccount,
  getProfile,
  updatePassword,
};
