const { authorDB } = require("../models/author.model");
const {bookDB} = require("../models/books.model");

// Create a new Book
const createBook = async (req, res) => {
    try {
        const { name, authorId, price, sku, OwnerId, language, tags, genres } = req.body;

        //TODO : CHECK IF ALL GENRES EXIST

        const author = await authorDB.findById(authorId);

        if(!author){
            res.status(404).json({result : "Failed", message : "Author Not Found"});
            return;
        }

        const book = new bookDB({ name, authorId, price, sku, OwnerId, language, tags, genres });
        await book.save();
        res.status(201).json({ message: "Book created successfully", book });
    } catch (err) {
        console.error("createBook error:", err);
        res.status(500).json({ error: "Failed to create book" });
    }
};

// Get all Books
const getAllBooks = async (req, res) => {
    try {
        const books = await bookDB.find({});
        res.status(200).json({ books });
    } catch (err) {
        console.error("getAllBooks error:", err);
        res.status(500).json({ error: "Failed to fetch books" });
    }
};

// Get one Book by ID
const getOneBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await bookDB.findById(id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json({ book });
    } catch (err) {
        console.error("getOneBook error:", err);
        res.status(500).json({ error: "Failed to fetch book" });
    }
};

// Update a Book by ID
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const book = await bookDB.findByIdAndUpdate(id, updatedData, { new: true });
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json({ message: "Book updated successfully", book });
    } catch (err) {
        console.error("updateBook error:", err);
        res.status(500).json({ error: "Failed to update book" });
    }
};

// Delete a Book by ID
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await bookDB.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        console.error("deleteBook error:", err);
        res.status(500).json({ error: "Failed to delete book" });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getOneBook,
    updateBook,
    deleteBook,
};
