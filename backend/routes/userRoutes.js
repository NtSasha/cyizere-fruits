const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    changePassword,
    toggle2FA
} = require("../controllers/userController");

const auth = require("../middleware/auth");

const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post("/register", [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Name is required'),
    validate
], registerUser);

router.post("/login", [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    validate
], loginUser);

router.get("/", getAllUsers);
router.get("/:id", getUserById);

// Security settings
router.put("/change-password", auth, changePassword);
router.put("/toggle-2fa", auth, toggle2FA);

module.exports = router;