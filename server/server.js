import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoute.js";
import blogRouter from "./routes/blogRoute.js";

const app = express();

await connectDB();

// middleware

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// routes
app.get("/", (req, res) => res.send("server is running"));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

app.listen(PORT, (req, res) => {
  console.log("server is running on port:" + PORT);
});

export default app;
