const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

const {
    getAllOrders,
    updateOrderStatus,
    getTotalOrders,
    getTotalRevenue,
    getPendingOrders,
    getTopProducts,
    getDeliveredProducts
} = require("../controllers/adminController");


router.use(auth, isAdmin);

router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);
router.get("/stats/orders-count", getTotalOrders);
router.get("/stats/revenue", getTotalRevenue);
router.get("/stats/pending-orders", getPendingOrders);
router.get("/stats/top-products", getTopProducts);
router.get("/stats/delivered-products", getDeliveredProducts);


module.exports = router;