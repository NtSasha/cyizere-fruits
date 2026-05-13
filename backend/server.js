require('dotenv').config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const app = express();

// Security: Set security-related HTTP headers
app.use(helmet());

// Security: Rate limiting to prevent brute force/DDoS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Increased for development
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use("/api/", limiter);

// Scalability: Compress all responses
app.use(compression());

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Cyizere Fruits API is running");
});

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const builderRoutes = require("./routes/builderRoutes");
app.use("/api/builder", builderRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});