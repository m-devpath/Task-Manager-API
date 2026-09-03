import Task from "../models/task.model.js";

// Create a new task 
export const createTask = async (req, res) => {
    try {
        
        const { title , description, status, dueDate } = req.body;

        const task = await Task.create({
            title, 
            description, 
            status,
            dueDate,
            user: req.user._id
        });

        res.status(201).json({ success: true, data: task });

    } catch (error) {
        console.error('Create Task Error: ', error);
        res.status(500).json({ success: false, message: 'Server error while creating task'});
    }
};

// Get all tasks belonging to logged-in user
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user._id});

        res.status(200).json({ success: true, count: tasks.length, data: tasks });

    } catch (error) {
        console.error('Get Tasks Error: ', error);
        res.status(500).json({ success: false, message: 'Server error while fetching tasks'});
    }
};

// Get a single task by id with ownership check
export const getTask = async (req, res) => {
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
        console.error('Get Task Error:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching task' });
    }
};

export const updateTask = async (req, res) => {
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
        console.error('Update Task Error:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching task' });
    }
};

export const deleteTask = async (req, res) => {
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
        console.error('Delete Task Error:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching task' });
    }
};
