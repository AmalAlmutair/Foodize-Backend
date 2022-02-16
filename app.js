const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
const categoryRoutes = require("./api/category/router.category");
const recipesRoutes = require("./api/recipes/router.recipes");

const app = express();
connectDb();

app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(
//     `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
//   );
//   next();
// });

// Routes
app.use("/category", categoryRoutes);
app.use("/recipes", recipesRoutes);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});
app.listen(8000);
