const express = require("express");
const router = express.Router();
const ApiService = require("../services/api.service");
const apiService = new ApiService();

/* GET home page */
router.get("/games", async (req, res, next) => {
  try {
    const allGames = await apiService.getAllGames();
    console.log("All games:", allGames.data);
    res.render("games", {
      games: allGames.data,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/games/:gameId", async (req, res, next) => {
  const { gameId } = req.params;

  try {
    const singleGame = await apiService.getSingleGame(gameId);
    console.log("game:", singleGame.data);
    res.render("game-details", { game: singleGame.data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
