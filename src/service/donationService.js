const connection = require("../database/database");

class DonationService {
  async store({
    name,
    message,
    status_payment,
    donation,
    user_id,
    campaign_id,
  }) {
    const query = `INSERT INTO donation (
    name,
    message,
    status_payment,
    donation,
    user_id,
    campaign_id) VALUES(?,?,?,?,?,?)`;
    const result = await connection.query(query, [
      name,
      message,
      status_payment,
      donation,
      user_id,
      campaign_id,
    ]);
    const queryGet = `SELECT * FROM donation WHERE id = ?`;
    const rows = await connection.query(queryGet, [result.insertId]);
    return rows[0];
  }

  async destroy(id) {
    const query = `DELETE FROM donation WHERE id = ?`;
    const result = await connection.query(query, [id]);
    return result;
  }
}

module.exports = new DonationService();
