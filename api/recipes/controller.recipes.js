const Recipe = require("../../models/recipe");

// ! <<CREATE RECIPE>> FUNCTION BEEN TAKEN TO CATEGORY CONTROLLER FOR THE ID & RELATION THING::

exports.fetchRecipes = async (recipeId, next) => {
  try {
    const recipe = await Recipe.findById(recipeId);
    return recipe;
  } catch (error) {
    next(error);
  }
};

exports.getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    return res.json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.recipeDelete = async (req, res, next) => {
  try {
    await req.recipe.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
