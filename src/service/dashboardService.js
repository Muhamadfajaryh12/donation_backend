const connection = require("../database/database");

class DashboardService {
  async get_summary(id) {
    const query = `SELECT 
    COALESCE(COUNT(id),0) as total_campaign,
    COALESCE(SUM(status = 'buka'), 0) as total_campaign_open,   
    COALESCE(SUM(status = 'tutup'), 0) as total_campaign_close
    FROM campaign
    WHERE user_id = ?
    `;

    const result = await connection.query(query, [id]);
    return result;
  }
}

module.exports = new DashboardService();
