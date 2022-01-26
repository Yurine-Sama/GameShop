const router = require("express").Router();
let User = require("../models/user.model");
import Products from "../models/Product.model";

const {
  userRegister,
  userLogin,
  CreateProduct,
  ShowProduct,
} = require("../utils/controller");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/api/register", async (req, res) => {
  await userRegister(req.body, "user", res);
});

router.post("/api/login", async (req, res) => {
  await userLogin(req.body, "user", res);
});

router.get("api/Product", async (req, res) => {
  const products = await Products.find();
  res.send(products);
});

router.post("api/createProduct", async (req, res) => {
  const { imageUrl, title, price } = req.body;

  const newProduct = new Products({ imageUrl, title, price });

  const ProductSaved = await newProduct.save();

  res.status(201).json(ProductSaved);
});

module.exports = router;
