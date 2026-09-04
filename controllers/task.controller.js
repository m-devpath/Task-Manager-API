import Task from "../models/task.model.js";

// Create a new task 
export const createTask = async (req, res, next) => {
    try {
        
        const { title , description, status, dueDate } = req.body;

        if(!title){
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            });
        }

        const task = await Task.create({
            title, 
            description, 
            status,
            dueDate,
            user: req.user._id
        });

        res.status(201).json({ success: true, data: task });

    } catch (error) {
       next(error);
    }
};

// Get all tasks belonging to logged-in user
export const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({user: req.user._id});

        res.status(200).json({ success: true, count: tasks.length, data: tasks });

    } catch (error) {
        next(error);
    }
};

// Get a single task by id with ownership check
export const getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        if(task.user.toString() !== req.user._id.toString()){
            return res.status(403).json({ success: false, message: 'Not authorized to access this task' });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
       next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({success: false, message: 'Task not found'});
        }

        if(task.user.toString() !== req.user._id.toString()){
            return res.status(403).json({success: false, message: 'Not authorized to access this task'})
        }

        const { title, description, status, dueDate } = req.body;

        if(title !== undefined) task.title = title;
        if(description !== undefined) task.description = description;
        if(status !== undefined) task.status = status;
        if(dueDate !== undefined) task.dueDate = dueDate;

        const updatedTask = await task.save();

        res.status(200).json({ success: true, data: updatedTask });

    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({success: false, message: 'Task not found'});
        }

        if(task.user.toString() !== req.user._id.toString()){
            return res.status(403).json({success: false, message: 'Not authorized to access this task'})
        }

        const deletedTask = await task.deleteOne();

        res.status(200).json({ success: true, message: 'Task deleted successfully' });

    } catch (error) {
       next(error);
    }
};
