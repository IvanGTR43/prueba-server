const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const ProductSchema = Schema({
  name: String,
  url: String,
  description: String,
});
ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", ProductSchema);
