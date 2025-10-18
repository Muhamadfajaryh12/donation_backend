const donationService = require("../service/donationService");
const DonationService = require("../service/donationService");
const response = require("../utils/Response");
const paymentController = require("./paymentController");
require("dotenv");
class DonationController {
  async createDonation(req, res, next) {
    try {
      const { name, message, donation, campaign_id } = req.body;

      const user = req.user;
      const result = await DonationService.store({
        name,
        message,
        status_payment: "Pending",
        donation,
        user_id: user.id,
        campaign_id,
      });

      const transaction = await paymentController.Transaction({
        id: result.id,
        amount: donation,
        name: name,
        email: user.email,
      });

      return response(res, 201, "Berhasil mengirimkan donasi", {
        ...result,
        transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  async getHistoryDonation(req, res, next) {
    try {
      const user = req.user;
      const result = await donationService.getHistoryDonation(user.id);
      const donation = result.map((item) => ({
        ...item,
        image: `${process.env.BASE_URL}${item.image}`,
      }));
      return response(res, 200, "Berhasil fetch riwayat donasi", donation);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DonationController();
