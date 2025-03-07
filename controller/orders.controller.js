const orderDB = require("../models/orders.model");
const invoiceDB = require("../models/invoice.model");
const cartDB = require("../models/cart.model");
const bookDB = require("../models/books.model");
const popularityDB = require("../models/popularityDB");

// Create a new Order: place an order from the current user's cart
const createOrder = async (req, res) => {
  try {
    // Assume req.user holds the authenticated user info (e.g., via verifyToken middleware)
    const userId = req.user._id;
    const address = req.body.address; // expect an object or an array of address(es)

    // Retrieve the user's cart and populate the book details
    const cart = await cartDB.findOne({ userId }).populate("items.bookId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    let orderItems = [];
    let itemTotal = 0;

    // Process each cart item: assume each cart item has a "quantity" property and a populated "bookId"
    for (const item of cart.items) {
      const book = item.bookId;
      const quantity = item.quantity;
      // Push the same book document as many times as the quantity ordered.
      for (let i = 0; i < quantity; i++) {
        orderItems.push(book);
      }
      // Sum up the total price
      itemTotal += book.price * quantity;

      // Update popularity count for this book's SKU
      const sku = book.sku;
      const popRecord = await popularityDB.findOne({ sku });
      if (popRecord) {
        popRecord.orders += quantity;
        await popRecord.save();
      } else {
        await popularityDB.create({ sku, orders: quantity });
      }
    }

    // Calculate the bill details
    const tax = itemTotal * 0.1; // e.g., 10% tax
    const delivery = 5; // flat fee
    const discount = 0; // no discount applied

    // Create the invoice
    let invoiceData = {
      orderId: "", // will update once order is created
      itemTotal,
      tax,
      delivery,
      discount,
    };
    const invoice = await invoiceDB.create(invoiceData);

    // Create initial order status
    const initialStatus = {
      status: "Order Placed",
      timestamp: new Date(),
    };

    // Create the order
    const orderData = {
      items: orderItems,
      address: Array.isArray(address) ? address : [address],
      bill: invoice,
      status: [initialStatus],
    };
    const order = await orderDB.create(orderData);

    // Update the invoice with the created order id
    invoice.orderId = order._id.toString();
    await invoice.save();

    // Clear the user's cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("createOrder error:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
};

// Get all orders (e.g., for admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderDB
      .find({})
      .populate("items")
      .populate("bill")
      .populate("address")
      .populate("status");
    res.status(200).json({ orders });
  } catch (err) {
    console.error("getAllOrders error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get one order by ID
const getOneOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderDB
      .findById(id)
      .populate("items")
      .populate("bill")
      .populate("address")
      .populate("status");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (err) {
    console.error("getOneOrder error:", err);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Update an order by ID (e.g., update status)
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const order = await orderDB.findByIdAndUpdate(id, updatedData, { new: true });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (err) {
    console.error("updateOrder error:", err);
    res.status(500).json({ error: "Failed to update order" });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderDB.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("deleteOrder error:", err);
    res.status(500).json({ error: "Failed to delete order" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOneOrder,
  updateOrder,
  deleteOrder,
};
