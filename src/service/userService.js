const connection = require("../database/database");
const bcrypt = require("bcrypt");
const AppError = require("../utils/error/AppError");
class userService {
  async store(req) {
    const { email, name, password, role } = req;
    const queryCheckEmail = "SELECT email FROM users WHERE email = ?";
    const resultCheckEmail = await connection.query(queryCheckEmail, [email]);

    if (resultCheckEmail.length > 0) {
      throw new AppError(400, "Email sudah digunakan");
    }

    const query =
      "INSERT INTO users (email,name,password,role) VALUES(?,?,?,?)";
    const result = await connection.query(query, [email, name, password, role]);
    return result;
  }

  async getUser({ email, password }) {
    const query = "SELECT id, email, password FROM users WHERE email = ?";
    const result = await connection.query(query, [email]);

    if (result.length == 0) {
      throw new AppError(400, "Email atau Password salah");
    }
    const passwordMatch = await bcrypt.compare(password, result[0].password);

    if (!passwordMatch) {
      throw new AppError(400, "Email atau Password salah");
    }

    return {
      id: result[0].id,
    };
  }

  async updatePassword(req) {
    try {
      const { id, new_password, old_password } = req;

      const query = "SELECT password FROM user WHERE id = ? ";
      const result = await connection.query(query, [id]);

      if (result.length == 0) {
        throw new AppError(400, "User tidak ditemukan");
      }

      const passwordMatch = await bcrypt.compare(
        old_password,
        result[0].password
      );

      if (!passwordMatch) {
        throw new AppError(400, "Password tidak sesuai");
      }

      const hashedPassword = await bcrypt.hash(new_password, 10);

      const queryUpdate = "UPDATE user SET password = ? WHERE id = ?";
      const resultUpdate = await connection.query(queryUpdate, [
        hashedPassword,
        id,
      ]);
    } catch (error) {
      return;
    }
  }
}

module.exports = new userService();
