import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

export const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
