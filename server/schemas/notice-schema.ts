import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true },
);

export const Notice =
  mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);
