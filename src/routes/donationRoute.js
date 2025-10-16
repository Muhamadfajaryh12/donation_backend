const router = require("express").Router();
const donationController = require("../controller/donationController");
const paymentController = require("../controller/paymentController");
const Authorization = require("../middleware/authorization");

router.post("/donation", Authorization, donationController.createDonation);
router.post("/notification", paymentController.Notification);
module.exports = router;
