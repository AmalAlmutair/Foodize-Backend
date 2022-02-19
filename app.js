const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
// ? -------------------------ROUTES TAKEN FROM FOLDERS ::---------------------------------
const categoryRoutes = require("./api/category/router.category");
const recipesRoutes = require("./api/recipes/router.recipes");
const ingredientRoutes = require("./api/ingredient/router.ingredients");
const path = require("path");
// ? -------------------------------------------------------------------------------

// ----------------  app.use for > basic and media --------------------------
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/media", express.static(path.join(__dirname, "media")));
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});
// -------------------------------------------------------------------------

// ! ------------------------ROUTES --------------------------------------------
app.use("/category", categoryRoutes);
app.use("/recipe", recipesRoutes);
app.use("/ingredient", ingredientRoutes);
// ! -----------------------------------------------------------------

// if the status 500 or error do this:
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});
// FIRST LISTEN AND CONNECT TO THE DATABASE ::
app.listen(8000);
connectDb();
