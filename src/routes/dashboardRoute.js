const dashboardController = require("../controller/dashboardController");
const Authorization = require("../middleware/authorization");

const router = require("express").Router();

const pathStatic = "/dashboard";
router.get(
  `${pathStatic}`,
  Authorization,
  dashboardController.getSummaryCampaign
);

module.exports = router;
