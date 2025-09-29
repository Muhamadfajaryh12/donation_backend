const campaignController = require("../controller/campaignController");
const Authorization = require("../middleware/authorization");
const { upload } = require("../utils/Upload");
const router = require("express").Router();

router.get("/", campaignController.get);
router.get("/:id", campaignController.getByCategory);
router.post(
  "/",
  Authorization,
  upload.single("image"),
  campaignController.create
);
router.put(
  "/:id",
  Authorization,
  upload.single("image"),
  campaignController.edit
);
router.delete("/:id", Authorization, campaignController.delete);

module.exports = router;
