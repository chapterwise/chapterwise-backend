const { logger } = require("../logger");
const {authorDB} = require("../models/author.model");

// Create a new author
const createNewAuthor = async (req, res) => {
    logger.info("In Create New Author Function")
    try {
        const { name, penName, Origin } = req.body;
        const author = new authorDB({ name, penName, Origin });
        await author.save();
        res.status(201).json({ result: "Author created successfully", data : author });
    } catch (err) {
        console.error("createNewAuthor error:", err);
        res.status(500).json({ error: "Failed to create author" });
    }
};

// Get all authors
const getAllAuthors = async (req, res) => {
    try {
        const authors = await authorDB.find({});
        res.status(200).json({ result: "Success", data : authors });
    } catch (err) {
        console.error("getAllAuthors error:", err);
        res.status(500).json({ error: "Failed to fetch authors" });
    }
};

// Get one author by id
const getOneAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await authorDB.findById(id);
        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.status(200).json({ result : "Success", data : author });
    } catch (err) {
        console.error("getOneAuthor error:", err);
        res.status(500).json({ error: "Failed to fetch author" });
    }
};

// Update an author by id
const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const author = await authorDB.findByIdAndUpdate(id, updatedData, { new: true });
        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.status(200).json({ result: "Success", data : author });
    } catch (err) {
        console.error("updateAuthor error:", err);
        res.status(500).json({ error: "Failed to update author" });
    }
};

// Delete an author by id
const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await authorDB.findByIdAndDelete(id);
        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.status(200).json({ message: "Author deleted successfully" });
    } catch (err) {
        console.error("deleteAuthor error:", err);
        res.status(500).json({ error: "Failed to delete author" });
    }
};

module.exports = {
    createNewAuthor,
    getAllAuthors,
    getOneAuthor,
    updateAuthor,
    deleteAuthor
};
