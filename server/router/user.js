const router = require("express").Router();
let User = require("../models/user.model");
import Game from "../models/Product.model";
import multer from "multer";

const {
  userRegister,
  userLogin,
  CreateProduct,
  ShowProduct,
} = require("../utils/controller");

//defile storage for the images
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads/images");
  },

  //add back extension
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

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

router.post("/api/insert", upload.single("image"), async (req, res) => {
  const imageUrl = req.file.filename;
  const title = req.body.title;
  const price = req.body.price;
  const products = new Game({ imageUrl, title, price });
  try {
    await products.save();
    res.status(201).json("Created!!");
  } catch (error) {
    console.log(error);
  }
});

// router.get("api/Product", async (req, res) => {
//   const products = await Products.find();
//   res.send(products);
// });

// router.post("api/createProduct", async (req, res) => {
//   const { imageUrl, title, price } = req.body;

//   const newProduct = new Products({ imageUrl, title, price });

//   const ProductSaved = await newProduct.save();

//   res.status(201).json(ProductSaved);
// });

module.exports = router;
