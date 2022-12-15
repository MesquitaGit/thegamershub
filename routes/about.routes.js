const express = require("express");
const router = express.Router();
// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

/* GET home page */
router.get("/about", (req, res, next) => {
  res.render("about");
});

module.exports = router;
