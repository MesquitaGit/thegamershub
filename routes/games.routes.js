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

    res.render("search-results", { games: searchResults.data.results });
  } catch (error) {
    next(error);
  }
});

router.get("/games", async (req, res, next) => {
  try {
    const allGames = await apiService.getAllGames();

    res.render("games", {
      games: allGames.data.results,
      sortMethod: "popularity",
      nextPage: 2,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/games/game-details/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleGame = await apiService.getSingleGame(id);
    console.log(singleGame.data);
    res.render("game-details", { game: singleGame.data });
  } catch (error) {
    next(error);
  }
});

router.get("/games/:sortMethod", async (req, res, next) => {
  // Games can be sorted by: "name", "released", "added", "created", "updated", "rating", "metacritic".
  // You can reverse the sort order adding a hyphen, for example: "-released".
  const { sortMethod } = req.params;
  try {
    const orderedGames = await apiService.getAllGames(sortMethod);
    res.render("games", {
      games: orderedGames.data.results,
      sortMethod,
      nextPage: 2,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/games/:sortMethod/:pageNumber", async (req, res, next) => {
  const { sortMethod, pageNumber } = req.params;

  try {
    const nextPage = Number(pageNumber) + 1;
    const previousPage = Number(pageNumber) - 1 || 1;
    const orderedGames = await apiService.getAllGames(sortMethod, pageNumber);

    res.render("games", {
      games: orderedGames.data.results,
      sortMethod,
      nextPage,
      previousPage,
    });
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

    res.render("favorites", { favorites });
  } catch (error) {
    next(error);
  }
});

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
