const connection = require(".database/database");

class userService {
  async store(req) {
    const { email, nama, password } = req;
    try {
      const query = "INSERT INTO user (email,nama,password) VALUES(?,?,?)";
      const result = await connection.query(query, [email, nama, password]);
      return result;
    } catch (error) {}
  }
}

export default userService;
