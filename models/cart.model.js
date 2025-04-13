const mongoose = require("mongoose");

//TODO : Add updatedAt field to later check for stagnant carts

// Define the main Cart schema
const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    // ref: "userDB", // or the name you use for your user collection
    required: true,
  },
  bookId : {
    type : String,
    required: true,
  },
  quantity : {
    type : Number,
    default : 0
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("cartDB", CartSchema);
