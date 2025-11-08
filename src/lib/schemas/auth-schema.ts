import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    name: { type: String, required: true, unique: true },
    profile_image: { type: String, default: null },
    introduce: { type: String, default: null },
    like_category: { type: [String], default: [] },
    deleted: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true },
);

export const Auth = mongoose.models.Auth || mongoose.model("Auth", AuthSchema);
