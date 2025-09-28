const {
  getCategory,
  insertCategory,
  deleteCategory,
  editCategory,
} = require("../controller/categoryController");
const Authorization = require("../middleware/authorization");
const validation = require("../middleware/validation");
const categorySchema = require("../schema/categorySchema");

const router = require("express").Router();

const staticRouter = "/category";
router.get(staticRouter, getCategory);
router.post(
  staticRouter,
  Authorization,
  validation(categorySchema.category),
  insertCategory
);
router.put(
  staticRouter + "/:id",
  Authorization,
  validation(categorySchema.category),
  editCategory
);
router.delete(
  staticRouter + "/:id",
  Authorization,
  validation(categorySchema.category),
  deleteCategory
);

module.exports = router;
