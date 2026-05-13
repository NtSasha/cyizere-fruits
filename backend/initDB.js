const pool = require('./db');

const initDB = async () => {
    try {
        console.log("Checking and initializing database schema...");

        // Create Users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(20),
                password VARCHAR(255) NOT NULL,
                role VARCHAR(20) DEFAULT 'customer',
                profile_picture VARCHAR(255),
                two_factor_enabled BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Users table ready.");

        // Create Products table (if not exists)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price NUMERIC NOT NULL,
                stock INTEGER DEFAULT 0,
                category VARCHAR(255),
                "categoryLabel" VARCHAR(255),
                unit VARCHAR(50),
                image VARCHAR(255),
                badge VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Products table ready.");

        // Create Orders table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
                total_price NUMERIC NOT NULL,
                status VARCHAR(20) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Orders table ready.");

        // Create Order Items table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS order_items (
                id SERIAL PRIMARY KEY,
                order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
                product_id INTEGER,
                quantity INTEGER NOT NULL,
                price NUMERIC NOT NULL
            )
        `);
        console.log("Order Items table ready.");

        // Create Cart table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS cart (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                product_id INTEGER NOT NULL,
                quantity INTEGER NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Cart table ready.");

        console.log("Database initialization complete!");
        process.exit(0);
    } catch (err) {
        console.error("Error initializing database:", err.message);
        process.exit(1);
    }
};

initDB();
