const express = require('express')
const path = require('path')
const router = express.Router()

const authorController = require("../controller/author.controller");
const verifyToken = require('../middleware/auth.middleware');
const isAdmin = require("../middleware/role.middleware");

router.get("/all", authorController.getAllAuthors);
router.get("/:id", authorController.getOneAuthor);
router.post("/", [verifyToken, isAdmin] , authorController.createNewAuthor);
router.patch("/:id", [verifyToken, isAdmin] , authorController.updateAuthor);
router.delete("/:id", [verifyToken, isAdmin] , authorController.deleteAuthor);

module.exports = router;