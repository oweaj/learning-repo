import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  name: { type: String, required: true, unique: true },
});

export const Auth = mongoose.models.Auth || mongoose.model("Auth", AuthSchema);
