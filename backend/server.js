const express = require("express");
const cors = require("cors");

const app = express();

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

app.listen(5000, () => {
    console.log("Server running on port 5000");
});