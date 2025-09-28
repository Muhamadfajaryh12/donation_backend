const campaignService = require("../service/campaignService");

class CampaignController {
  async create(req, res) {
    try {
      const {
        title,
        location,
        description,
        amount,
        expired_date,
        status,
        category_id,
        user_id,
      } = req.body;

      const image = req.file ? `/public/uploads/${req.file.filename}` : null;
      const result = await campaignService.store({
        title,
        location,
        image,
        description,
        amount,
        expired_date,
        status,
        category_id,
        user_id,
      });
    } catch (error) {}
  }

  async get(req, res) {
    try {
      const result = await campaignService.showAll();
    } catch (error) {}
  }

  async getByCategory(req, res) {
    try {
      const { id } = req.params;
      const result = await campaignService.showByCategory(id);
    } catch (error) {}
  }

  async edit(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        location,
        description,
        amount,
        expired_date,
        status,
        category_id,
        user_id,
      } = req.body;
      const image = req.file ? `/public/uploads/${req.file.filename}` : null;
      const result = await campaignService.edit({
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
      });
    } catch (error) {}
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await campaignService.destroy(id);
    } catch (error) {}
  }
}

module.exports = new CampaignController();
