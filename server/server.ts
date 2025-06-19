import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/db.js";
dotenv.config();

const app = express();

connectDB();

app.listen(3000, () => {
  console.log("서버 연결");
});
