const express = require("express");
const router = express.Router();
const { verifyPayment } = require("../controllers/paymentController");
const auth = require("../middleware/auth");

router.post("/verify", auth, verifyPayment);

module.exports = router;
