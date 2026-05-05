const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    addToCart,
    getCart,
    removeFromCart,
    syncCart
} = require("../controllers/cartController");

router.post("/", auth, addToCart);
router.post("/sync", auth, syncCart);
router.get("/", auth, getCart);
router.delete("/:id", auth, removeFromCart);

module.exports = router;