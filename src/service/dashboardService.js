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
    return result[0];
  }

  async get_donation_day(id) {
    const query = `    SELECT 
         DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL n DAY), '%Y-%m-%d') AS date,
    COALESCE(SUM(donation.donation), 0) AS total_donation
    FROM (
      SELECT 0 AS n UNION ALL
      SELECT 1 UNION ALL
      SELECT 2 UNION ALL
      SELECT 3 UNION ALL
      SELECT 4 UNION ALL
      SELECT 5 UNION ALL
      SELECT 6
    ) AS days
    LEFT JOIN donation ON DATE(donation.date) = DATE_SUB(CURDATE(),INTERVAL days.n DAY)
    LEFT JOIN campaign ON campaign.id = donation.campaign_id AND campaign.user_id = ?

    GROUP BY days.n
    ORDER BY date ASC
  
    `;

    const result = await connection.query(query, [id]);
    return result;
  }

  async get_donatur(id) {
    const query = `SELECT 
   COUNT(DISTINCT donation.user_id) as total_donatur,
   COALESCE(SUM(donation.donation) / COUNT(DISTINCT donation.user_id) , 0) as total_avg_donatur
    FROM donation
    LEFT JOIN campaign ON campaign.id = donation.campaign_id
    WHERE campaign.user_id = ?
    `;

    const result = await connection.query(query, [id]);
    return result[0];
  }
}

module.exports = new DashboardService();
