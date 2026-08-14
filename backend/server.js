import express from "express";
import cors from "cors";
import multer from "multer";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cartRouter from "./routes/cartRoute.js";
import "dotenv/config";
import orderRouter from "./routes/orderRoute.js";

const PORT = process.env.PORT || 4000;
const app = express();

// Connect to the database
connectDB();
console.log("Attempting to connect to MongoDB...");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "token, Content-Type");
  next();
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Add a test route that doesn't require database connection
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working! Database connection may be limited." });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
