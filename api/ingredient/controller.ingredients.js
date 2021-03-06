const Category = require("../../models/category");
const Recipe = require("../../models/recipe");
const Ingredient = require("../../models/ingredients");

exports.fetchIngredient = async (ingredientId, next) => {
  try {
    const ingredient = await Ingredient.findById(ingredientId);
    return ingredient;
  } catch (error) {
    next(error);
  }
};

exports.getIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.find();
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
    // ! last update: 21-2:
    const { recipeId } = req.params;
    // const ingredient = await Ingredient.findById(ingredientsId);
    // req.body = { ...req.body, ingredient: ingredient._id };

    const newIngredient = await Ingredient.create(req.body);

    await Ingredient.findOneAndUpdate(
      { _id: newIngredient._id },
      { $push: { recipes: recipeId } }
    );

    await Recipe.findByIdAndUpdate(recipeId, {
      $push: { ingredients: newIngredient._id },
    });

    return res.status(201).json(newIngredient);
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
