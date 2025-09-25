const connection = require("../database/database");

class CategoryService {
  async store(req) {
    try {
      const { category } = req;
      const query = "INSERT INTO category (category) VALUES (?)";
      const result = await connection.query(query, [category]);
    } catch (err) {}
  }

  async showAll(req) {
    try {
      const query = "SELECT * FROM category";
      const [result] = await connection.query(query);
    } catch (err) {}
  }

  async update(req) {
    try {
      const { category, id } = req;
      const query = "UPDATE category SET category = ? WHERE id = ?";
      const [result] = await connection.query(query, [category, id]);
    } catch (err) {}
  }

  async delete(req) {
    try {
      const { id } = req;
      const query = "DELETE category WHERE id = ?";
      const [result] = await connection.query(query, [id]);
    } catch (err) {}
  }
}

module.exports = new CategoryService();
