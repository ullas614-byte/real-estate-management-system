import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Routes/userRoutes.js"
import authRouter from "./Routes/authRoutes.js"
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error"

  return res.status(statusCode).json({
    success: false, 
    statusCode,
    message,
  });
});

app.listen(port, () => console.log(`Server running on port:${port}`));
