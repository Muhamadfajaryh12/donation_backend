const connection = require("../database/database");
const bcrypt = require("bcrypt");
class userService {
  async store(req) {
    const { email, name, password, role } = req;
    try {
      const query =
        "INSERT INTO users (email,name,password,role) VALUES(?,?,?,?)";
      const result = await connection.query(query, [
        email,
        name,
        password,
        role,
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getUser({ email, password }) {
    try {
      const query = "SELECT email, password FROM users WHERE email = ?";
      const result = await connection.query(query, [email]);

      if (result.length == 0) {
        throw Error("Email atau Password salah");
      }
      const passwordMatch = await bcrypt.compare(password, result[0].password);

      if (!passwordMatch) {
        throw Error("Email atau password salah");
      }

      return {
        data: result[0].id,
      };
    } catch (error) {
      console.log(error);
    }
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
