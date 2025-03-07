const express = require('express');
const router = express.Router();

const catSubGenreController = require("../controller/genre.controller");
const verifyToken = require('../middleware/auth.middleware');
const isAdmin = require("../middleware/role.middleware");

// ---------- Category Routes ----------

router.get("/categories", catSubGenreController.getAllCategories);
router.get("/category/:id", catSubGenreController.getOneCategory);
router.post("/category", [verifyToken, isAdmin] , catSubGenreController.createCategory);
router.patch("/category/:id", [verifyToken, isAdmin] , catSubGenreController.updateCategory);
router.delete("/category/:id", [verifyToken, isAdmin] , catSubGenreController.deleteCategory);

// ---------- SubCategory Routes ----------

router.get("/subcategories", [verifyToken, isAdmin] , catSubGenreController.getAllSubCategories);
router.get("/subcategory/:id", [verifyToken, isAdmin] , catSubGenreController.getOneSubCategory);
router.post("/subcategory", [verifyToken, isAdmin] , catSubGenreController.createSubCategory);
router.patch("/subcategory/:id", [verifyToken, isAdmin] , catSubGenreController.updateSubCategory);
router.delete("/subcategory/:id", [verifyToken, isAdmin] , catSubGenreController.deleteSubCategory);

// ---------- Genre Routes ----------

router.get("/genres", catSubGenreController.getAllGenres);
router.get("/genre/:id", catSubGenreController.getOneGenre);
router.post("/genre", [verifyToken, isAdmin] , catSubGenreController.createGenre);
router.patch("/genre/:id", [verifyToken, isAdmin] , catSubGenreController.updateGenre);
router.delete("/genre/:id", [verifyToken, isAdmin] , catSubGenreController.deleteGenre);

module.exports = router;
