const mongoose = require("mongoose");

// Define a schema for each item in the cart
const CartItemSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookDB",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

// Define the main Cart schema
const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userDB", // or the name you use for your user collection
    required: true,
  },
  items: {
    type: [CartItemSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("cartDB", CartSchema);
