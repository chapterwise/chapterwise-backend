const cartDB = require("../models/cart.model");

// Create a new cart
const createCart = async (req, res) => {
  try {
    const { userId, items } = req.body;
    const cart = new cartDB({ userId, items });
    await cart.save();
    res.status(201).json({ message: "Cart created successfully", cart });
  } catch (err) {
    console.error("createCart error:", err);
    res.status(500).json({ error: "Failed to create cart" });
  }
};

// Get all carts (for admin or debugging)
const getAllCarts = async (req, res) => {
  try {
    const carts = await cartDB.find({}).populate("userId").populate("items.bookId");
    res.status(200).json({ carts });
  } catch (err) {
    console.error("getAllCarts error:", err);
    res.status(500).json({ error: "Failed to fetch carts" });
  }
};

// Get a single cart by ID
const getOneCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartDB.findById(id).populate("userId").populate("items.bookId");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({ cart });
  } catch (err) {
    console.error("getOneCart error:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// Update a cart by ID (e.g., add or remove items, update quantities)
const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const cart = await cartDB.findByIdAndUpdate(id, updatedData, { new: true }).populate("userId").populate("items.bookId");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (err) {
    console.error("updateCart error:", err);
    res.status(500).json({ error: "Failed to update cart" });
  }
};

// Delete a cart by ID
const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartDB.findByIdAndDelete(id);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (err) {
    console.error("deleteCart error:", err);
    res.status(500).json({ error: "Failed to delete cart" });
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getOneCart,
  updateCart,
  deleteCart,
};
