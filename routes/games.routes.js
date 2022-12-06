const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/games", (req, res, next) => {
  res.render("games");
});

module.exports = router;
