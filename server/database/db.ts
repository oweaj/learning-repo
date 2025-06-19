import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("mongoDB 연결 성공");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
