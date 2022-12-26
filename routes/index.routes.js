const express = require("express");
const router = express.Router();
const ApiService = require("../services/api.service");
const apiService = new ApiService();

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const allGames = await apiService.getAllGames();
    const gameCardItems = allGames.data.results.slice(0, 4);

    res.render("index", {
      gameCardItems,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
