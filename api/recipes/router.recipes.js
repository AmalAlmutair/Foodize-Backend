const express = require("express");
// ? ------------------------THE FUNCTION THAT BEEN IMPORT IT ---------------------------------------
const {
  fetchRecipes,
  getRecipes,
  // ingredientCreate,
  //   recipeDelete,
  //   recipeUpdate,
} = require("./controller.recipes");
const upload = require("../../middleware/multer");
const router = express.Router();
// ? ------------------------------------------------------------------------------------

router.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await fetchRecipes(recipeId, next);
  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    const err = new Error("Recipe Not Found");
    err.status = 404;
    next(err);
  }
});

//  ! ------------------------------ROUTES---------------------------------------
// router.get("/", fetchRecipes);
router.get("/", getRecipes);
// router.post("/category/:slug/recipe", upload.single("image"), ingredientCreate);
// router.get("/:ingredients", getRecipes);

// router.delete("/:recipeId", recipeDelete);
// router.put("/:recipeId", upload.single("image"), recipeUpdate);

module.exports = router;
