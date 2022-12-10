const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema({
  apiId: String,
  name: String,
  backgroundImage: String,
});

const Favorite = model("Favorite", favoriteSchema);

module.exports = Favorite;
