const pool = require("../db");

const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
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
        const { name, price, category, unit, image, badge, stock } = req.body;

        const result = await pool.query(
            `INSERT INTO products (name, price, category, unit, image, badge, stock) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name, price, category, unit, image, badge, stock || 100]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, category, unit, image, badge, stock } = req.body;

        const result = await pool.query(
            `UPDATE products SET name = $1, price = $2, category = $3, unit = $4, image = $5, badge = $6, stock = $7 
             WHERE id = $8 RETURNING *`,
            [name, price, category, unit, image, badge, stock, id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM products WHERE id = $1", [id]);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};