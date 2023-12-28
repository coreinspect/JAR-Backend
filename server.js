import express from "express";
import { errorResponserHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

//Static Assests
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(errorResponserHandler);
// app.use(invalidPathHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
