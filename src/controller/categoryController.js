const categoryService = require("../service/categoryService");
const CategoryService = require("../service/categoryService");
const response = require("../utils/Response");

const insertCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const result = await CategoryService.store(category);
  } catch (error) {}
};

const getCategory = async (req, res) => {
  try {
    const result = await CategoryService.showAll();
    return response(res, 200, "Berhasil fetch category", result);
  } catch (error) {}
};

const editCategory = async (req, res) => {
  try {
    const { id, category } = req.body;
    const result = await categoryService.update({ id: id, category: category });
  } catch (error) {}
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await categoryService.delete(id);
  } catch (error) {}
};

module.exports = {
  insertCategory,
  getCategory,
  editCategory,
  deleteCategory,
};
