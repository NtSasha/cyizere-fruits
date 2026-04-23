const pool = require("../db");

const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "SELECT * FROM products WHERE id = $1",
            [id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;

        const result = await pool.query(
            "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
            [name, price]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct
};