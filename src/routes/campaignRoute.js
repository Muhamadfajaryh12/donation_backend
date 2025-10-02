const campaignController = require("../controller/campaignController");
const Authorization = require("../middleware/authorization");
const { upload } = require("../utils/Upload");
const router = require("express").Router();

const staticRouter = "/campaign";
router.get(staticRouter, campaignController.get);
router.get(staticRouter + "/yayasan/:id", campaignController.getByYayasan);
router.get(staticRouter + "/:id", campaignController.getByCategory);
router.post(
  staticRouter,
  Authorization,
  upload.single("image"),
  campaignController.create
);
router.put(
  staticRouter + "/:id",
  Authorization,
  upload.single("image"),
  campaignController.edit
);
router.delete(staticRouter + "/:id", Authorization, campaignController.delete);

module.exports = router;
