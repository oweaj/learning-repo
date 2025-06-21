import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/db.js";
import authRouter from "./routes/auth-routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRouter);

app.listen(3001, () => {
  console.log("서버 연결 3001 port");
});
