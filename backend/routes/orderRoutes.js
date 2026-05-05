const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorizeRole = require("../middleware/role");

const {
    createOrder,
    createGuestOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    getMyOrders,
    checkout,
    getOrderDetails
} = require("../controllers/orderController");


router.post("/", auth, createOrder);
router.post("/guest", createGuestOrder);
router.get("/my-orders", auth, getMyOrders);
router.get("/:id", getOrderById);
router.post("/checkout", auth, checkout);
router.get("/:id/details", auth, getOrderDetails);

module.exports = router;