import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/db.js";
import authRouter from "./routes/auth-routes.js";
import blogRouter from "./routes/blog-routes.js";
import mypageRouter from "./routes/mypage-routes.js";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  dotenv.config({ path: "./.env.production", override: true });
} else {
  dotenv.config({ path: "./.env.development", override: true });
}

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: isProduction ? process.env.PRODUCTION_URL : process.env.CLIENT_URL,
    credentials: true,
  }),
);
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
