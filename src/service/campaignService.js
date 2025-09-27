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
  }

  async showAll() {
    const query = "SELECT * FROM campaign";
    const [result] = await connection.query(query);
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
