const pool = require("../db");


const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id, quantity } = req.body;

        await pool.query(
            `INSERT INTO cart (user_id, product_id, quantity)
             VALUES ($1, $2, $3)`,
            [userId, product_id, quantity]
        );

        res.json({ message: "Item added to cart" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            `SELECT c.id, c.quantity, p.name, p.price
             FROM cart c
             JOIN products p ON c.product_id = p.id
             WHERE c.user_id = $1`,
            [userId]
        );

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM cart WHERE id = $1 AND user_id = $2",
            [id, req.user.id]
        );

        res.json({ message: "Item removed" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart
};