import express from "express";
import { errorResponserHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";

// Configuration
dotenv.config();
connectDB();
const app = express();

// Middlewarre
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Server is running");
});

app.use("/api/users", userRoutes);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
