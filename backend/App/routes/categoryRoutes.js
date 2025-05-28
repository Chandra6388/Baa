const router = require("express").Router()
const { addCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory } = require('../controllers/admin/categoryController')

router.post("/add-category", addCategory);
router.post("/get-all-category", getAllCategory);
router.post("/get-category-byId", getCategoryById);
router.post("/update-category", updateCategory);
router.post("/delete-category", deleteCategory);


module.exports = router;