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
    const query = `SELECT campaign.title,campaign.image,campaign.amount, campaign.id, campaign.status,users.name,users.is_verified,campaign.category_id,category.category,
    GREATEST(DATEDIFF(campaign.expired_date, CURDATE()), 0) AS remaining_days,
    COALESCE(SUM(donation.donation),0) as current_amount
     FROM campaign 
      INNER JOIN category ON category.id = campaign.category_id
      INNER JOIN users ON users.id = campaign.user_id
      LEFT JOIN donation ON donation.campaign_id = campaign.id
    GROUP BY 
    campaign.id,
    campaign.title,
    campaign.image,
    campaign.amount,
    campaign.status,
    users.name,
    users.is_verified,
    campaign.category_id,
    category.category,
    campaign.expired_date;
      `;
    const result = await connection.query(query);
    return result;
  }

  async showDetail(id) {
    const query = `SELECT * 
    FROM campaign
      INNER JOIN category ON category.id = campaign.category_id
      INNER JOIN users ON users.id = campaign.user_id
      LEFT JOIN donaion ON donation.campaign_id = campaign.id
      WHERE campaign.id = ?
    `;

    const result = await connection.query(query, [id]);
    return result;
  }

  async showByYayasan(id) {
    const query = `SELECT campaign.title,campaign.image, campaign.id, campaign.status,users.name,users.is_verified,campaign.category_id,category.category,
    GREATEST(DATEDIFF(campaign.expired_date, CURDATE()), 0) AS remaining_days
     FROM campaign 
      INNER JOIN category ON category.id = campaign.category_id
      INNER JOIN users ON users.id = campaign.user_id
      WHERE campaign.user_id = ?
    `;
    const result = await connection.query(query, [id]);
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
