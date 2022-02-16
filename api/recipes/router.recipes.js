const express = require("express");

const {
  fetchReciepes,
  //   reciepeDelete,
  //   reciepeUpdate,
} = require("./controller.recipes");
const upload = require("../../middleware/multer");

const router = express.Router();

router.param("reciepeId", async (req, res, next, reciepeId) => {
  const reciepe = await fetchReciepes(reciepeId, next);
  if (reciepe) {
    req.reciepe = reciepe;
    next();
  } else {
    const err = new Error("Reciepe Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", fetchReciepes);
// router.delete("/:reciepeId", reciepeDelete);
// router.put("/:reciepeId", upload.single("image"), reciepeUpdate);

module.exports = router;
