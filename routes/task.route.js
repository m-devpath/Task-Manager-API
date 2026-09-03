import  { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js"
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/task.controller.js";

const taskRouter = Router();

taskRouter.post('/', protect, createTask);
taskRouter.get('/', protect, getTasks);
taskRouter.get('/:id', protect, getTask);
taskRouter.put('/:id', protect, updateTask);
taskRouter.delete('/:id', protect, deleteTask);

export default taskRouter;