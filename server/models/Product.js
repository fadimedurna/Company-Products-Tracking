const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId, // this is the type of the id of the company
    ref: "Company",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
