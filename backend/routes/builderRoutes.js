const express = require("express");
const router = express.Router();
const { getBuilderIngredients } = require("../controllers/builderController");

router.get("/", getBuilderIngredients);

module.exports = router;
