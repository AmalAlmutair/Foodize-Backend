// ! SHOULD WE ADD ROUTES FOR IT || PUT IT INSIDE RECIPE ?
const express = require("express");
// ? ------------------------THE FUNCTION THAT BEEN IMPORT IT ---------------------------------------

const {
  fetchIngredient,
  ingredientCreate,
  getIngredient,
  recipeCreate,
} = require("./controller.ingredients");
const upload = require("../../middleware/multer");
const router = express.Router();
// ? ---------------------------------------------------------- ---------------------------------------

router.param("ingredientId", async (req, res, next, ingredientId) => {
  const ingredient = await fetchIngredient(ingredientId, next);
  if (ingredient) {
    req.ingredient = ingredient;
    next();
  } else {
    const err = new Error("ingredient Not Found");
    err.status = 404;
    next(err);
  }
});

//  ! ------------------------------ROUTES---------------------------------------
router.get("/", getIngredient);
router.post("/", upload.single("image"), ingredientCreate);
// router.post("/:ingredientId/recipe", upload.single("image"), recipeCreate);
//  ! ------------------------------------------------------------------------
module.exports = router;
