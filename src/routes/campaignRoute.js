const campaignController = require("../controller/campaignController");
const Authorization = require("../middleware/authorization");
const multer = require("../utils/Upload");
const router = require("express").Router();

router.get("/", campaignController.get);
router.get("/:id", campaignController.getByCategory);
router.post("/", Authorization, multer.upload(), campaignController.create);
router.put("/:id", Authorization, multer.upload(), campaignController.edit);
router.delete("/:id", Authorization, campaignController.delete);

module.exports = router;
