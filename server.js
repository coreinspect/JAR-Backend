import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

// Configuration
dotenv.config();
connectDB();
const app = express();

// Middlewarre
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Server is running");
});

const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log(`Server is running on port ${PORT}`));
