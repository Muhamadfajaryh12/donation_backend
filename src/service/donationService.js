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

  async getHistoryDonation(id) {
    const query = `SELECT donation.id,donation.name,donation.donation, campaign.title, users.name,users.is_verified, campaign.image FROM donation 
    INNER JOIN campaign ON campaign.id = donation.campaign_id
    INNER JOIN users ON users.id = campaign.user_id
    WHERE donation.user_id = ?

    `;
    const rows = await connection.query(query, [id]);
    return rows;
  }
  async destroy(id) {
    const query = `DELETE FROM donation WHERE id = ?`;
    const result = await connection.query(query, [id]);
    return result;
  }
}

module.exports = new DonationService();
