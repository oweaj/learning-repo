import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    main_image: { type: String, required: true },
    sub_image: { type: String, default: null },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    content: { type: String, required: true },
    deleted_at: { type: Date, default: null },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
  },
  { timestamps: true },
);

export const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
