const axios = require('axios');
const pool = require("../db");

const verifyPayment = async (req, res) => {
    const { transaction_id, items, customer } = req.body;

    if (!transaction_id) {
        return res.status(400).json({ error: "Transaction ID is required" });
    }

    try {
        // 1. Verify transaction with Flutterwave
        let amount = 0;
        let isCOD = transaction_id === 'COD';

        if (!isCOD) {
            // Use secret key from env
            const secretKey = process.env.FLW_SECRET_KEY || 'FLWSECK_TEST-PLACEHOLDER';
            
            const response = await axios.get(
                `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
                {
                    headers: {
                        Authorization: `Bearer ${secretKey}`
                    }
                }
            );

            const { status } = response.data.data;

            // 2. Validate payment details
            if (status !== "successful") {
                return res.status(400).json({ error: "Payment was not successful" });
            }
        }

        // 3. Create the order (Logic moved from orderController)
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            
            let totalPrice = 0;
            for (let item of items) {
                totalPrice += item.price * item.quantity;
            }

            // Simple delivery fee logic (matching frontend)
            const deliveryFee = totalPrice > 0 ? 2000 : 0;
            const finalTotal = totalPrice + deliveryFee;

            // Optional: Verify finalTotal against amount from Flutterwave
            // if (Math.abs(finalTotal - amount) > 0.01) { ... }

            let orderResult;
            try {
                orderResult = await client.query(
                    `INSERT INTO orders (user_id, total_price, status) VALUES ($1, $2, 'paid') RETURNING *`,
                    [req.user.id, finalTotal]
                );
            } catch (err) {
                console.error("Order insertion error:", err);
                throw new Error("Failed to create order record");
            }

            const orderId = orderResult.rows[0].id;

            for (let item of items) {
                await client.query(
                    `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)`,
                    [orderId, item.id, item.quantity, item.price]
                );
            }

            await client.query("COMMIT");

            // --- SEND EMAIL NOTIFICATION ---
            if (customer && customer.email) {
                const { sendOrderConfirmation } = require('../utils/emailService');
                // Run asynchronously without awaiting so it doesn't block the API response
                sendOrderConfirmation(
                    customer.email, 
                    customer.fullName || 'Valued Customer', 
                    orderId, 
                    finalTotal, 
                    items
                );
            }

            res.status(201).json({ 
                success: true, 
                message: "Payment verified and order placed", 
                order: orderResult.rows[0],
                transaction_id 
            });

        } catch (err) {
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release();
        }

    } catch (error) {
        console.error("Payment verification error:", error.response?.data || error.message);
        res.status(500).json({ 
            error: "Payment verification failed", 
            details: error.response?.data?.message || error.message 
        });
    }
};

module.exports = {
    verifyPayment
};
