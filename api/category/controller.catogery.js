const Category = require("../../models/category");
const Recipe = require("../../models/recipe");

exports.fetchCategory = async (categoryId, next) => {
  try {
    const category = await Category.findById(categoryId);
    return category;
  } catch (error) {
    next(error);
  }
};

exports.getCatogery = async (req, res, next) => {
  try {
    const category = await Category.find();
    return res.json(category);
  } catch (error) {
    next(error);
  }
};

exports.categoryCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = ` http://${req.get("host")}/media/${req.file.filename}`;
      // req.body.image = `/${req.file.path}`;
      // req.body.image = req.body.image.replace("\\", "/");
    }

    const newCategory = await Category.create(req.body);
    return res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};
exports.recipeCreate = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    req.body = { ...req.body, category: categoryId };
    const newRecipe = await Recipe.create(req.body);
    await Category.findOneAndUpdate(
      { _id: req.params.categoryId },
      { $push: { recipes: newRecipe._id } }
    );
    return res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

// exports.categoryDelete = async (req, res, next) => {
//   try {
//     await req.category.remove();
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };
