const express = require("express");

const {
  fetchRecipes,
  getRecipes,
  //   reciepeDelete,
  //   reciepeUpdate,
} = require("./controller.recipes");
const upload = require("../../middleware/multer");

const router = express.Router();

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

// router.get("/", fetchRecipes);
router.get("/", getRecipes);

// router.delete("/:recipeId", recipeDelete);
// router.put("/:recipeId", upload.single("image"), recipeUpdate);

module.exports = router;
