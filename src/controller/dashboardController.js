const dashboardService = require("../service/dashboardService");
const response = require("../utils/Response");

class DashboardController {
  async getSummaryCampaign(req, res, next) {
    try {
      const { id } = req.params;
      const dataCampaign = await dashboardService.get_summary(id);
      const dataDonationDay = await dashboardService.get_donation_day(id);
      response(res, 200, "Berhasil fetch", {
        data_campaign: dataCampaign,
        data_donation_day: dataDonationDay,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();
