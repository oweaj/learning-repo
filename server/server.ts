import fs from "node:fs";
import https from "node:https";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/db.js";
import authRouter from "./routes/auth-routes.js";
import blogRouter from "./routes/blog-routes.js";
import uploadRouter from "./routes/image-routes.js";
import mypageRouter from "./routes/my-routes.js";

dotenv.config();

const app = express();

const options = {
  key: fs.readFileSync("./localhost+2-key.pem"),
  cert: fs.readFileSync("./localhost+2.pem"),
};

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/my", mypageRouter);
app.use("/api/image", uploadRouter);

connectDB();

app.get("/", (_req, res) => {
  res.send("https 서버 페이지");
});

https.createServer(options, app).listen(3001, () => {
  console.log("HTTPS 서버 실행 중 : 3001 port");
});
