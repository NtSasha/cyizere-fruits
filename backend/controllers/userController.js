const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

    
        const token = jwt.sign(
            { id: user.id, email: user.email, role:user.role },
            "secret_key",
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById
};