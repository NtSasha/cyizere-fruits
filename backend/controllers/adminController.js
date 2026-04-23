const pool = require("../db");

const getAllOrders = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, user_id, total_price, status, created_at
             FROM orders
             ORDER BY id DESC`
        );

        res.json({
            success: true,
            orders: result.rows
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const result = await pool.query(
            `UPDATE orders
             SET status = $1
             WHERE id = $2
             RETURNING *`,
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.json({
            success: true,
            message: "Order status updated",
            order: result.rows[0]
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const getTotalOrders = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(*) FROM orders`
        );

        res.json({
            success: true,
            total_orders: result.rows[0].count
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const getTotalRevenue = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT COALESCE(SUM(total_price), 0) FROM orders`
        );

        res.json({
            success: true,
            total_revenue: result.rows[0].coalesce
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const getPendingOrders = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(*) FROM orders WHERE status = 'pending'`
        );

        res.json({
            success: true,
            pending_orders: result.rows[0].count
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const getTopProducts = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
                p.name,
                SUM(oi.quantity) AS total_sold
             FROM order_items oi
             JOIN products p ON p.id = oi.product_id
             GROUP BY p.name
             ORDER BY total_sold DESC`
        );

        res.json({
            success: true,
            products: result.rows
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const getDeliveredProducts = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
                p.name,
                SUM(oi.quantity) AS total_quantity
             FROM order_items oi
             JOIN products p ON p.id = oi.product_id
             JOIN orders o ON o.id = oi.order_id
             WHERE o.status = 'delivered'
             GROUP BY p.name
             ORDER BY total_quantity DESC`
        );

        res.json({
            success: true,
            products: result.rows
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


module.exports = {
    getAllOrders,
    updateOrderStatus,
    getTotalOrders,
    getTotalRevenue,
    getPendingOrders,
    getTopProducts,
    getDeliveredProducts
};