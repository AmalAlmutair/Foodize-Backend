const express = require("express");
// ? ------------------------THE FUNCTION THAT BEEN IMPORT IT ---------------------------------------

const {
  fetchCategory,
  categoryCreate,
  getCategory,
  recipeCreate,
} = require("./controller.category");
const upload = require("../../middleware/multer");
const router = express.Router();
// ? ---------------------------------------------------------- ---------------------------------------

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

//  ! ------------------------------ROUTES---------------------------------------
router.get("/", getCategory);
router.post("/", upload.single("image"), categoryCreate);
router.post("/:slug", upload.single("image"), recipeCreate);
//  ! ------------------------------------------------------------------------
module.exports = router;
