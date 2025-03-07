const express = require('express')
const path = require('path')
const router = express.Router()

const authorController = require("../controller/author.controller");
const verifyToken = require('../middleware/auth.middleware');
const isAdmin = require("../middleware/role.middleware");

router.get("/authors", authorController.getAllAuthors);
router.get("/author/:id", authorController.getOneAuthor);
router.post("/author", [verifyToken, isAdmin] , authorController.createNewAuthor);
router.patch("/author/:id", [verifyToken, isAdmin] , authorController.updateAuthor);
router.delete("/author/:id", [verifyToken, isAdmin] , authorController.deleteAuthor);

module.exports = router;