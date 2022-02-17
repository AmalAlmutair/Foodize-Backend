const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
// const reciepes = require("./reciepes");
const RecipeSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

RecipeSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Recipe", RecipeSchema);
