const pool = require("../db");


const createGuestOrder = async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        
        const { items, customer } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ error: "No items provided" });
        }

        let totalPrice = 0;
        for (let item of items) {
            // Using price sent from frontend since products are hardcoded there
            // In production, ALWAYS verify price from database
            const price = item.price;
            totalPrice += price * item.quantity;
        }

        // Use a dummy user_id or NULL if allowed. Many schemas allow NULL for guest orders.
        // We will pass NULL and let the DB handle it or fail if constrained. 
        // A better approach is often to create a guest user or use a specific guest ID.
        // For this, we'll try NULL first. If it fails, we catch the error.
        let orderResult;
        try {
            orderResult = await client.query(
                `INSERT INTO orders (user_id, total_price, status) VALUES (NULL, $1, 'paid') RETURNING *`,
                [totalPrice]
            );
        } catch (err) {
            // Fallback: If user_id is NOT NULL, try inserting with user_id = 1 (dummy user)
            orderResult = await client.query(
                `INSERT INTO orders (user_id, total_price, status) VALUES (1, $1, 'paid') RETURNING *`,
                [totalPrice]
            );
        }

        const orderId = orderResult.rows[0].id;

        for (let item of items) {
            const price = item.price;

            await client.query(
                `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)`,
                [orderId, item.id, item.quantity, price]
            );
            
            // Note: Skipping stock update since products might not exist in the DB
        }

        await client.query("COMMIT");
        res.status(201).json({ message: "Order placed successfully", order: orderResult.rows[0] });

    } catch (err) {
        await client.query("ROLLBACK");
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
};

const createOrder = async (req, res) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const user_id = req.user.id; 
        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "No items provided" });
        }

        let totalPrice = 0;

        for (let item of items) {
            const productResult = await client.query(
                "SELECT price FROM products WHERE id = $1",
                [item.product_id]
            );

            if (productResult.rows.length === 0) {
                throw new Error(`Product ${item.product_id} not found`);
            }

            const price = productResult.rows[0].price;
            totalPrice += price * item.quantity;
        }

        
        const orderResult = await client.query(
            `INSERT INTO orders (user_id, total_price)
             VALUES ($1, $2)
             RETURNING *`,
            [user_id, totalPrice]
        );

        const orderId = orderResult.rows[0].id;

        
        for (let item of items) {
            const productResult = await client.query(
                "SELECT price FROM products WHERE id = $1",
                [item.product_id]
            );

            const price = productResult.rows[0].price;

            await client.query(
                `INSERT INTO order_items 
                (order_id, product_id, quantity, price)
                VALUES ($1, $2, $3, $4)`,
                [orderId, item.product_id, item.quantity, price]
            );
        }

        await client.query("COMMIT");

        res.status(201).json({
            message: "Order created successfully",
            order: orderResult.rows[0]
        });

    } catch (err) {
        await client.query("ROLLBACK");
        res.status(500).json({ error: err.message });

    } finally {
        client.release();
    }
};



const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const orderResult = await pool.query(
            "SELECT * FROM orders WHERE id = $1",
            [id]
        );

        if (orderResult.rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

    const itemsResult = await pool.query(
    `SELECT 
        oi.id,
        oi.quantity,
        oi.price,
        p.name AS product_name
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = $1`,
    [id]
);

        res.json({
            order: orderResult.rows[0],
            items: itemsResult.rows
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        
        const { status, page = 1, limit = 5 } = req.query;

        const offset = (page - 1) * limit;

        let query = `
            SELECT id, total_price, status, created_at
            FROM orders
            WHERE user_id = $1
        `;

        let values = [userId];
        let paramIndex = 2;

        
        if (status) {
            query += ` AND status = $${paramIndex}`;
            values.push(status);
            paramIndex++;
        }

    
        query += `
            ORDER BY id DESC
            LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
        `;

        values.push(limit, offset);

        const result = await pool.query(query, values);

        res.json({
            success: true,
            page: Number(page),
            limit: Number(limit),
            orders: result.rows
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const checkout = async (req, res) => {
    try {
        const userId = req.user.id;

        
        const cartResult = await pool.query(
            `SELECT 
                c.product_id,
                c.quantity,
                p.price,
                p.stock
             FROM cart c
             JOIN products p ON c.product_id = p.id
             WHERE c.user_id = $1`,
            [userId]
        );

        const cartItems = cartResult.rows;

        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        
        for (let item of cartItems) {
            if (item.stock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for product ID ${item.product_id}`
                });
            }
        }

    
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });

    
        const orderResult = await pool.query(
            `INSERT INTO orders (user_id, total_price, status)
             VALUES ($1, $2, 'pending')
             RETURNING *`,
            [userId, total]
        );

        const orderId = orderResult.rows[0].id;

        
        for (let item of cartItems) {

            
            await pool.query(
                `INSERT INTO order_items (order_id, product_id, quantity, price)
                 VALUES ($1, $2, $3, $4)`,
                [orderId, item.product_id, item.quantity, item.price]
            );

            
            await pool.query(
                `UPDATE products 
                 SET stock = stock - $1 
                 WHERE id = $2`,
                [item.quantity, item.product_id]
            );
        }

        
        await pool.query(
            "DELETE FROM cart WHERE user_id = $1",
            [userId]
        );

        
        res.json({
            message: "Order placed successfully",
            order_id: orderId,
            total_price: total
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `SELECT 
                o.id AS order_id,
                o.status,
                o.total_price,
                oi.quantity,
                oi.price,
                p.name AS product_name
             FROM orders o
             JOIN order_items oi ON o.id = oi.order_id
             JOIN products p ON p.id = oi.product_id
             WHERE o.id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({
            order: result.rows[0].order_id,
            status: result.rows[0].status,
            total_price: result.rows[0].total_price,
            items: result.rows.map(row => ({
                product: row.product_name,
                quantity: row.quantity,
                price: row.price
            }))
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createOrder,
    createGuestOrder,
    getOrderById,
    getMyOrders,
    checkout,
    getOrderDetails
};