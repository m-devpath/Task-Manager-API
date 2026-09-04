import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import taskRouter from "./routes/task.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

await connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRouter);

app.get('/', (req, res) => {
    res.send("Task Manager API is running!");
});

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
