const {
  getCategory,
  insertCategory,
  deleteCategory,
  editCategory,
} = require("../controller/categoryController");

const router = require("express").Router();

const staticRouter = "/category";
router.get(staticRouter, getCategory);
router.post(staticRouter, insertCategory);
router.put(staticRouter + "/:id", editCategory);
router.delete(staticRouter + "/:id", deleteCategory);

module.exports = router;
