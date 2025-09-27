const campaignService = require("../service/campaignService");

class CampaignController {
  async create(req, res) {
    try {
      const result = await campaignService.store(req.body);
    } catch (error) {}
  }

  async get(req, res) {
    try {
      const result = await campaignService.showAll();
    } catch (error) {}
  }
}

module.exports = new CampaignController();
