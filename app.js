import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

await connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    console.log("Task Manager API is running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
