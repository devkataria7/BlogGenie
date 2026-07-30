import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoute.js";
import blogRouter from "./routes/blogRoute.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

await connectDB();

const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => res.send("server is running"));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

// error handler
app.use(errorHandler);

// Start accepting incoming request
app.listen(PORT, (req, res) => {
  console.log("server is running on port:" + PORT);
});

export default app;
