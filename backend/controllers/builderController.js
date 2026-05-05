const pool = require("../db");

const getBuilderIngredients = async (req, res) => {
    try {
        const { builder_type } = req.query;
        let query = "SELECT * FROM builder_ingredients";
        let params = [];
        
        if (builder_type) {
            query += " WHERE builder_type = $1";
            params.push(builder_type);
        }
        
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getBuilderIngredients
};
