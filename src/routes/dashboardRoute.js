const dashboardController = require("../controller/dashboardController");

const router = require("express").Router();

const pathStatic = "/dashboard";
router.get(`${pathStatic}/:id`, dashboardController.getSummaryCampaign);

module.exports = router;
