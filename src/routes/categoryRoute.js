const {
  getCategory,
  insertCategory,
  deleteCategory,
  editCategory,
} = require("../controller/categoryController");
const validation = require("../middleware/validation");
const categorySchema = require("../schema/categorySchema");

const router = require("express").Router();

const staticRouter = "/category";
router.get(staticRouter, getCategory);
router.post(staticRouter, validation(categorySchema.category), insertCategory);
router.put(
  staticRouter + "/:id",
  validation(categorySchema.category),
  editCategory
);
router.delete(
  staticRouter + "/:id",
  validation(categorySchema.category),
  deleteCategory
);

module.exports = router;
