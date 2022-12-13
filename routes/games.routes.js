const express = require("express");
const router = express.Router();
const ApiService = require("../services/api.service");
const apiService = new ApiService();
const User = require("../models/User.model");
const Favorite = require("../models/Favorite.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/search", async (req, res, next) => {
  try {
    const { game } = req.query;
    const searchResults = await apiService.searchGame(game);
    //console.log(searchResults.data.results);
    res.render("search-results", { games: searchResults.data.results });
  } catch (error) {
    next(error);
  }
});

router.get("/games", async (req, res, next) => {
  try {
    const allGames = await apiService.getAllGames();
    //console.log("All games:", allGames.data);
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
    //console.log(allGames.data.results);
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

router.post("/favorites", isLoggedIn, async (req, res, next) => {
  try {
    const { name, apiId, background_image } = req.body;

    const userToCheck = await User.findById(
      req.session.currentUser._id
    ).populate("favorites");

    const filterFavorites = userToCheck.favorites.filter((game) => {
      console.log(game.apiId, " + ", apiId);
      return game.apiId === apiId;
    });

    if (filterFavorites.length === 0) {
      const newFavorite = await Favorite.create(req.body);
      await User.findByIdAndUpdate(req.session.currentUser._id, {
        $push: { favorites: newFavorite._id },
      });

      res.redirect("/favorites");
    } else {
      return res.redirect("/favorites");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/favorites", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findById(req.session.currentUser._id).populate(
      "favorites"
    );
    const { favorites } = user;
    console.log(favorites);
    res.render("favorites", { favorites });
  } catch (error) {
    next(error);
  }
});

//Delete Favorite

router.post("/favorites/:gameId/delete", async (req, res, next) => {
  try {
    const { _id: id } = req.session.currentUser;
    const { gameId } = req.params;
    await User.findByIdAndUpdate(id, {
      $pull: {
        favorites: gameId,
      },
    });
    await Favorite.findByIdAndDelete(gameId);
    res.redirect("/favorites");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
