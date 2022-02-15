const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
// const reciepes = require("./reciepes");
const CategorySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,

    reciepes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reciepe" }],
  },
  { timestamps: true }
);

CategorySchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Category", CategorySchema);
