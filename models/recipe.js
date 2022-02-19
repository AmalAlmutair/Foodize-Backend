const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
// const recipes = require("./recipes");
const RecipeSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

RecipeSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Recipe", RecipeSchema);
