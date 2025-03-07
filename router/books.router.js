const express = require("express");
const router = express.Router();

const bookController = require("../controller/book.controller");
const verifyToken = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/role.middleware');


// Get all books
router.get("/books", bookController.getAllBooks);

// Get one book by ID
router.get("/book/:id", bookController.getOneBook);

// Create a new book
router.post("/book", [verifyToken, isAdmin] , bookController.createBook);

// Update a book by ID
router.patch("/book/:id", [verifyToken, isAdmin] , bookController.updateBook);

// Delete a book by ID
router.delete("/book/:id", [verifyToken, isAdmin] , bookController.deleteBook);

module.exports = router;
