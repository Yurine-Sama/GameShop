const mongoose = require("mongoose");

const Products = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { collection: "Product-data" }
);

const Game = mongoose.model("Game", Products);

module.exports = Game;
