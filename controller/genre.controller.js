// controllers/categoryGenreControllers.js

const categoryDB = require("../models/category.model");
const subCategoryDB = require("../models/subcategory");
const genreDB = require("../models/genre.model");

// ============== Category Controllers ==============

// Create a new Category
const createCategory = async (req, res) => {
    try {
        const { name, keyIndex } = req.body;
        const category = new categoryDB({ name, keyIndex });
        await category.save();
        res.status(201).json({ message: "Category created successfully", category });
    } catch (err) {
        console.error("createCategory error:", err);
        res.status(500).json({ error: "Failed to create category" });
    }
};

// Get all Categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryDB.find({});
        res.status(200).json({ categories });
    } catch (err) {
        console.error("getAllCategories error:", err);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
};

// Get one Category by ID
const getOneCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryDB.findById(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({ category });
    } catch (err) {
        console.error("getOneCategory error:", err);
        res.status(500).json({ error: "Failed to fetch category" });
    }
};

// Update a Category by ID
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const category = await categoryDB.findByIdAndUpdate(id, updatedData, { new: true });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({ message: "Category updated successfully", category });
    } catch (err) {
        console.error("updateCategory error:", err);
        res.status(500).json({ error: "Failed to update category" });
    }
};

// Delete a Category by ID
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryDB.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        console.error("deleteCategory error:", err);
        res.status(500).json({ error: "Failed to delete category" });
    }
};

// ============== SubCategory Controllers ==============

// Create a new SubCategory
const createSubCategory = async (req, res) => {
    try {
        const { name, keyIndex, categoryId } = req.body;
        const subCategory = new subCategoryDB({ name, keyIndex, categoryId });
        await subCategory.save();
        res.status(201).json({ message: "SubCategory created successfully", subCategory });
    } catch (err) {
        console.error("createSubCategory error:", err);
        res.status(500).json({ error: "Failed to create subcategory" });
    }
};

// Get all SubCategories
const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await subCategoryDB.find({});
        res.status(200).json({ subCategories });
    } catch (err) {
        console.error("getAllSubCategories error:", err);
        res.status(500).json({ error: "Failed to fetch subcategories" });
    }
};

// Get one SubCategory by ID
const getOneSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const subCategory = await subCategoryDB.findById(id);
        if (!subCategory) {
            return res.status(404).json({ error: "SubCategory not found" });
        }
        res.status(200).json({ subCategory });
    } catch (err) {
        console.error("getOneSubCategory error:", err);
        res.status(500).json({ error: "Failed to fetch subcategory" });
    }
};

// Update a SubCategory by ID
const updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const subCategory = await subCategoryDB.findByIdAndUpdate(id, updatedData, { new: true });
        if (!subCategory) {
            return res.status(404).json({ error: "SubCategory not found" });
        }
        res.status(200).json({ message: "SubCategory updated successfully", subCategory });
    } catch (err) {
        console.error("updateSubCategory error:", err);
        res.status(500).json({ error: "Failed to update subcategory" });
    }
};

// Delete a SubCategory by ID
const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const subCategory = await subCategoryDB.findByIdAndDelete(id);
        if (!subCategory) {
            return res.status(404).json({ error: "SubCategory not found" });
        }
        res.status(200).json({ message: "SubCategory deleted successfully" });
    } catch (err) {
        console.error("deleteSubCategory error:", err);
        res.status(500).json({ error: "Failed to delete subcategory" });
    }
};

// ============== Genre Controllers ==============

// Create a new Genre
const createGenre = async (req, res) => {
    try {
        const { category, subCategory, name } = req.body;
        const genre = new genreDB({ category, subCategory, name });
        await genre.save();
        res.status(201).json({ message: "Genre created successfully", genre });
    } catch (err) {
        console.error("createGenre error:", err);
        res.status(500).json({ error: "Failed to create genre" });
    }
};

// Get all Genres
const getAllGenres = async (req, res) => {
    try {
        const genres = await genreDB.find({});
        res.status(200).json({ genres });
    } catch (err) {
        console.error("getAllGenres error:", err);
        res.status(500).json({ error: "Failed to fetch genres" });
    }
};

// Get one Genre by ID
const getOneGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const genre = await genreDB.findById(id);
        if (!genre) {
            return res.status(404).json({ error: "Genre not found" });
        }
        res.status(200).json({ genre });
    } catch (err) {
        console.error("getOneGenre error:", err);
        res.status(500).json({ error: "Failed to fetch genre" });
    }
};

// Update a Genre by ID
const updateGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const genre = await genreDB.findByIdAndUpdate(id, updatedData, { new: true });
        if (!genre) {
            return res.status(404).json({ error: "Genre not found" });
        }
        res.status(200).json({ message: "Genre updated successfully", genre });
    } catch (err) {
        console.error("updateGenre error:", err);
        res.status(500).json({ error: "Failed to update genre" });
    }
};

// Delete a Genre by ID
const deleteGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const genre = await genreDB.findByIdAndDelete(id);
        if (!genre) {
            return res.status(404).json({ error: "Genre not found" });
        }
        res.status(200).json({ message: "Genre deleted successfully" });
    } catch (err) {
        console.error("deleteGenre error:", err);
        res.status(500).json({ error: "Failed to delete genre" });
    }
};

module.exports = {
    // Category exports
    createCategory,
    getAllCategories,
    getOneCategory,
    updateCategory,
    deleteCategory,
    // SubCategory exports
    createSubCategory,
    getAllSubCategories,
    getOneSubCategory,
    updateSubCategory,
    deleteSubCategory,
    // Genre exports
    createGenre,
    getAllGenres,
    getOneGenre,
    updateGenre,
    deleteGenre,
};
