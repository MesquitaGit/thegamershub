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
      games: allGames.data.results,
      nextPage: 2,
    });
  } catch (error) {
    next(error);
  }
});

/*finding the page number in next/previous key
to then render on hbs anchor tags for next and previous pages*/
function findPageNum(link) {
  if (!link) return null;

  let pageOnwards = link.substring(link.indexOf("page"));
  let equalsOnwards = pageOnwards.substring(pageOnwards.indexOf("=") + 1);
  let ampersandIndex = equalsOnwards.indexOf("&");

  if (ampersandIndex === -1) return `/games/${equalsOnwards}`;

  return `/games/${equalsOnwards.substring(0, ampersandIndex)}`;
}

router.get("/games/:pageNumber", async (req, res, next) => {
  const { pageNumber } = req.params;
  try {
    const nextPage = Number(pageNumber) + 1;
    const previousPage = Number(pageNumber) - 1 || 1;
    const allGames = await apiService.getAllGames(pageNumber);
    console.log(allGames.data.results);
    res.render("games", {
      games: allGames.data.results,
      nextPage,
      previousPage,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/games/game-details/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const singleGame = await apiService.getSingleGame(id);
    console.log("game:", singleGame.data);
    res.render("game-details", { game: singleGame.data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
