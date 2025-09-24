const connection = require("../database/database");
const bcrypt = require("bcrypt");
class userService {
  async store(req) {
    const { email, nama, password } = req;
    try {
      const query = "INSERT INTO user (email,nama,password) VALUES(?,?,?)";
      const result = await connection.query(query, [email, nama, password]);
      return result;
    } catch (error) {}
  }

  async getUser(req) {
    const { email, password } = req;
    try {
      const query = "SELECT email, password FROM user WHERE email = ?";
      const [result] = await connection.query(query, [email]);

      if (result.length == 0) {
        throw Error("Email atau Password salah");
      }
      const passwordMatch = bcrypt.compare(password, result[0].password);

      if (!passwordMatch) {
        throw Error("Email atau password salah");
      }

      return {
        data: result.id,
      };
    } catch (error) {}
  }

  async updatePassword(req) {
    try {
      const { id, new_password, old_password } = req;

      const query = "SELECT password FROM user WHERE id = ? ";
      const result = await connection.query(query, [id]);

      if (result.length == 0) {
      }

      const passwordMatch = await bcrypt.compare(
        old_password,
        result[0].password
      );

      if (!passwordMatch) {
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
