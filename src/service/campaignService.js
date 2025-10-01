const connection = require("../database/database");

class CampaignService {
  async store(req) {
    const {
      title,
      location,
      image,
      description,
      amount,
      expired_date,
      status,
      category_id,
      user_id,
    } = req;

    const query = `INSERT INTO campaign (title,
        location,
        image,
        description,
        amount,
        expired_date,
        status,
        category_id,
        user_id) VALUES(?,?,?,?,?,?,?,?,?)`;
    console.log(req);
    const result = await connection.query(query, [
      title,
      location,
      image,
      description,
      amount,
      expired_date,
      status,
      category_id,
      user_id,
    ]);

    return result;
  }

  async showAll() {
    const query =
      "SELECT * FROM campaign INNER JOIN category ON category.id = campaign.category_id";
    const result = await connection.query(query);
    return result;
  }

  async showByCategory(category) {
    const query = `SELECT * FROM campaign WHERE category_id = ?`;
    const [result] = await connection.query(query, [category]);
    return result;
  }

  async update(req) {
    const {
      title,
      location,
      image,
      description,
      amount,
      expired_date,
      status,
      category_id,
      user_id,
      id,
    } = req;

    const query = `UPDATE campaign SET     
      title = ?,
      location = ?,
      image = ?,
      description = ?,
      amount = ?,
      expired_date = ?,
      status = ?,
      category_id = ?,
      user_id = ? WHERE id = ?`;

    const [result] = await connection.query(query, [
      title,
      location,
      image,
      description,
      amount,
      expired_date,
      status,
      category_id,
      user_id,
      id,
    ]);

    return result;
  }

  async destroy(id) {
    const query = "DELETE campaign WHERE id = ?";
    const [result] = await connection.query(query, [id]);
    return { id };
  }
}

module.exports = new CampaignService();
