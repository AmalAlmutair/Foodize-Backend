const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const IngredientSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

IngredientSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Ingredient", IngredientSchema);
