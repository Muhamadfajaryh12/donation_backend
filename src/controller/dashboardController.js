const dashboardService = require("../service/dashboardService");
const response = require("../utils/Response");

class DashboardController {
  async getSummaryCampaign(req, res, next) {
    try {
      const { id } = req.params;
      const data = await dashboardService.get_summary(id);
      response(res, 200, "Berhasil fetch", data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();
