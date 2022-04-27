const express = require("express");
const ProductController = require("../controllers/product");
const md_auth = require("../middleware/authenticate");

const api = express.Router();

api.post("/add-product", [md_auth.ensureAuth], ProductController.addProduct);
api.get("/get-products", ProductController.getProducts);
api.put(
  "/update-product/:id",
  [md_auth.ensureAuth],
  ProductController.updateProduct
);
api.delete(
  "/delete-product/:id",
  [md_auth.ensureAuth],
  ProductController.deleteProduct
);
api.get("/get-product/:url", ProductController.getProduct);

module.exports = api;
