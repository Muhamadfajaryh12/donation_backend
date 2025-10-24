const dashboardService = require("../service/dashboardService");
const response = require("../utils/Response");

class DashboardController {
  async getSummaryCampaign(req, res, next) {
    try {
      const user = req.user;
      const dataCampaign = await dashboardService.get_summary(user.id);
      const dataDonationDay = await dashboardService.get_donation_day(user.id);
      const dataCountDonatur = await dashboardService.get_donatur(user.id);
      response(res, 200, "Berhasil fetch", {
        data_campaign: dataCampaign,
        data_donation_day: dataDonationDay,
        data_total_donatur: dataCountDonatur,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();
