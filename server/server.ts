import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/db.js";
import authRouter from "./routes/auth-routes.js";
import blogRouter from "./routes/blog-routes.js";
import mypageRouter from "./routes/mypage-routes.js";

dotenv.config();

const app = express();
const corsOrigins = [];

if (process.env.PRODUCTION_URL) {
  corsOrigins.push(process.env.PRODUCTION_URL);
}
if (process.env.CLIENT_URL) {
  corsOrigins.push(process.env.CLIENT_URL);
}

app.use(express.json());
app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/my", mypageRouter);

connectDB();

app.get("/", (_req, res) => {
  res.send("https 서버 페이지");
});

app.listen(process.env.PORT, () => {
  console.log("https express 서버 실행 중");
});
