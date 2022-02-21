const Category = require("../../models/category");
const Recipe = require("../../models/recipe");
const ingredient = require("../../models/ingredients");

exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const ingredient = await ingredient.findById(ingredientId);
    return ingredient;
  } catch (error) {
    next(error);
  }
};

exports.getIngredient = async (req, res, next) => {
  try {
    const ingredient = await ingredient.find();
    return res.json(ingredient);
  } catch (error) {
    next(error);
  }
};

exports.ingredientCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = ` http://${req.get("host")}/media/${req.file.filename}`;
      // req.body.image = `/${req.file.path}`;
      // req.body.image = req.body.image.replace("\\", "/");
    }
  } catch (error) {
    next(error);
  }
};

//     const newIngredient = await ingredient.create(req.body);
//     return res.status(201).json(newIngredient);
//   } catch (error) {
//     next(error);
//   }
// };

exports.ingredientDelete = async (req, res, next) => {
  try {
    await req.ingredient.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
