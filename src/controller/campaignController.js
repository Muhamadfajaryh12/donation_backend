const campaignService = require("../service/campaignService");
const response = require("../utils/Response");
const { upload, destroy } = require("../utils/Upload");
require("dotenv");
class CampaignController {
  async create(req, res) {
    try {
      const {
        title,
        location,
        description,
        amount,
        expired_date,
        status = "Buka",
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

      return response(res, 201, "Berhasil membuat campaign");
    } catch (error) {
      return response(res, 400, error);
    }
  }

  async get(req, res, next) {
    try {
      const { category_id, search } = req.query;

      if (category_id) {
        const result = await campaignService.showByCategory(category_id);
        const campaign = result.map((item) => ({
          ...item,
          image: `${process.env.BASE_URL}${item.image}`,
        }));
        return response(res, 200, "Berhasil fetch campaign", campaign);
      } else if (search) {
        const result = await campaignService.showSearch(search);
        const campaign = result.map((item) => ({
          ...item,
          image: `${process.env.BASE_URL}${item.image}`,
        }));
        return response(res, 200, "Berhasil fetch campaign", campaign);
      } else {
        const resultUrgent = await campaignService.showUrgent();
        const resultAll = await campaignService.showAll();
        const campaignUrgent = resultUrgent.map((item) => ({
          ...item,
          image: `${process.env.BASE_URL}${item.image}`,
        }));
        const campaignAll = resultAll.map((item) => ({
          ...item,
          image: `${process.env.BASE_URL}${item.image}`,
        }));
        return response(res, 200, "Berhasil fetch campaign", {
          urgent: campaignUrgent,
          all: campaignAll,
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  async getDetail(req, res, next) {
    try {
      const { id } = req.params;
      const result = await campaignService.showDetail(id);
      const campaign = result.map((item) => ({
        ...item,
        image: `${process.env.BASE_URL}${item.image}`,
      }));
      return response(res, 200, "Berhasil fetch campaign", campaign[0]);
    } catch (error) {
      return next(error);
    }
  }

  async getByYayasan(req, res, next) {
    try {
      const { id } = req.params;
      const result = await campaignService.showByYayasan(id);
      const campaign = result.map((item) => ({
        ...item,
        image: `${process.env.BASE_URL}${item.image}`,
      }));
      return response(res, 200, "Berhasil fetch campaign", campaign);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const { id } = req.params;
      const {
        title,
        location,
        description,
        amount,
        expired_date,
        status = "Buka",
        category_id,
      } = req.body;
      const campaign = await campaignService.showDetail(id);
      let image = campaign[0].image;
      if (req.file) {
        destroy(image);
        image = `/public/uploads/${req.file.filename}`;
      }
      const result = await campaignService.update({
        title,
        location,
        image,
        description,
        amount,
        expired_date,
        status,
        category_id,
        id,
      });

      return response(res, 200, "Berhasil mengedit campaign", result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const campaign = await campaignService.showDetail(id);
      destroy(campaign[0].image);
      const result = await campaignService.destroy(id);
      response(res, 200, "Berhasil menghapus campaign", { id: id });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CampaignController();
