const express = require("express");
const router = express.Router();

const bookController = require("../controller/books.controller");
const verifyToken = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/role.middleware');


// Get all books
router.get("/all", bookController.getAllBooks);

// Get one book by ID
router.get("/:id", bookController.getOneBook);

// Create a new book
router.post("/", [verifyToken, isAdmin] , bookController.createBook);

// Update a book by ID
router.patch("/:id", [verifyToken, isAdmin] , bookController.updateBook);

// Delete a book by ID
router.delete("/:id", [verifyToken, isAdmin] , bookController.deleteBook);

module.exports = router;
