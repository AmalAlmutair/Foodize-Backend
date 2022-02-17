const express = require("express");

const {
  fetchCategory,
  categoryCreate,
  getCatogery,
  recipeCreate,
} = require("./controller.catogery");
const upload = require("../../middleware/multer");

const router = express.Router();

router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchCategory(categoryId, next);
  if (category) {
    req.category = category;
    next();
  } else {
    const err = new Error("category Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", getCatogery);
router.post("/", upload.single("image"), categoryCreate);
router.post("/:categoryId/recipe", upload.single("image"), recipeCreate);

module.exports = router;
