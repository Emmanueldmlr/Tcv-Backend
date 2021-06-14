const express = require('express');

const router = express.Router();

const categoryController = require('../controllers/categoryController')

//fetch all categories
router.get("/", categoryController.fetchCategories)

//fetch a single category by Id
router.get("/:id", categoryController.findCategory)

//create category
router.post("/", categoryController.create)

//update category
router.put("/:id", categoryController.update)

//delete category
router.delete("/:id", categoryController.delete)

module.exports = router;

